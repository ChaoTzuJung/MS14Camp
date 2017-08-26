const express = require('express');
const path = require('path');
const csv = require('fast-csv');
const fs = require('fs');
const _ = require('lodash');
const Team = require('mongoose').model('Team');
const Money = require('mongoose').model('Money');

const router = new express.Router();

router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: "You're authorized to see this secret message."
  });
});

router.get('/whatmyroom', (req, res) => {
  res.status(200).json({
    room: `You're live in Number ${Math.floor((Math.random() * 10) + 1)}.`
  });
});

router.post('/teamprogress', (req, res) => {
  res.status(200).json({
    redProgress: 10,
    blueProgress: 35,
    greenProgress: 90,
    yellowProgress: 25
  });
});

//general query
router.post('/query',(req,res)=>{
  let teamId=req.body.team;
  console.log(teamId);
  Team.findOne({team:teamId},(err,team)=>{
    res.status(200).json(team);
  })
});
//mission
router.put('/donemission/:id/:type', (req, res) => {
  let csvStream = fs.createReadStream(path.resolve('./static/csv', 'missionList.csv'));
  let isFound = false;
  let existed = -1;
  let reqId = req.params.id;
  let reqType = req.params.type;
  let teamId = req.body.team;
  //加入前一個任務的檢查

  csv.fromStream(csvStream, {
    headers: [
      'mId', 'title', 'fromUs', 'ourDetail', 'fromBoss', 'bossDetail', 'bossDetail2', 'getItem', 'lostItem', 'success', 'failed', 'paid'
    ]
  }).on("data", (data) => {
    
    if (data.mId === reqId && !isFound) {
      Team.findOne({ team:teamId}, (err, team) => {
        if (err) throw err;
        let temp = team.missions;
        existed = _.findIndex(temp, { 'mId': data.mId });
        switch (reqType) {
          case 'success':
            
            if (existed === -1) {
              console.log('pushing.....');
              temp.push({ 
                mId: data.mId, 
                data: _.omit(data, ['mId']), 
                isSuccess: true 
              });
            } else {
              console.log('editing.....');
              temp[existed].isSuccess = true;
            }
            break;
          case 'failed':
            if (existed === -1) {
              temp.push({
                 mId: data.mId,
                 data:_.omit(data,['mId']),
                 isSuccess: false
              });
            } else {
              temp[existed].isSuccess = false;
            }
            break;
        }
        Team.findOneAndUpdate({ team: teamId }, { missions: temp }, (err, team) => {
          if (err) throw err;
          Team.findOne({ team: teamId }, (err, team) => {
            if (err) throw err;
            res.status(200).json(team);
          })
        });
      });
      isFound = !isFound;
    }
  }
    ).on("end", () => {
      if (!isFound) res.json({ err: 'mission not found!' });
    });
});
//money
router.put('/money/:id/:type', (req, res) => {
  let csvStream = fs.createReadStream(path.resolve('./static/csv', 'missionList.csv'));
  let isFound = false;
  let teamId = req.params.id;
  let reqType = req.params.type;
  let mId = req.body.mId;

  csv.fromStream(csvStream, {
    headers: ['mSerial', 'amount']
  }).on("data", (data) => {

    if (data.mSerial === mId && !isFound) {
      Money.findOne({ mSerial: mId }, (err,money) => {
        if (err) throw err;
        if(!money.mSerial){
          let money=0;
          Team.findOne({ team: teamId }, (err, team) => {
            if (err) throw err;
            if (reqType === 'add') {
              money = team.money + money.amount;
            }else{
              money = team.money - money.amount;
            }

            Team.findOneAndUpdate({ team: teamId }, { money: money }, (err, team) => {
              if (err) throw err;
              Team.findOne({ team: teamId }, (err, team) => {
                if (err) throw err;
                res.status(200).json(team);
              });
            });
          });
        }else{
          res.status(200).json({err:`想騙錢？`});
        }
      });
      isFound = !isFound;
    }
  }
    ).on("end", () => {
      if (!isFound) res.json({ err: 'money not found!' });
    });
});


//item


//add

//minus

//
router.get('/god/init/:id', (req, res) => {
  let reqId = req.params.id;//teamId
  let reqLine = req.params.line;//Line 
  let csvStream = fs.createReadStream(path.resolve('./static/csv', 'internList.csv'));
  let members = []
  csv.fromStream(csvStream, { headers: ['Id', 'name', 'email', 'pwd', 'isCap'] })
    .on("data", (data) => {
      if (data.Id === reqId) {
        members.push(data);
      }
    }
    ).on("end", () => {
      let team = new Team({
        team: reqId,
        member: members,
        missions: [],
        money: 0,
        items: []
      });

      team.save((err) => {
        if (err) throw err;
        Team.find({}, (err, team) => {
          if (err) throw err;
          res.status(200).json(team);
        });
      });
    });
});

module.exports = router;

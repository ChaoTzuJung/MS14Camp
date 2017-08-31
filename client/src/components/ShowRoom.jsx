import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import Chip from 'material-ui/Chip';
//import injectTapEventPlugin from 'react-tap-event-plugin';

var height = window.screen.height;
var weight = window.screen.weight;

class lotsResultPage extends Component {
  constructor(prop) {
    super(prop); 
    this.state = {
      expanded: true,
    };
  }
  componentDidMount() {
    this.props.getRoom('陳寶桁');
    console.log(this.props.user);
    console.log(this.props.room);
    localStorage.setItem('ms_user_room_is_choice', true);
  }
  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
    };

  handleToggle = (event, toggle) => {
      this.setState({expanded: toggle});
    };

  handleExpand = () => {
      this.setState({expanded: true});
    };

  handleReduce = () => {
      this.setState({expanded: false});
  };
  render() {
    return (
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          title="York"
          subtitle="H組"
          avatar="https://raw.githubusercontent.com/ChaoTzuJung/pictureAll/master/York.jpg"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardMedia
          expandable={true}
          overlay={<CardTitle title="我們的主場" subtitle="2017台北世大運" />}
        >
          <img src="https://raw.githubusercontent.com/ChaoTzuJung/pictureAll/master/20881922_1549813065064725_7654877585521587816_n.jpg" alt="" />
        </CardMedia>
        <CardTitle title="蔡宗佑" subtitle="Room 1703" expandable={true} />
        <CardText expandable={true}>
          您的房間在第三棟，1703房寢室，你的室友如下：
              <Chip
            onRequestDelete={this.handleRequestDelete}
            onClick={this.handleTouchTap}
          >
            <Avatar src="https://raw.githubusercontent.com/ChaoTzuJung/pictureAll/master/寶哥.jpg" />
            陳寶桁
              </Chip>
        </CardText>
        <CardActions>
          <FlatButton label="打開房卡" onClick={this.handleExpand} />
          <FlatButton label="關閉房卡" onClick={this.handleReduce} />
        </CardActions>
      </Card>
    );
  }
}

function mapStateToProps({ room, user }) {
  return { room, user};
}
export default connect(mapStateToProps, actions)(lotsResultPage);
// export default connect(mapStateToProp,{
//   userInfoAction:actions.userInfo,
// })(landingPage)
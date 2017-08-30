import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import moment from 'moment';

import Auth from '../modules/Auth';
import * as actions from '../actions';
import Dashboard from '../components/Dashboard.jsx';
import GetRoom from '../components/GetRoom.jsx';
const gameDay = moment("20170830", "YYYYMMDD").format('ll')
const today = moment.utc().format('ll')

class DashboardPage extends Component {
  componentDidMount() {
    // const xhr = new XMLHttpRequest();
    // xhr.open('get', '/api/dashboard');
    // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // // set the authorization HTTP header
    // xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    // xhr.responseType = 'json';
    // xhr.addEventListener('load', () => {
    //   if (xhr.status === 200) {
    //     this.setState({
    //       secretData: xhr.response.message
    //     });
    //   }
    // });
    // xhr.send();
    this.props.setSecret();
    // this.props.setUser({ name: Auth.getUserNameFromCookie(), email: Auth.getUserEmailFromCookie() });
    this.props.initUser(Auth.getUserEmailFromCookie());
    this.props.initTeamProgress(this.props.user.teamId);
  }

  render() {
    // return (<Dashboard secretData={this.props.dashboard} />);
    // TODO: add time filter
    if (today === gameDay) {
      return (<Dashboard />);
    } else {
      return (<GetRoom />);
    }
  }
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps, actions)(DashboardPage);

import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Auth from '../modules/Auth';
import * as actions from '../actions';
import Backpack from '../components/BackPack.jsx';


class BackPackPage extends Component {
    componentDidMount() {
        //get money
        //set money add minus
        //get item
        //set item add minus
    }
    render() {

        return (<Backpack />);
    }

}

export default connect(null, actions)(BackPackPage);

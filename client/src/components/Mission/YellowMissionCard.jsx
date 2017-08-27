import React, { Proptypes, Component } from 'react';
import { connect } from 'react-redux';
import LinearProgress from 'material-ui/LinearProgress';
import RaisedButton from 'material-ui/RaisedButton';

import * as actions from '../../actions';

class YellowMissionCard extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.addYellowProgress(1);
  }

  render() {
    return (
      <div className="col s12 m6">
        <div className="card yellow lighten-3">
          <div className="card-content white-text">
            <span className="card-title">象牙盾牌</span>
            <p>{"任務已經完成百分之" + this.props.yellowMission + "了"}</p>
          </div>
          <div className="card-action">
            <LinearProgress mode="determinate" value={this.props.yellowMission}
              color="#FFF176"
            />

            <RaisedButton label="yellow" primary onClick={this.handleClick} />
          </div>
        </div>
      </div>
    );
  };
};

function mapStateToProps({ yellowMission }) {
  return { yellowMission };
}

export default connect(mapStateToProps, actions)(YellowMissionCard);
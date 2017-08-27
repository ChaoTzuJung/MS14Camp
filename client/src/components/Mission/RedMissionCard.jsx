import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import LinearProgress from 'material-ui/LinearProgress';
import RaisedButton from 'material-ui/RaisedButton';

import * as actions from '../../actions';

class RedMissionCard extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.addRedProgress(1);

  }

  render() {
    return (
      <div className="col s12 m6">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">勃根地酒紅頭盔</span>
            <p>{"任務已經完成百分之" + this.props.redMission + "了"}</p>
          </div>
          <div className="card-action">
            <LinearProgress mode="determinate" value={this.props.redMission}
              style={{
                width: '100%',
                margin: '0 auto',
                border: '2px solid #FF9800',
                backgroundColor: '#D50000',
              }}
            />
            <RaisedButton label="red" primary={true} onClick={this.handleClick} />
          </div>
        </div>
      </div>
    );
  };
};

function mapStateToProps({ redMission }) {
  return { redMission };
}

export default connect(mapStateToProps, actions)(RedMissionCard);
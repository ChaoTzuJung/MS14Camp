import React, { PropTypes,Component} from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';
import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import ActionHome from 'material-ui/svg-icons/action/home';
import Settings from 'material-ui/svg-icons/action/settings';
import Headline from 'material-ui/svg-icons/action/view-headline';
import Basket from 'material-ui/svg-icons/action/shopping-basket';

import keys from '../../../config/keys';
import MissionBroadcast from './Mission/MissionBroadcast.jsx';
import Auth from '../modules/Auth';
import NavBar from './navBar.jsx';

const gameDay = moment(keys.gameDay, "YYYYMMDD").format('ll')
const today = moment.utc().format('ll')

class Base extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      selectedName: '首頁'
    };
  }
  select = (index, name) => this.setState({ selectedIndex: index, selectedName: name });
  render(){
    return (
      <div>
      {(Auth.isUserAuthenticated()) ? (
      <div>
        <div className="navbar-fixed">
              <nav>
                <div className="nav-wrapper">
                  <a style={{
                    marginLeft: '15px',
                    fontSize: '16px',
                    fontWeight: 'normal'
                  }}>{this.state.selectedName}</a>
                </div>
              </nav>
          </div>

        <MissionBroadcast />

        <div className="container">
          {this.props.children}
        </div>
      
        <footer style={{ minHeight: '10vh' }}></footer>
          {(today === gameDay) ? (
          <Paper zDepth={1} style={{ position: 'fixed', bottom: 0, width: '100%' }}>
            <BottomNavigation selectedIndex={this.state.selectedIndex}>
              <IndexLink to="/" >
                <BottomNavigationItem
                  label="首頁"
                  icon={<ActionHome color={this.state.selectedIndex === 0 ? '#00BCD4' : '#424242'} />}
                  onClick={() => this.select(0, '首頁')}
                />
              </IndexLink>
              <Link to="/Npc">
                <BottomNavigationItem
                  label="任務"
                  icon={<Headline color={this.state.selectedIndex === 1 ? '#00BCD4' : '#424242'} />}
                  onClick={() => this.select(1, '任務')}
                />
              </Link>
              <Link to="/backpack">
                <BottomNavigationItem
                  label="背包"
                  icon={<Basket color={this.state.selectedIndex === 2 ? '#00BCD4' : '#424242'} />}
                  onClick={() => this.select(2, '背包')}
                />
              </Link>
              <Link to="/setting">
                <BottomNavigationItem
                  label="設定"
                  icon={<Settings color={this.state.selectedIndex === 3 ? '#00BCD4' : '#424242'} />}
                  onClick={() => this.select(3, '設定')}
                />
              </Link>
            </BottomNavigation>
          </Paper>
          ) : null }
        </div>
        ) : (
          <div>
            { this.props.children }
          </div>
        )}
      </div>
      
    );
  }

}

Base.propTypes = {
  children: PropTypes.object.isRequired
};

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps)(Base);

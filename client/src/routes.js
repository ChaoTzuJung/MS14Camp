import Base from './components/Base.jsx';
import HomePage from './components/HomePage.jsx';
import DashboardPage from './containers/DashboardPage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import NpcPage from './containers/NpcPage.jsx';
import BackPackPage from './containers/BackpackPage.jsx';
import SettingPage from './containers/SettingPage.jsx';
import Auth from './modules/Auth';


const routes = {
  // base component (wrapper for the whole application).
  component: Base,
  childRoutes: [

    {
      path: '/',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, DashboardPage);
        } else {
          callback(null, SignUpPage);
        }
      }
    },

    {
      path: '/login',
      component: LoginPage
    },

    {
      path: '/signup',
      component: SignUpPage
    },
    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        Auth.deauthenticateUser();
        Auth.removeUserNameFromCookie();
        Auth.removeUserEmailFromCookie();

        // change the current URL to /
        replace('/');
      }
    },
    {
      path: '/npc',
      component: NpcPage
    },
    {
      path: '/backpack',
      component: BackPackPage
    },
    {
      path: '/setting',
      component: SettingPage
    },
  ]
};

export default routes;

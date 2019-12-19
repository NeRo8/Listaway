import React from 'react';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

import Auth from '../screens/Auth';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/Auth/SignInScreen';
import RestorePasswordScreen from '../screens/Auth/RestorePasswordScreen';
import ConfirmCodeScreen from '../screens/Auth/ConfirmCodeScreen';
import ChangePasswordScreen from '../screens/Auth/ChangePasswordScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import CreateAccountScreen from '../screens/Auth/CreateAccountScreen';
import CreateTour from '../screens/CreateTour';
import ProfileScreen from '../screens/ProfileScreen';

import DefaultDrawer from './DefaultDrawer';

const AppDrawerNavigation = createDrawerNavigator(
  {
    TourList: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Tour List',
      },
    },
    CreateTour: {
      screen: CreateTour,
      navigationOptions: {
        title: 'Create Tour',
      },
    },
    OrderTour: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Order Tour',
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        title: 'Profile',
      },
    },
    Settings: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Settins',
      },
    },
    About: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'About',
      },
    },
  },
  {
    contentComponent: props => <DefaultDrawer {...props} />,
  },
);

const AppNavigation = createStackNavigator(
  {
    Auth: {
      screen: Auth,
    },
    SignIn: {
      screen: SignInScreen,
    },
    RestorePassword: {
      screen: RestorePasswordScreen,
    },
    ConfirmCode: {
      screen: ConfirmCodeScreen,
    },
    ChangePassword: {
      screen: ChangePasswordScreen,
    },
    SignUp: {
      screen: SignUpScreen,
    },
    CreateAccount: {
      screen: CreateAccountScreen,
    },
    // New navigation
    Home: {
      screen: AppDrawerNavigation,
    },
  },
  {
    initialRouteName: 'Auth',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default createAppContainer(AppNavigation);

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
import EditTourScreen from '../screens/EditTourScreen';
import PreviewTour from '../screens/CreateTour/PreviewTour';
import ProfileScreen from '../screens/ProfileScreen';

import DefaultDrawer from './DefaultDrawer';

const AppDrawerNavigation = createDrawerNavigator(
  {
    TourList: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Tours',
      },
    },
    CreateTour: {
      screen: CreateTour,
      navigationOptions: {
        title: 'Create Tour',
      },
    },
    EditTour: {
      screen: EditTourScreen,
      navigationOptions: {
        drawerLabel: () => null,
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        title: 'Profile',
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
    PreviewTour: {
      screen: PreviewTour,
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

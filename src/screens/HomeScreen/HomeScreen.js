import React, {Component} from 'react';
import {
  View,
  Text,
  BackHandler,
  SafeAreaView,
  StatusBar,
  AsyncStorage,
} from 'react-native';
import {Icon} from 'react-native-elements';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar translucent={false} />
        <View style={{alignItems: 'flex-start', marginLeft: 15}}>
          <Icon
            name="menu"
            type="material-community"
            color="silver"
            size={32}
            onPress={() => {
              this.props.navigation.openDrawer();
            }}
          />
        </View>
        <Text>Home</Text>
      </SafeAreaView>
    );
  }
}

export default HomeScreen;

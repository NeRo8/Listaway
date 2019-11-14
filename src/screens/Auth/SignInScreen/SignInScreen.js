import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {Button} from 'react-native-elements';

import HeaderDefault from '../../../components/HeaderDefault';
import InputDefault from '../../../components/InputDefault';
import {LinearButton} from '../../../components/Buttons';
import GradientText from '../../../components/GradientText';

import {globalStyles, colors} from '../../../constants';
import styles from './styles';

class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
    };
  }

  onChangeState = (name, text) => {
    this.setState({
      [name]: text,
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.containerFull}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="white"
          translucent={false}
        />
        <HeaderDefault />
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.container}>
            <View styles={styles.block}>
              <GradientText style={globalStyles.headerTitle}>
                Sign In
              </GradientText>
              <View style={{marginVertical: 5}}>
                <Text style={globalStyles.underHeaderHint}>
                  Login first to continue
                </Text>
              </View>
            </View>
            <View style={styles.block}>
              <InputDefault
                name="email"
                value={this.state.email}
                label="Email"
                onChangeText={this.onChangeState}
              />
              <InputDefault
                name="password"
                value={this.state.password}
                label="Password"
                onChangeText={this.onChangeState}
              />
              <View style={{alignItems: 'flex-end', marginVertical: 15}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('RestorePassword')
                  }>
                  <Text style={styles.hint}>Forgot password?</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginTop: 5}}>
              <LinearButton title="LOGIN" />

              <View style={{marginTop: 20}}>
                <Button
                  icon={{
                    name: 'logo-facebook',
                    type: 'ionicon',
                    color: 'white',
                    size: 32,
                    containerStyle: {marginHorizontal: 10},
                  }}
                  title="Continue with Facebook"
                  titleStyle={styles.btnTitle}
                  buttonStyle={styles.btnStyleFacebook}
                  containerStyle={styles.btnContainerStyle}
                />
                <Button
                  icon={{
                    name: 'logo-google',
                    type: 'ionicon',
                    color: colors.LIGHT_BLUE,
                    containerStyle: {marginHorizontal: 10},
                  }}
                  title="Continue with Google"
                  titleStyle={styles.btnTitleWhite}
                  buttonStyle={styles.btnStyle}
                  containerStyle={styles.btnContainerStyle}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default SignInScreen;

import {StyleSheet, Platform} from 'react-native';
import colors from '../../constants/colors';

export default StyleSheet.create({
  header: {
    alignItems: 'flex-start',
    paddingLeft: 15,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    paddingBottom: 10,

    justifyContent: 'center',
  },
  trashCan: {
    width: '100%',
    height: '50%',
    backgroundColor: '#ff5252',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 25,
  },
  switcher: {
    width: '100%',
    height: '50%',
    backgroundColor: 'grey',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 15,
  },
  switchContainer: {
    marginTop: 16,
    width: 40,
    height: 20,
    borderRadius: 25,
    backgroundColor: '#ccc',
    padding: 2,
  },
  switchSircle: {
    width: 15,
    height: 15,
    borderRadius: 19,
    backgroundColor: 'white', // rgb(102,134,205)
  },
});

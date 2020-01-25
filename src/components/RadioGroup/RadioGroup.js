import React, {Component} from 'react';
import {FlatList, View, Modal, Text} from 'react-native';
import {CheckBox, Button} from 'react-native-elements';

import styles from './styles';

class RadioGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {visible, soundsList, onPressItem, onClose} = this.props;
    return (
      <Modal visible={visible} transparent>
        <View style={styles.wrap}>
          <View style={styles.radioGroupView}>
            <Text>Please choose song</Text>
            <FlatList
              data={soundsList}
              renderItem={({item}) => (
                <CheckBox
                  title={item.label}
                  checked={item.active}
                  onPress={() => {
                    onPressItem(item.id);
                  }}
                />
              )}
            />

            <Button
              title="Save as tour music"
              color="#f194ff"
              onPress={onClose}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

export default RadioGroup;

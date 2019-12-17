import React from 'react';
import {View, Modal, FlatList, Image} from 'react-native';

import {images} from '../../constants';

import styles from './styles';

const PhotoModal = () => {
  const photoList = [
    {image: images.image1},
    {image: images.image2},
    {image: images.image3},
    {image: images.image4},
  ];
  return (
    <Modal style={{flex: 1}}>
      <View style={{flex: 1}}>
        <FlatList
          data={photoList}
          renderItem={({item}) => (
            <Image
              source={item.image}
              style={{flex: 1, width: '100%', height: '50%'}}
              resizeMode="contain"
            />
          )}
        />
      </View>
    </Modal>
  );
};

export default PhotoModal;

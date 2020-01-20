import React, { Component } from 'react';

import {
    View,
    Platform,
    StatusBar,
    Text,
    ScrollView,
    Image,
    FlatList,
    Dimensions,
    Button,
} from 'react-native';

import TimedSlideshow from 'react-native-timed-slideshow';


class PreviewTour extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const items = [
            {
                uri: "http://www.lovethemountains.co.uk/wp-content/uploads/2017/05/New-Outdoor-Sports-and-Music-Festival-For-Wales-4.jpg",
                title: "Michael Malik",
                text: "Minnesota, USA",
            },
            {
                uri: "http://blog.adrenaline-hunter.com/wp-content/uploads/2018/05/bungee-jumping-barcelona-1680x980.jpg",
                title: "Victor Fallon",
                text: "Val di Sole, Italy",
                duration: 3000
            },
            {
                uri: "https://greatist.com/sites/default/files/Running_Mountain.jpg",
                title: "Mary Gomes",
                text: "Alps",
                fullWidth: true
            }
        ]
        return (
            <View style={{ width: '100%', height: '100%' }}>
                <TimedSlideshow items={items} />
                <Button
                    title="Save as tour musc"
                />
            </View>
        );
    }
}

export default PreviewTour;

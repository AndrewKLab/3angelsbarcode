import React from 'react';
import { Button, Text, View, FlatList, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { CommonActions } from '@react-navigation/native';
import { normalize } from '../components/FontResizer.js';

import axios from 'axios';

export default class ErrorScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
    };
  }

  componentDidMount() {
    this.getApiData()
  }
  
  getApiData() {
    axios
      .get('http://t.3angels.lan:8080/app/')
      .then((response) => {
        const data = Object.values(response.data);
        this.setState({
          isFetching: false,
        });
        this.props.navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              { name: 'Main' },
            ],
          })
        );
        
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isFetching: false,
        });
      });
  }

  onRefresh() {
    this.setState({ isFetching: true });
    this.getApiData();
  }

  render() {
    return (
      <FlatList
        style={styles.containerMain}
        onRefresh={() => this.onRefresh()}
        refreshing={this.state.isFetching}
        keyExtractor={(item) => item}
        onEndReachedThreshold={0}
        onEndReached={({ distanceFromEnd }) => {
          console.debug('on end reached ', distanceFromEnd);
        }}
        data={[this.state.error]}
        renderItem={({ item, index }) => {
          return (
            <View>
              <Text style={styles.textStyle}>Network Error</Text>
              <Text style={styles.subTextStyle}>
                Error: Выбрана неверная сеть.
              </Text>
              <Text style={styles.subSubTextStyle}>
                Пожалуйста, подключитесь к WIFI сети 3angels. За информацией по
                подключению, можно обратиться к администратору.
              </Text>
            </View>
          );
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  containerMain: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  textStyle: {
    color: '#212121',
    fontSize: normalize(26),
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 50
  },

  subTextStyle: {
    color: '#212121',
    fontSize: normalize(16),
    textAlign: 'center',
    marginBottom: 20
  },

  subSubTextStyle: {
    color: '#212121',
    fontSize: normalize(14),
    textAlign: 'center',
  },
});

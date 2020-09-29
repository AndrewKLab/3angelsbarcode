import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  AsyncStorage,
  BackHandler
} from 'react-native';
import { Surface, List, Title } from 'react-native-paper';
import Constants from 'expo-constants';
import { normalize } from '../components/FontResizer.js';
import axios from 'axios';

const localStorage = 'localStorage';

export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error: false,
      isFetching: false,
    };
  }

  componentDidMount() {
    this.load();
  }

  load = async () => {
    try {
      const id = await AsyncStorage.getItem(localStorage);
      if (id !== null) {
        this.props.navigation.navigate('User', { id: id });
        console.log(id);
        axios
          .get('http://t.3angels.lan:8080/app/')
          .then((response) => {
            const data = Object.values(response.data);
            this.setState({
              data: data,
              isFetching: false,
            });
          })
          .catch((error) => {
            console.log(error);
            this.props.navigation.navigate('Error');
            this.setState({
              isFetching: false,
            });
          });
      } else {
        this.getApiData();
      }
    } catch (e) {
      console.error('Failed to load .');
    }
  };

  getApiData() {
    axios
      .get('http://t.3angels.lan:8080/app/')
      .then((response) => {
        const data = Object.values(response.data);
        this.setState({
          data: data,
          error: false,
          isFetching: false,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          error: true,
          isFetching: false,
        });
        this.props.navigation.navigate('Error');
      });
  }
  onRefresh() {
    this.setState({ isFetching: true });
    this.getApiData();
  }

  goToUser = async (id) => {
    try {
      await AsyncStorage.setItem(localStorage, id);
      this.props.navigation.navigate('User', { id: id });
    } catch (e) {
      console.error('Failed to save name.');
    }
  };

  render() {
    return (
      <FlatList
        onRefresh={() => this.onRefresh()}
        refreshing={this.state.isFetching}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        data={this.state.data}
        renderItem={({ item, index }) => {
          return (
            <List.Item
              onPress={() => {
                this.goToUser(item.ID);
              }}
              title={item.Name}
              titleStyle={{
                fontSize: normalize(10),
                fontWeight: 'bold',
                textAlign: 'center',
                marginRight: 8,
              }}
              style={{
                flex: 1,
                margin: 5,
                minWidth: 170,
                maxWidth: 200,
                height: 90,
                maxHeight: 90,
                backgroundColor: item.DD === '2' ? '#eceff1' : '#4caf50',
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 2,
              }}></List.Item>
          );
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

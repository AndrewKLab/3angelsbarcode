import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Dimensions,
} from 'react-native';
import { Surface, List, Title, Button } from 'react-native-paper';
import Constants from 'expo-constants';
import { normalize } from '../components/FontResizer.js';
import axios from 'axios';
import moment from 'moment';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default class UserScreen extends React.Component {
  constructor(props) {
    super(props);
    this.op;
    this.dd;
    this.status;
    this.error;
    this.messege;
    this.state = {
      isStatus: false,
      name: '',
      time: '',
      messege: '',
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    axios
      .get(
        'http://t.3angels.lan:8080/app/?ID=' +
          this.props.route.params.id
      )
      .then((response) => {
        this.dd = response.data.DD;
        this.setState({
          dd: response.data.DD,
          name: response.data.Name,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  changeStatus() {
    if (this.dd == '1') {
      this.op = '2';
    } else {
      this.op = '1';
    }
    axios
      .get(
        'http://t.3angels.lan:8080/app/?ID=' +
          this.props.route.params.id +
          '&op=' +
          this.op
      )
      .then((response) => {
        this.dd = response.data.DD;
        this.status = response.data.status;
        this.setState({
          dd: response.data.dd,
          time: moment
            .unix(parseInt(response.data.time))
            .format('HH:mm:ss, MM/DD/YYYY'),
        });
        if (this.dd == '2') {
          this.setState({
            messege: 'Ушел',
          });
        } else {
          this.setState({
            messege: 'Пришел',
          });
        }
        if (this.status == 'Ok') {
          this.error = '';
        } else {
          this.error =
            ': Произошла ошибка записи в базу данных. Пожалуйста, обратитесь к администратору.';
        }
      })

      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
        <View style={styles.containerMain}>
          <View style={{ marginTop: 30 }}>
            <View>
              <Text style={styles.textStyle}>{this.state.name}</Text>
              <Text style={styles.subTextStyle}>{this.state.messege}</Text>
              <Text>{this.state.time}</Text>
              <Text>
                {this.status} {this.error}
              </Text>
              <Text></Text>
            </View>
          </View>
          <View style={styles.bottomView}>
            {this.dd === '2' ? (
              <Button
                style={styles.cameBtn}
                contentStyle={styles.cameBtn}
                mode="contained"
                onPress={() => this.changeStatus()}>
                Пришел
              </Button>
            ) : (
              <Button
                style={styles.goneBtn}
                contentStyle={styles.goneBtn}
                mode="contained"
                onPress={() => this.changeStatus()}>
                Ушел
              </Button>
            )}
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    alignItems: 'center',
  },
  bottomView: {
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },
  textStyle: {
    color: '#212121',
    fontSize: normalize(28),
  },

  subTextStyle: {
    color: '#212121',
    fontSize: normalize(16),
  },

  cameBtn: {
    backgroundColor: '#4caf50',
    width: '100%',
    height: Dimensions.get('window').height * 0.2,
    borderRadius: 0,
  },
  goneBtn: {
    backgroundColor: '#f44336',
    width: '100%',
    height: Dimensions.get('window').height * 0.2,
    borderRadius: 0,
  },
});

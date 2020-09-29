import * as React from 'react';
import { View, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { CommonActions } from '@react-navigation/native';

export default class Loading extends React.Component {

  componentDidMount() {
   this.getApiData()
  }

    getApiData() {
    axios
      .get('http://t.3angels.lan:8080/app/')
      .then((response) => {
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
          this.props.navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              { name: 'Error' },
            ],
          })
        );
      });
  }
  
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#084786" />
      </View>
    );
  }
}

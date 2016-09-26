/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  View
} from 'react-native';

class LocalReps extends Component {
  constructor(){
    super();
    this.state = {
      lat: "",
      long: "",
      hood: "",
      senator1: {},
      senator2: {},
      congressperson: {},
      hasNotUpdated: true,
      updateCount: 0
    }
    this.componentDidUpdate = this.componentDidUpdate.bind(this)
  }
  componentDidMount(){
    // AIzaSyDZ6zq0EkUIEbiExBbTFXzOuHl9Tt-Pr7Q
    navigator.geolocation.getCurrentPosition((loc)=> {
      this.setState({
        long: String(loc.coords.longitude),
        lat: String(loc.coords.latitude)
      })
    })

  }

  componentDidUpdate() {
    if (this.state.hasNotUpdated) {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.lat},${this.state.long}&key=AIzaSyBtTGcGiMAeg_2--AbeCWp63HYKGmznNHk`)
      .then((response) => response.json())
      .then((response) => {
        // debugger;
        this.setState({
          hood: response.results[2].formatted_address
        })
      })

      fetch(`http://congress.api.sunlightfoundation.com/legislators/locate?latitude=${this.state.lat}&longitude=${this.state.long}&apikey=ade7b857905c47a58787230f022263ca`)
      .then((response) => response.json())
      .then((response) => {
        // debugger;
        this.setState({
          senator1: response.results[0],
          senator2: response.results[1],
          congressperson: response.results[2],
          hasNotUpdated: false,
          updateCount: this.state.updateCount + 1
        })
      })
    }

  }
  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.welcome}>
            You are currently located at the following:
          </Text>

          <Text>
            Latitude: {this.state.lat}
          </Text>
          <Text>
            Longitude: {this.state.long}
          </Text>
          <Text>
            hood: {this.state.hood}
          </Text>
          <Text>
            senator one: {this.state.senator1.first_name}
          </Text>
          <Text>
            senator two: {this.state.senator2.first_name}
          </Text>
          <Text>
            update count: {this.state.updateCount}
          </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('localReps', () => LocalReps);

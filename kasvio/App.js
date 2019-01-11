import React, {Component} from 'react';
import { Font, AppLoading } from 'expo';
import { StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';

import NaviTabStack from './navigation/NaviTabStack';



export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Font.loadAsync({
      'TextMeOne-Regular': require("./assets/Fonts/TextMeOne-Regular.ttf"),

    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
        return (
          <AppLoading />
        );
    }
    return (
      <NaviTabStack/>

    );
  }
}

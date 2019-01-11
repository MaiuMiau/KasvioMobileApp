import React, { Component } from 'react';
import { StyleSheet,Image } from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Header,
  Button,Icon,Title,Card, CardItem, CardBody,View,
} from 'native-base';




class KasviappEtusivu extends Component {
  constructor(props) {
    super(props);

  }


  render() {

    const text = 'KASVIO';

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#eee',
        }}
      >
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
        <Header >
            <Body>
                <Title style={styles.header}>KASVIO</Title>

            </Body>
          </Header>
          <Image
            style={{
              flex: 1,

            }}
            source={require("../assets/lehdet10.jpg")}
          />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontSize: 50,
              fontFamily: 'TextMeOne-Regular',
              color: 'black',
            }}
          >
            {text}
          </Text>
        </View>
      </View>
    );
}
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    backgroundColor: 'white',
  },

  headingtext:{
    color: '#445e1c',
    fontSize: 21,
    textAlign: 'center',
    alignSelf: 'center',

  },

  header:{
    marginLeft: 5,
    fontFamily: 'TextMeOne-Regular',
    color: 'black',
    fontSize:22,

    fontWeight:'bold',
},
});

export default KasviappEtusivu;

import React, { Component } from 'react';
import { StyleSheet,Image,TouchableOpacity,Dimensions,View} from 'react-native';

import {
  Container, Content,List,ListItem,Left,Body,Right,
  Thumbnail,Text,Header,Button,Icon,Title,Card, CardItem, CardBody} from 'native-base';


class NaytaKasvi extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Body>
            <Title style={styles.header}>KASVIO</Title>
          </Body>
        </Header>
        <Content>
          <Card style={styles.card}>
            <CardItem header style={{ borderBottomWidth:1, borderBottomColor:'grey',}}>
                  <Text style={styles.headingtext} >{this.props.navigation.state.params.nimi}</Text>
            </CardItem>
            <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
            <CardItem style={{}}>
              <Image source={{uri: this.props.navigation.state.params.kuva}} style={{height: 250, width: null, flex: 1}}/>
            </CardItem>
            </TouchableOpacity>

              <View style={{flexDirection: 'row', paddingLeft:10, paddingBottom:5}}>
                  <View style={{ width: Dimensions.get('window').width/3+2,}}>
                  <Text style={styles.text}>Kastelu: </Text>
                </View>
                <View style={{ width: Dimensions.get('window').width/2+20,}}>
                  <Text style={styles.text2}>{this.props.navigation.state.params.kastelu}</Text>
                </View>
              </View>

              <View style={{flexDirection: 'row', paddingLeft:10, paddingBottom:10,borderBottomWidth:1, borderBottomColor:'grey'}}>
                  <View style={{ width: Dimensions.get('window').width/3+2,}}>
                  <Text style={styles.text}>Valo: </Text>
                </View>
                <View style={{ width: Dimensions.get('window').width/2+20,}}>
                  <Text style={styles.text2}>{this.props.navigation.state.params.valontarve}</Text>
                </View>
                </View>

              <View style={{flexDirection: 'row', paddingLeft:10, paddingBottom:5,paddingTop:10}}>
                <View style={{ width: Dimensions.get('window').width/3+2,}}>
                  <Text style={styles.text}>Ostopaikka:</Text>
                </View>
                <View style={{ width: Dimensions.get('window').width/2+20,}}>
                  <Text style={styles.text2}>{this.props.navigation.state.params.ostopaikka}</Text>
              </View>
              </View>

              <View style={{flexDirection: 'row', paddingLeft:10, paddingBottom:5}}>
                <View style={{ width: Dimensions.get('window').width/3+2,}}>
                  <Text style={styles.text}>Ostopäivä:</Text>
                </View>
                <View style={{ width: Dimensions.get('window').width/2+20,}}>
                 <Text style={styles.text2} >{this.props.navigation.state.params.ostopaiva}</Text>
              </View>
              </View>

              <View style={{flexDirection: 'row', paddingLeft:10, paddingBottom:5}}>
                <View style={{ width: Dimensions.get('window').width/3+2,}}>
                  <Text style={styles.text}>Hinta:</Text>
                </View>
                  <View style={{ width: Dimensions.get('window').width/2+20,}}>
                  <Text style={styles.text2}>{this.props.navigation.state.params.hinta}€</Text>
                    </View>
              </View>

              <View style={{flexDirection: 'row', paddingLeft:10, paddingBottom:5}}>
                    <View style={{ width: Dimensions.get('window').width/3,}}>
                      <Text style={styles.text}>Lisätiedot:</Text>
                </View>
                <View style={{ width: Dimensions.get('window').width/2+20,}}>
                <Text style={styles.text2}>{this.props.navigation.state.params.lisatiedot}</Text>
                </View>
                </View>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e5e5e5',
  },
  headingtext:{
    color: 'black',
    fontSize: 23,
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: 'TextMeOne-Regular',
  },
  header:{
    marginLeft: 5,
    fontFamily: 'TextMeOne-Regular',
    color: 'black',
    fontSize:22,
    fontWeight:'bold',
},
  view:{
    paddingLeft: 20,

  },
  card:{
    flex: 1,
    width: Dimensions.get('window').width-20,
    paddingBottom: 5,
    paddingLeft: 0,
    marginBottom:10,
    marginRight: 15,
    marginLeft: 10,
    marginTop: 20,
  },
  text:{
    fontFamily: 'TextMeOne-Regular',
    color: 'black',
    fontSize: 18,
  },
  text2:{
    fontFamily: 'TextMeOne-Regular',
      color: '#445e1c',
      fontSize: 16,
  },
});

export default NaytaKasvi;

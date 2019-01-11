import React, { Component } from 'react';
import { View, StyleSheet, Image,ScrollView,Platform,KeyboardAvoidingView,TouchableOpacity,Dimensions} from 'react-native';
import {
  Container,Content,Header,Title,Card, Body,CardItem,CardBody,
  Form,Item,Input,Button,Text,Icon,ImageStyle,Style
} from 'native-base';

import { ImageBackground } from 'react-native';
import{SQLite} from 'expo'

const db = SQLite.openDatabase('kasvit.db');

class EtsiKasvi extends Component {

  constructor(props){
    super(props);

    this.state={
      opacity: 0,
      nimi: '',
      ostopaiva: '',
      ostopaikka:'',
      hinta:'',
      kastelu:'',
      valontarve:'',
      lisatiedot:'',
      kuva: 'undefined',

    };

    this.kasitteleEtsi = this.kasitteleEtsi.bind(this);
    this.kasitteleTyhjenna = this.kasitteleTyhjenna.bind(this);
  }
   componentDidMount = () => {};

  kasitteleEtsi() {

    const {input_nimi} =this.state;

    {console.log(this.state.nimi)}
    db.transaction(tx => {
      tx.executeSql(
        'select * from kasvi where nimi = ?',
        [input_nimi],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len',len);
          if (len > 0) {
            console.log(results.rows.item(0).nimi);

            this.setState({
             nimi:results.rows.item(0).nimi,
            });
            this.setState({
             ostopaiva:results.rows.item(0).ostopaiva,
            });
            this.setState({
             ostopaikka:results.rows.item(0).ostopaikka,
            });
            this.setState({
             hinta:results.rows.item(0).hinta,
            });
            this.setState({
             kastelu:results.rows.item(0).kastelu,
            });
            this.setState({
             valontarve:results.rows.item(0).valontarve,
            });
            this.setState({
             kuva:results.rows.item(0).kuva,
            });

            this.setState({
             lisatiedot:results.rows.item(0).lisatiedot,
            });

            this.setState({opacity: 100});

          }else{
            alert('Kasvia ei löydy hakemallasi nimellä');
            this.setState({
              nimi: '',
              ostopaiva: '',
              ostopaikka:'',
              hinta:'',
              kastelu:'',
              valontarve:'',
              kuva: null,
              lisatiedot:'',
              opacity: 0,
            });
          }
        }
      );
    });
  };

  kasitteleTyhjenna() {
    this.setState({
      nimi: '',
      ostopaiva: '',
      ostopaikka:'',
      hinta:'',
      kastelu:'',
      valontarve:'',
      kuva: null,
      lisatiedot:'',
      opacity: 0,
      input_nimi:'',
    });
  alert('Tyhjennetty')
  }

  render() {

    return (
      <ImageBackground source={require("../assets/lehdet24.jpg")} style={{width: null,height: null,flex:1,backgroundColor:'rgb(0,0,0)'}}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}>
          <ScrollView>
            <Header >
              <Body>
                <Title  style={styles.header}>KASVIO</Title>
              </Body>
            </Header>

      <Form style={styles.form}>
        <Item regular  style={styles.item}>
          <Input placeholder='Anna kasvin nimi' onChangeText={input_nimi => this.setState({input_nimi})} />
        </Item>
      </Form>

      <View style={styles.buttonContainer}>
          <Button style={styles.button} iconLeft onPress={this.kasitteleEtsi}><Icon name ='search'/>
            <Text>Etsi</Text>
          </Button>
          <Button style={styles.button3} iconLeft onPress={this.kasitteleTyhjenna}><Icon name ='trash'/>
            <Text>tyhjennä</Text>
          </Button>
      </View>

            <View style = {{opacity: this.state.opacity}}>
                  <Card style={styles.card}>
                    <CardItem header style={{ borderBottomWidth:1, borderBottomColor:'grey',}}>
                          <Text style={styles.headingtext} >{this.state.nimi}</Text>
                    </CardItem>
                      <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                        <CardItem>
                          {this.state.kuva && <Image source={{ uri: this.state.kuva }} style={{height: 250, width: null, flex: 1}}/>}
                        </CardItem>
                      </TouchableOpacity>

                      <View style={{flexDirection: 'row', paddingLeft:10, paddingBottom:5}}>
                          <View style={{ width: Dimensions.get('window').width/3+2,}}>
                          <Text style={styles.text}>Kastelu: </Text>
                        </View>
                        <View style={{ width: Dimensions.get('window').width/2+20,}}>
                          <Text style={styles.text2}>{this.state.kastelu}</Text>
                        </View>
                      </View>

                      <View style={{flexDirection: 'row', paddingLeft:10, paddingBottom:10,borderBottomWidth:1, borderBottomColor:'grey'}}>
                          <View style={{ width: Dimensions.get('window').width/3+2,}}>
                          <Text style={styles.text}>Valo: </Text>
                        </View>
                        <View style={{ width: Dimensions.get('window').width/2+20,}}>
                          <Text style={styles.text2}>{this.state.valontarve}</Text>
                        </View>
                      </View>

                      <View style={{flexDirection: 'row', paddingLeft:10, paddingBottom:5,paddingTop:10}}>
                        <View style={{ width: Dimensions.get('window').width/3+2,}}>
                          <Text style={styles.text}>Ostopaikka:</Text>
                        </View>
                        <View style={{ width: Dimensions.get('window').width/2+20,}}>
                          <Text style={styles.text2}>{this.state.ostopaikka}</Text>
                      </View>
                      </View>

                      <View style={{flexDirection: 'row', paddingLeft:10, paddingBottom:5}}>
                        <View style={{ width: Dimensions.get('window').width/3+2,}}>
                          <Text style={styles.text}>Ostopäivä:</Text>
                        </View>
                        <View style={{ width: Dimensions.get('window').width/2+20,}}>
                         <Text style={styles.text2} >{this.state.ostopaiva}</Text>
                      </View>
                      </View>

                      <View style={{flexDirection: 'row', paddingLeft:10, paddingBottom:5}}>
                        <View style={{ width: Dimensions.get('window').width/3+2,}}>
                          <Text style={styles.text}>Hinta:</Text>
                        </View>
                          <View style={{ width: Dimensions.get('window').width/2+20,}}>
                          <Text style={styles.text2}>{this.state.hinta}€</Text>
                            </View>
                      </View>

                        <View style={{flexDirection: 'row', paddingLeft:10, paddingBottom:5}}>
                            <View style={{ width: Dimensions.get('window').width/3,}}>
                              <Text style={styles.text}>Lisätiedot:</Text>
                        </View>
                        <View style={{ width: Dimensions.get('window').width/2+20,}}>
                        <Text style={styles.text2}>{this.state.lisatiedot}</Text>
                        </View>
                        </View>
                      </Card>
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
            </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    paddingBottom: 5,
    paddingRight: 5,
    backgroundColor:'rgb(0,0,0)',
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
  form: {
    marginTop: 25,
    paddingBottom: 5,
    paddingRight: 5,
    paddingLeft: 5,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft:10,
    alignItems: 'flex-end', // Ei tottele, syy NativeBase?
  },
  button: {
    height: 45,
    width: 145,
    marginRight: 10,
    marginTop: 10,
    justifyContent: 'center',
    backgroundColor:'rgb(198, 87, 65)',
    //backgroundColor:'rgb(102, 100, 101)',
  },
  button3: {
    height: 45,
    width: 145,
    marginRight: 10,
    marginTop: 10,
    justifyContent: 'center',
    backgroundColor:'rgb(78, 79, 77)',
  },
  image: {
    flex: 1,
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 10,
  },
  headingtext:{
    color: 'black',
    fontSize: 23,
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: 'TextMeOne-Regular',
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
  label:{
    marginLeft: 5,
    fontFamily: 'TextMeOne-Regular',
    color: 'black',
    fontSize:22,
  },
  item:{
      justifyContent: 'center',
      borderColor: "black",
      borderRadius: 3,
      backgroundColor:'rgba(219, 219, 219,0.9)',
      marginRight: 5,
      marginTop: 5,
      marginBottom: 5,
      marginLeft: 5,
  },
  header:{
    marginLeft: 5,
    fontFamily: 'TextMeOne-Regular',
    color: 'black',
    fontSize:22,
},
});

export default EtsiKasvi;

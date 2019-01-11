import React, { Component, } from 'react';
import { View,StyleSheet, Image, Dimensions,ScrollView,TouchableOpacity, } from 'react-native';
import PhotoGrid from 'react-native-image-grid';
import {
  Container,Content,List,ListItem,Left,Body,Right,Thumbnail,Text,
  Button,Header,Title, Subtitle
} from 'native-base';
import { SQLite } from 'expo';

const db = SQLite.openDatabase('kasvit.db');

class ListaaKasvitBase extends Component {
  constructor(props) {
    super(props);
    this.state = { kasvit: [] };
  }
  componentDidMount = () => {

    db.transaction(tx => {
      let sql =
        'CREATE TABLE if not exists kasvi (' +
        "id integer PRIMARY KEY NOT NULL, " +
                "nimi text NOT NULL, " +
                "ostopaiva date NOT NULL, " +
                "ostopaikka text NOT NULL, " +
                "hinta decimal NOT NULL, " +
                "kastelu text NOT NULL, " +
                "valontarve text NOT NULL, " +
                "kuva blob, " +
                "lisatiedot text )";

      tx.executeSql(sql, null, null, this.virhe);
    });
  };

  haeKasvit = () => {
    db.transaction(tx => {
      tx.executeSql('select * from kasvi', null, this.ok, this.virhe);
    });
  };

  ok = (tx, results) => {
    this.setState({ kasvit: results.rows._array });
  };

  virhe = (tx, error) => {
    alert('Kasveja ei voitu listata');
  };

  renderItem = kasvi => {
    return (
      <TouchableOpacity key = { kasvi.id }
      onPress={() => this.props.navigation.navigate('Kasvi',
       { kuva: kasvi.kuva, nimi:kasvi.nimi,
         ostopaiva:kasvi.ostopaiva, ostopaikka:kasvi.ostopaikka,
         hinta:kasvi.hinta, kastelu:kasvi.kastelu,
         valontarve:kasvi.valontarve, lisatiedot:kasvi.lisatiedot  })}>
                  <Image style={styles.image} source={{ uri: kasvi.kuva}} />
      </TouchableOpacity>

    );
  };

  render() {
    this.haeKasvit();

    if (this.state.kasvit.length === 0) {
      return (
        <Container style={styles.container}>
          <Content>
            <Text>Ei kasveja tietokannssa</Text>
          </Content>
        </Container>
      );
    }

    return(
      <Container style={styles.container}>
      <Header >
        <Body>
          <Title style={styles.header}>KASVIO</Title>
        </Body>
      </Header>
        <PhotoGrid
          data = { this.state.kasvit }
          itemsPerRow = { 3 }
          paddingTop={5}
          renderItem = { this.renderItem }
          />
      </Container>
  );
  }
}

const styles = StyleSheet.create({
  container: {
  justifyContent:'center',
    backgroundColor: '#e5e5e5',
  },
  image: {
    margin:2,
    //marginLeft:5,
    width: Dimensions.get('window').width/3-4,
    height:100,
    justifyContent:'center',
    flex: 1,
    backgroundColor: '#f9fff2',
  },
  header:{
    marginLeft: 5,
    fontFamily: 'TextMeOne-Regular',
    color: 'black',
    fontSize:22,
},


});

export default ListaaKasvitBase;

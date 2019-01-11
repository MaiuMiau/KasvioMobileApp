import React, { Component } from 'react';
import { StyleSheet,Image,TouchableOpacity } from 'react-native';
import {
  Container,Content,List,ListItem,Left,
  Body,Right,Thumbnail,Text,Button,
  Header,Title,Subtitle,Card,CardItem,Icon} from 'native-base';
import Swipeout from 'react-native-swipeout';
import { SQLite } from 'expo';

const db = SQLite.openDatabase('kasvit.db');

class ListaaKasvit extends Component {
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

   kasittelePoista = id => {
   db.transaction(tx => {
     tx.executeSql(
       'delete from kasvi where id=?',
       [id],
       null,
       null
     );
   });
 };

 okPoisto = (tx, results) => {};

 virhe = (tx, error) => {
   alert('Kasvin poisto ei onnistunut');
 };

/*   OMA KOKEILU
kasittelePoista = id => {
    db.transaction(tx =>) {
        tx.executeSql('delete from kasvi where id=?', [{kasvi.id}], function(transaction, result) {
            console.log(result);
            console.info('Poiatettu');
        }, function(transaction, error) {
            console.log(error);
        });
    }, transError, transSuccess);
}*/

  renderItem = kasvi => {
    let swipeoutButtonit = [
      {
        text: 'poista',
        backgroundColor: 'black',

        onPress: () => {this.kasittelePoista(kasvi.id)},

      },
      {
        text: 'muokkaa',
        backgroundColor: 'rgb(104, 119, 86)',
        width:1,
        onPress:() => {this.props.navigation.navigate('Muokkaa', { id:kasvi.id, kuva:kasvi.kuva, nimi:kasvi.nimi, ostopaiva:kasvi.ostopaiva, ostopaikka:kasvi.ostopaikka, hinta:kasvi.hinta, kastelu:kasvi.kastelu, valontarve:kasvi.valontarve, lisatiedot:kasvi.lisatiedot})}
      }
    ]

    return (

    <Card style={styles.listItem}  >
      <Swipeout right={swipeoutButtonit} autoClose={true} buttonWidth={80} >
        <CardItem >
            <Left style={styles.left}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Kasvi', { kuva:kasvi.kuva, nimi:kasvi.nimi, ostopaiva:kasvi.ostopaiva, ostopaikka:kasvi.ostopaikka, hinta:kasvi.hinta, kastelu:kasvi.kastelu, valontarve:kasvi.valontarve, lisatiedot:kasvi.lisatiedot})}>
                  <Thumbnail button square large source={{uri:kasvi.kuva}} />
               </TouchableOpacity>
             </Left>
             <Body>
               <Text style={styles.text2}>{kasvi.nimi}</Text>
               <Text style={styles.text} note >{kasvi.ostopaiva} </Text>
             </Body>
          </CardItem>
        </Swipeout>
      </Card>

    );
  };

  render() {
    this.haeKasvit();

    if (this.state.kasvit.length === 0) {
      return (
        <Container style={styles.container}>
          <Content>
            <Text style={styles.text2}>Sinulla ei ole vielä yhtää viherkasvia</Text>
          </Content>
        </Container>
      );
    }
    return (
      <Container style={styles.container}>
        <Header >
          <Body>
              <Title style={styles.header}>KASVIO</Title>
          </Body>
        </Header>
        <Content>
          <List dataArray={this.state.kasvit} renderRow={this.renderItem} />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e5e5e5',
  },
  text:{
    fontFamily: 'TextMeOne-Regular',
      color: '#445e1c',
      fontSize: 14,
  },
  text2:{
    fontFamily: 'TextMeOne-Regular',
      color: 'black',
      marginBottom:5,
      fontSize: 20,
  },
    header:{
      marginLeft: 5,
      fontFamily: 'TextMeOne-Regular',
      color: 'black',
      fontSize:22,
  },
  listItem:{
    marginBottom:5,
    marginTop:5,
    marginLeft:5,
    marginRight:5,
    height:100,
  },

  left: {
    maxWidth:100,
  },
});

export default ListaaKasvit;

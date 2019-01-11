import React, { Component } from 'react';
import { View,StyleSheet, Image } from 'react-native';
//import {haeKaikkiKasvit} from '../api/KasviAPI';
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
  Button,Icon,Title,Card, CardItem, CardBody,
} from 'native-base';
import{SQLite} from 'expo'

 const db = SQLite.openDatabase('kasvit.db');


class Kuvagalleria extends Component {
  constructor(props) {
    super(props);
    this.state = { kasvit: [] };
  }


  componentDidMount = () => {
    //  haeKaikkiKasvit(this.kasitteleHaku);

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
//this.setState({ kasvit: data });
haeKasvit = () => {
    db.transaction(tx => {
      tx.executeSql('select * from kasvi', null, this.ok, this.virhe);
    });

  };
  ok = (tx, results) => {
  console.log(JSON.stringify(results.rows._array));
  this.setState({ kasvit: results.rows._array });
};

virhe = (tx, error) => {
  console.log('Virhe: ' + error);
  alert('VIRHE' + error)
};


/*    kasittelePoista = (id) => {

      db.transaction(tx => {

          tx.executeSql('delete from kasvi where id=?'), [id]
      });

}*/
  // onPress on navigaatioon
  renderItem = kasvi => {
    return (
      <ListItem image  onPress={() =>
        this.props.navigation.navigate('Kasvi',
        { kuva: kasvi.kuva, nimi:kasvi.nimi, ostopaiva:kasvi.ostopaiva,
          ostopaikka:kasvi.ostopaikka,
          hinta:kasvi.hinta, kastelu:kasvi.kastelu,
          valontarve:kasvi.valontarve, lisatietoja:kasvi.lisatietoja  })}>

           <Image style={styles.image} source={{ uri: kasvi.kuva}} />

           </ListItem>



    );
  };

  render() {
    this.haeKasvit();
    if (this.state.kasvit.length === 0) {
      return <Container style={styles.container}>
        <Content>
          <Text>Ei yhtään kasveja tietokannssa</Text>
        </Content>
      </Container>
    }
    return (
      <Container style={styles.container}>
        <Content>

        <Card>
                  <CardItem>
                    <Body>
                      <Text style={styles.headingtext}>Kuvagalleria</Text>
                    </Body>
                  </CardItem>
              </Card>
          <List dataArray={this.state.kasvit} renderRow={this.renderItem} />
        </Content>
      </Container>
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
  image: {
    flex: 1,
    width: 50,
    height: 50,
    //alignSelf: 'center', // Keskittää yksittäisen komponentin
    marginTop: 10,
  },
});

export default Kuvagalleria;

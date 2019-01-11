import React, { Component } from 'react';
import { View, StyleSheet, Image,ScrollView,Platform,KeyboardAvoidingView, Dimensions} from 'react-native';
import {
  Container,
  Content,
  Header,
   Left, Right,Body,Title,Card, CardItem, CardBody,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Icon,
  Textarea, Subtitle,ImageStyle,Style
} from 'native-base';
import DatePicker from 'react-native-datepicker';
import { ImageBackground } from 'react-native';
import{SQLite, ImagePicker, Permissions, Camera,} from 'expo'

const db = SQLite.openDatabase('kasvit.db');

//const keyboardVerticalOffset = Platform.OS === 'ios' ? 'padding' : null
class Lomake extends Component {

  constructor(props){
    super(props);

    this.state={
      nimi: '',
      ostopaiva: this.teePaiva(),
      ostopaikka:'',
      hinta:'',
      kastelu:'',
      valontarve:'',
      lisatiedot:'',
      kuva: null,
    };

    this.kasitteleLisaa = this.kasitteleLisaa.bind(this);
    this.kasitteleTyhjenna = this.kasitteleTyhjenna.bind(this);
  }
//  componentDidMount = () => {

//  };

  async componentDidMount() {}

  teePaiva = () => {
    let tanaan = new Date();
    let kuukausi = tanaan.getMonth() + 1;
    if (kuukausi < 10) {
      kuukausi = '0' + kuukausi;
    }
    let paiva = tanaan.getDate();
    if (paiva < 10) {
      paiva = '0' + paiva;
    }
    let pvm = paiva + '.' + kuukausi + '.' + tanaan.getFullYear();
    return pvm;
  };

  kasitteleLisaa() {

    /*db.transaction(tx => {
        tx.executeSql('delete from kasvi');
    });*/


    db.transaction(tx => {
      let sql =
        'CREATE TABLE if not exists kasvi (' +
        'id integer PRIMARY KEY NOT NULL, ' +
                'nimi text NOT NULL, ' +
                'ostopaiva date NOT NULL, ' +
                'ostopaikka text NOT NULL, ' +
                'hinta decimal NOT NULL, ' +
                'kastelu text NOT NULL, ' +
                'valontarve text NOT NULL, ' +
                'kuva blob, ' +
                'lisatiedot text )';

        tx.executeSql(sql, null, null, this.virhe);
});

db.transaction(tx => {
let sql =
'INSERT INTO kasvi (nimi,ostopaiva,ostopaikka,hinta,kastelu,valontarve,kuva,lisatiedot) ' +
' VALUES (?,?,?,?,?,?,?,?)';
tx.executeSql(
sql,
[
this.state.nimi,
this.state.ostopaiva,
this.state.ostopaikka,
this.state.hinta,
this.state.kastelu,
this.state.valontarve,
this.state.kuva,
this.state.lisatiedot,
],
this.lisatty,
this.virhe
);
});

}

virhe = () => {

console.log('KASVIN LISÄYS EI ONNISTUNUT');
};
lisatty = () => {
  this.setState({
    nimi: '',
    ostopaiva: this.teePaiva(),
    ostopaikka:'',
    hinta:'',
    kastelu:'',
    valontarve:'',
    kuva: null,
    lisatiedot:'',
  });
  alert('Uusi kasvi lisättiin');
};

  kasitteleTyhjenna() {
    this.setState({
      nimi: '',
      ostopaiva: this.teePaiva(),
      ostopaikka:'',
      hinta:'',
      kastelu:'',
      valontarve:'',
      kuva: null,
      lisatiedot:'',

    });
  alert('Tyhjennetty')
  }

  askPermissionsAsync = async () => {
     await Permissions.askAsync(Permissions.CAMERA);
     await Permissions.askAsync(Permissions.CAMERA_ROLL);
   };

   otaKuva = async () => {
     await this.askPermissionsAsync();

     let result = await ImagePicker.launchCameraAsync({
       base64: true,
     });

     if (!result.cancelled) {
       this.setState({ kuva: result.uri });
     }
   };

   haeKuva = async () => {
     let result = await ImagePicker.launchImageLibraryAsync({
       base64: true,
     });

     if (!result.cancelled) {
       this.setState({ kuva: result.uri });
     }
   };

  render() {
    return (
      <ImageBackground source={require("../assets/lehdet22.jpg")} style={{width: null,height: null,flex:1,backgroundColor:'rgb(0,0,0)'}}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}>

          <ScrollView>

            <Header >
              <Body>
                <Title  style={styles.header}>KASVIO</Title>
              </Body>
            </Header>

            <Form style={styles.form}>
              <Label style={styles.label}>Nimi</Label>
                <Item regular  style={styles.item}>
                  <Input value={this.state.nimi} onChangeText={text => this.setState({nimi: text})} />
                </Item>

              <View style={styles.buttonContainer}>
                <Button iconLeft style={styles.button} onPress={this.otaKuva}><Icon name="camera" />
                  <Text >Ota kuva</Text>
                </Button>
                <Button iconLeft style={styles.button} onPress={this.haeKuva}><Icon name="attach" />
                  <Text>Hae kuva</Text>
                </Button>
              </View>
                {this.state.kuva && <Image source={{ uri: this.state.kuva }} style={styles.image} />}

              <Label style={styles.label}>Ostopäivä</Label>
                <Item regular style={styles.item}>
                  <Text>{this.state.ostopaiva}</Text>
                    <DatePicker
                      style={{width: 200, flex:1}}
                      date={this.state.ostopaiva}
                      mode="date"
                      placeholder="select date"
                      format="DD.MM.YYYY"

                      confirmBtnText="OK"
                      cancelBtnText="Peruuta"
                      customStyles={{
                        dateIcon: {
                          position: 'absolute',
                          right:0,

                        },
                        dateInput: {
                          backgroundColor: 'white',
                          display:'none'

                        }

                      }}
                        onDateChange={(date) => {this.setState({ostopaiva: date})}}
                        />

                  </Item>
                <Label style={styles.label}>Ostopaikka</Label>
                  <Item regular style={styles.item}>
                    <Input value={this.state.ostopaikka} onChangeText={text => this.setState({ostopaikka: text})}/>
                  </Item>

                <Label style={styles.label}>Hinta</Label>
                  <Item regular style={styles.item}>
                    <Input value={this.state.hinta} onChangeText={text => this.setState({hinta: text})} />
                  </Item>

                <Label  style={styles.label}>Kastelu</Label>
                  <Item regular style={styles.item}>
                    <Input value={this.state.kastelu} onChangeText={text => this.setState({kastelu: text})} />
                  </Item>

                <Label  style={styles.label}>Valontarve</Label>
                  <Item regular style={styles.item}>
                    <Input value={this.state.valontarve} onChangeText={text => this.setState({valontarve: text})} />
                  </Item>

                <Label  style={styles.label}>Lisätietoja</Label>
                  <Item last rounded style={styles.item}>
                    <Input value={this.state.lisatiedot} rowSpan={5} onChangeText={text => this.setState({lisatiedot: text})} />
                    </Item>
              </Form>
                <View style={styles.buttonContainer2}>
                  <Button style={styles.button2} iconLeft  onPress={this.kasitteleLisaa}><Icon name ='leaf' />
                    <Text>Tallenna kasvi</Text>
                  </Button>
                  <Button style={styles.button3}  iconLeft onPress={this.kasitteleTyhjenna}><Icon name='trash' />
                    <Text>Tyhjennä lomake</Text>
                  </Button>
                  <Text></Text>
                  <Text></Text>
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
  },
  buttonContainer2: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft:10,
  },
  button: {
    height: 45,
    width: 145,
    marginRight: 10,
    marginTop: 10,
    justifyContent: 'center',
    backgroundColor:'rgb(198, 87, 65)',
  },
  button2: {
    height: 45,
    width: 300,
    marginRight: 10,
    marginTop: 10,
    justifyContent: 'center',
    backgroundColor:'rgb(198, 87, 65)',
  },
  button3: {
    height: 45,
    width: 300,
    marginRight: 10,
    marginTop: 10,
    justifyContent: 'center',
    backgroundColor:'rgb(78, 79, 77)',
  },
  image: {
    flex: 1,
    width: Dimensions.get('window').width-20,
    height: 180,
    alignSelf: 'center',
    marginTop: 10,
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

export default Lomake;

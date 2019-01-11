import React, { Component } from 'react';
import { View, StyleSheet, Image,ScrollView,Platform,KeyboardAvoidingView,Dimensions} from 'react-native';
import {
  Container,Content,Header,Left,Body,Title,Card, CardItem, CardBody,
  Form,Item,Input,Label,Button,Text,Icon,Textarea,
} from 'native-base';
import DatePicker from 'react-native-datepicker';
import{SQLite, ImagePicker, Permissions} from 'expo'
import { ImageBackground } from 'react-native';
 const db = SQLite.openDatabase('kasvit.db');

class Muokkauslomake extends Component {
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

    this.paivitaKasvi = this.paivitaKasvi.bind(this);

  }
  componentDidMount = () => {
    this.setState({nimi:this.props.navigation.state.params.nimi});
    this.setState({ostopaiva:this.props.navigation.state.params.ostopaiva});
    this.setState({ostopaikka:this.props.navigation.state.params.ostopaikka});
    this.setState({hinta:this.props.navigation.state.params.hinta});
    this.setState({kastelu:this.props.navigation.state.params.kastelu});
    this.setState({valontarve:this.props.navigation.state.params.valontarve});
    this.setState({kuva:this.props.navigation.state.params.kuva});
    this.setState({lisatiedot:this.props.navigation.state.params.lisatiedot});

  };

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

  paivitaKasvi() {

    db.transaction( tx => {
        let sql ='UPDATE kasvi set nimi=?, ostopaiva=? , ostopaikka=?, hinta=?, kastelu=?, valontarve=?, kuva=?, lisatiedot=? where id=?'
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
         this.props.navigation.state.params.id
       ],
       this.muokattu,
       this.virhe
       );
       });
}

virhe = () => {

console.log('Tietojen päivitys ei onnistunut');
};
muokattu = () => {
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
  alert('Kasvin tiedot päivitettiin onnistuneesti');
};

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
    <ImageBackground source={require("../assets/lehdet24.jpg")} style={{width: null,height: null,flex:1,backgroundColor:'rgb(0,0,0)'}}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}>
        <ScrollView>

          <Header >
            <Body>
              <Title style={styles.header}>Kasvio</Title>
            </Body>
          </Header>

        <Form style={styles.form}>
          <Label style={styles.label}>Nimi</Label>
            <Item regular  style={styles.item}>
              <Input  value={this.state.nimi} onChangeText={text => this.setState({nimi: text})} />
            </Item>

        <View style={styles.buttonContainer}>
         <Button iconLeft style={styles.button} onPress={this.otaKuva}> <Icon name="camera" />
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
                    <Input value={this.state.lisatiedot} Textarea rowSpan={5} onChangeText={text => this.setState({lisatiedot: text})} />
                </Item>

          </Form>
          <View style={styles.buttonContainer2}>
            <Button style={styles.button2} iconLeft  onPress={this.paivitaKasvi}><Icon name ='leaf' />
              <Text>Päivitä tiedot</Text>
            </Button>
            <Button style={styles.button3}  iconLeft onPress={() => this.props.navigation.goBack(null)}><Icon name='ios-backspace-outline' />
              <Text>Takaisin listaukseen</Text>
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
    header:{
      marginLeft: 5,
      fontFamily: 'TextMeOne-Regular',
      color: 'black',
      fontSize:22,
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
      backgroundColor:'rgb(104, 119, 86)',
    },
    button3: {
      height: 45,
      width: 300,
      marginRight: 10,
      marginTop: 10,
      justifyContent: 'center',
      backgroundColor:'rgb(198, 87, 65)',
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
  });


  export default Muokkauslomake;

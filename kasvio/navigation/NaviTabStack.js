import React from 'react';
import { Icon, Header,Container,
Content,
List,
ListItem,
Left,
Body,
Right,
Thumbnail,
Text,
Button,Title} from 'native-base';

import KasviappEtusivu from '../page/KasviappEtusivu';
import Muokkauslomake from '../page/Muokkauslomake';
import ListaaKasvit from '../page/ListaaKasvit';
import NaytaKasvi from '../page/NaytaKasvi';
import Lomake from '../page/Lomake';
import Galleria from '../page/Galleria';
import EtsiKasvi from '../page/EtsiKasvi';

import {
  createBottomTabNavigator,
  TabBarBottom,
  createStackNavigator,
} from 'react-navigation';

const Tab = createBottomTabNavigator(

  {
    Etusivu: { screen: ListaaKasvit },
    Lisää: { screen: Lomake },
    Kasvit: { screen: EtsiKasvi },
    Kuvat: { screen: Galleria},

  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        let iconName;

        if (navigation.state.routeName === 'Etusivu') {
          iconName = `ios-leaf${focused ? '' : '-outline'}`;
        } else if (navigation.state.routeName === 'Lisää') {
          iconName = `ios-add-circle${focused ? '' : '-outline'}`;
        } else if (navigation.state.routeName === 'Kasvit') {
          iconName = `ios-search${focused ? '' : '-outline'}`;
        }else if (navigation.state.routeName === 'Kuvat') {
          iconName = `ios-images${focused ? '' : '-outline'}`;
        }

        return <Icon name={iconName} size={29} color={tintColor} />;
      },
    }),
      tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: '#696969',
      showLabel: false,
      labelStyle: { fontSize: 16 },
    },

 }
);

const NaviTabStack = createStackNavigator(
  {
    Tab: {
      screen: Tab,
    },
    Kasvi: {
      screen: NaytaKasvi,
    },
    Muokkaa: {
      screen: Muokkauslomake,
    },
    ListaaKasvitBase: {
      screen: ListaaKasvit,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export default NaviTabStack;

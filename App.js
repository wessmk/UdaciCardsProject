import React, {Component} from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { getDecks, saveDeckTitle } from "./utils/api"
import Decks from "./components/Decks";
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducer from './reducers'
import middleware from "./middleware";
import { purple, red, blue, white, lightPurp, orange } from "./utils/colors";
import Constants from 'expo-constants'
import SingleDeckPage from "./components/SingleDeckPage";
import AddDeck from "./components/AddDeck";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";
import ShowStats from "./components/ShowStats";
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { FontAwesome,  MaterialCommunityIcons } from '@expo/vector-icons'
import { createStackNavigator } from '@react-navigation/stack';
import { setLocalNotification } from "./utils/helpers";


const store = createStore(reducer, middleware)
function UdaciStatusBar({backgroundColor, ...props}) {
  return(
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}


const RouteConfigs = {
  Decks: {
    name: "Decks",
    component: Decks,
    options: {tabBarIcon: ({color}) => <MaterialCommunityIcons name='cards' size={30} color={color} />, title: 'Decks'},
  }, 
  AddDeck: {
    component: AddDeck,
    name: "Add Deck",
    options: {tabBarIcon: ({color}) => <FontAwesome name='plus-square' size={30} color={color} />, title: 'Add Deck'}
  },
}
const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === "ios" ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === "ios" ? white : lightPurp,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    },
    indicatorStyle: {
      backgroundColor: orange
    }
  }
};


const Tabs = Platform.OS === 'ios' ? createBottomTabNavigator() : createMaterialTopTabNavigator()
const TabNav = () =>(
  <Tabs.Navigator {...TabNavigatorConfig}>
      <Tabs.Screen {...RouteConfigs['Decks']} />
      <Tabs.Screen {...RouteConfigs['AddDeck']} />
  </Tabs.Navigator>
)

const StackNavigatorConfig = {
  headerMode: "screen"
}

const StackConfig = {
  TabNav:{
    name: "Decks",
    component: TabNav,
    options: {headerShown: false}
  }, 
  SingleDeckPage: {
    name: "SingleDeckPage",
    component: SingleDeckPage,
    options: {
      headerTintColor: white,
      headerStyle:{
        backgroundColor: purple
      },
      title: "Deck"
    }
  },
  AddCard: {
    name: "AddCard",
    component: AddCard,
    options: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      },
      title: "Add Card"
    }
  },
  Quiz: {
    name: "Quiz",
    component: Quiz,
    options: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      },
      title: "Quiz"
    }
  },
  ShowStats: {
    name: "ShowStats",
    component: ShowStats,
    options: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      },
      title: "Stats"
    }
  },
  
}
const Stack = createStackNavigator();
const MainNavigator = () => (
  <Stack.Navigator {...StackNavigatorConfig}>
    <Stack.Screen {...StackConfig['TabNav']} />
    <Stack.Screen {...StackConfig['SingleDeckPage']} />
    <Stack.Screen {...StackConfig['AddCard']} />
    <Stack.Screen {...StackConfig['Quiz']} />
    <Stack.Screen {...StackConfig['ShowStats']} />
  </Stack.Navigator>
)
export default class App extends Component {
    componentDidMount(){
      setLocalNotification()
    }
    render(){
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <UdaciStatusBar backgroundColor={blue} barStyle='light-content' />
                    <NavigationContainer >
                     <MainNavigator />
                  </NavigationContainer>
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

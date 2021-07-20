import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
// import AppState from './app/context/AppState'
// import Icon from 'react-native-vector-icons/FontAwesome5'
// import Theme from './app/scripts/theme'
import SplashScreen from './app/screens/SplashScreen'
import MainScreen from './app/screens/Main'

const Stack = createStackNavigator()

export default function App() {
  return (
    <AppState>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" headerMode="none">
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Main" component={MainScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppState>
  )
}

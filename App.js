import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import LoginScreen from './src/screens/LoginScreen';
import TrendingScreen from './src/screens/TrendingScreen';
import MoviesScreen from './src/screens/MoviesScreen';
import RatingScreen from './src/screens/RatingScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import DetailsScreen from './src/screens/DetailsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function HomeScreen(){

  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator screenOptions={{headerShown: false}} style={{paddingTop: insets.top}}>
      <Tab.Screen name="Trending" component={TrendingScreen}/>
      <Tab.Screen name="Movies" component={MoviesScreen}/>
      <Tab.Screen name="Rating" component={RatingScreen}/>
      <Tab.Screen name="Profile" component={ProfileScreen}/>
    </Tab.Navigator>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Details" component={DetailsScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;

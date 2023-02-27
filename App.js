import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RatingProvider from './src/context/RatingContext';

import LoginScreen from './src/screens/LoginScreen';
import TrendingScreen from './src/screens/TrendingScreen';
import MoviesScreen from './src/screens/MoviesScreen';
import RatingScreen from './src/screens/RatingScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import DetailsScreen from './src/screens/DetailsScreen';

import { AuthProvider } from './src/context/AuthContext';
import { navigationRef } from './RootNavigation';


import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function HomeScreen() {

  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Trending') iconName = 'flame-outline';
        if (route.name === 'Movies') iconName = 'videocam-outline';
        if (route.name === 'Rating') iconName = 'star-outline';
        if (route.name === 'Profile') iconName = 'person-outline';

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      headerShown: false,
      tabBarActiveBackgroundColor: '#363636',
      tabBarInactiveBackgroundColor: '#363636',
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: '#808080',
      tabBarLabelStyle: { fontSize: 15 },
    })}>
      <Tab.Screen name="Trending" component={TrendingScreen} options={{ title: 'Em alta' }}/>
      <Tab.Screen name="Movies" component={MoviesScreen} options={{ title: 'Filmes' }}/>
      <Tab.Screen name="Rating" component={RatingScreen} options={{ title: 'Favoritos' }}/>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }}/>
    </Tab.Navigator>
  );
}

function App() {
  return (
    <AuthProvider>
      <RatingProvider>
        <SafeAreaProvider>
          <StatusBar barStyle="light-content" />
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator>
              <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Details" component={DetailsScreen} options={{
                title: 'Sobre o Filme', headerTintColor: '#DCDCDC',
                headerStyle: { backgroundColor: '#000000' }
              }} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </RatingProvider>
    </AuthProvider>
  );
}

export default App;

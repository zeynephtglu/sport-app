import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator }  from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { UserProvider }      from './src/context/UserContext';
import { ChallengeProvider } from './src/context/ChallengeContext';

import WelcomeScreen         from './src/screens/WelcomeScreen';
import HomeScreen            from './src/screens/HomeScreen';
import LeaderboardScreen     from './src/screens/LeaderboardScreen';
import ProfileScreen         from './src/screens/ProfileScreen';
import ChallengeDetailScreen from './src/screens/ChallengeDetailScreen';

const Stack = createStackNavigator();
const Tab   = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={({route})=>({
      headerShown: false,
      tabBarIcon: ({color,size})=>{
        const icons = { Anasayfa:'home', Liderlik:'trophy', Profil:'person' };
        return <Ionicons name={icons[route.name]} size={size} color={color} />;
      },
      tabBarActiveTintColor:'#3366FF',
      tabBarInactiveTintColor:'gray',
    })}>
      <Tab.Screen name="Anasayfa"        component={HomeScreen}    />
      <Tab.Screen name="Liderlik" component={LeaderboardScreen} />
      <Tab.Screen name="Profil"     component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <UserProvider>
      <ChallengeProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Main"    component={MainTabs}      />
            <Stack.Screen name="ChallengeDetail" component={ChallengeDetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ChallengeProvider>
    </UserProvider>
  );
}

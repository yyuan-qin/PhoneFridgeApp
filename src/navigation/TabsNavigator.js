import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Import screens
import StorageScreen from '../screens/StorageScreen';
import MealGeneratorScreen from '../screens/MealGeneratorScreen';
import ProfileScreen from '../screens/ProfileScreen';


const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
      <Tab.Navigator
        initialRouteName="Storage"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Storage') {
              iconName = focused ? 'fridge' : 'fridge-outline';
            } else if (route.name === 'MealGenerator') {
              iconName = focused ? 'food' : 'food-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'account' : 'account-outline';
            }

            // Return an icon component
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Storage" component={StorageScreen} options={{ headerShown: false}}/>
        <Tab.Screen name="MealGenerator" component={MealGeneratorScreen} options={{ headerShown: false}}/>
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false}}/>
      </Tab.Navigator>
  );
}

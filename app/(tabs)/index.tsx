import { Image, StyleSheet, Platform , Text} from 'react-native';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

function AllScreen() {
  return (
    <Text>All</Text>);
}

function FridgeScreen() {
  return (
    <Text>Fridge</Text>);
}

function FrozenScreen() {
  return (
    <Text>Frozen</Text>);
}

function PantryScreen() {
  return (
    <Text>Pantry</Text>);
}

export default function HomeScreen() {
  return (
    <NavigationContainer independent={true}>
      <SafeAreaView style={{ flex: 1 }}>
        <Tab.Navigator>
          <Tab.Screen name="All" component={AllScreen} />
          <Tab.Screen name="Fridge" component={FridgeScreen} />
          <Tab.Screen name="Frozen" component={FrozenScreen} />
          <Tab.Screen name="Pantry" component={PantryScreen} />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

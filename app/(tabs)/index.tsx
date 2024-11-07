import { View, Text, Modal} from 'react-native';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';

import AddItemButton from '../utilities/add-item-button';

const Tab = createMaterialTopTabNavigator();

function AllScreen() {
  return (
    <View style={{padding: 330, marginTop: 320}}>
      <AddItemButton/>
    </View>
  );
} 

function FridgeScreen() {
  return (
    <View style={{padding: 330, marginTop: 320}}>
      <AddItemButton/>
    </View>
  );
}

function FrozenScreen() {
  return (
    <View style={{padding: 330, marginTop: 320}}>
      <AddItemButton />
    </View>
  );
}

function PantryScreen() {
  return (
    <View style={{padding: 330, marginTop: 320}}>
      <AddItemButton />
    </View>
  );
}

export default function HomeScreen() {
  return (
    <NavigationContainer independent={true}>
      <SafeAreaView style={{ flex: 1 }}>
        <Tab.Navigator 
        screenOptions={{
          animationEnabled: false,
          swipeEnabled: false,
          tabBarIndicatorStyle: {
            backgroundColor: 'green',
          },
         }}>
          <Tab.Screen name="All" component={AllScreen} />
          <Tab.Screen name="Fridge" component={FridgeScreen} />
          <Tab.Screen name="Frozen" component={FrozenScreen} />
          <Tab.Screen name="Pantry" component={PantryScreen} />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

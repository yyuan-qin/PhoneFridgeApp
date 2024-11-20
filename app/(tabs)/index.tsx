import React, { useState } from 'react';
import { View, Text, PanResponder, Animated,TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';

import AddItemButton from '../storage/add-item-button';
import { Ionicons } from '@expo/vector-icons';

const Tab = createMaterialTopTabNavigator();

function DraggableItem({ item, currentTab, onDrop, onQuantityChange, setTrashVisible, handleTrashDrop }) {
  const pan = useState(new Animated.ValueXY())[0];

  const panResponder = useState(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => setTrashVisible(true),
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (e, gesture) => {
        setTrashVisible(false);

        if (gesture.moveY < 100) {
          const tabXPositions = [100, 200, 300];
          let targetTab = null;

          if (gesture.moveX >= tabXPositions[0] && gesture.moveX < tabXPositions[1]) {
            targetTab = 'Fridge';
          } else if (gesture.moveX >= tabXPositions[1] && gesture.moveX < tabXPositions[2]) {
            targetTab = 'Frozen';
          } else if (gesture.moveX >= tabXPositions[2]) {
            targetTab = 'Pantry';
          }

          if (targetTab && targetTab !== currentTab) {
            onDrop(item.name, currentTab, targetTab);
          }
        }

        if (gesture.moveY > 780 && gesture.moveX < 50) {
          handleTrashDrop(item.name, currentTab);
        }
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  )[0];

  const backgroundColor =
    item.expiration <= 1
      ? '#f57676'
      : item.expiration <= 3
      ? '#f7b583'
      : '#a5e6a6';

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={{
        transform: [{ translateX: pan.x }, { translateY: pan.y }],
        margin: 10,
      }}
    >
      <View style={[styles.itemContainer, styles.shadow]}>
        <Text style={{...styles.itemName, color: "#381902"}}>{item.name}</Text>
        <Text style={{...styles.expiryContainer, fontWeight: 'bold', backgroundColor}}>{item.expiration} days</Text>
        <View style={styles.quantityButtoncontanier}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => onQuantityChange(item.name, item.quantity - 1)}
          >
            <Text>-</Text>
          </TouchableOpacity>
          <Text style={{color: "#381902", fontWeight: 'bold'}}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => onQuantityChange(item.name, item.quantity + 1)}
          >
            <Text>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

function TabScreen({ items, currentTab, onDrop, onQuantityChange, setTrashVisible, handleTrashDrop }) {
  return (
    <View style={{ flex: 1, padding: 10 }}>
      {items.map((item, index) => (
        <DraggableItem
          key={index}
          item={item}
          currentTab={currentTab}
          onDrop={onDrop}
          onQuantityChange={onQuantityChange}
          setTrashVisible={setTrashVisible}
          handleTrashDrop={handleTrashDrop}
        />
      ))}
      <View style={[styles.addItemButton, styles.shadow]}>
        <AddItemButton />
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const [allItems, setAllItems] = useState([
    { name: 'Apples', expiration: 5, quantity: 1 },
    { name: 'Banana', expiration: 3, quantity: 1 },
    { name: 'Lettuce', expiration: 1, quantity: 1 },
  ]);
  const [fridgeItems, setFridgeItems] = useState([
    { name: 'Apples', expiration: 5, quantity: 1 },
    { name: 'Lettuce', expiration: 1, quantity: 1 },
  ]);
  const [frozenItems, setFrozenItems] = useState([]);
  const [pantryItems, setPantryItems] = useState([
    { name: 'Banana', expiration: 3, quantity: 1 },
  ]);

  const [trashVisible, setTrashVisible] = useState(false);

  const handleDrop = (itemName, sourceTab, targetTab) => {
    const removeItem = (list, name) => list.filter((item) => item.name !== name);
    const findItem = (list, name) => list.find((item) => item.name === name);

    let item = null;
    switch (sourceTab) {
      case 'Fridge':
        item = findItem(fridgeItems, itemName);
        item.expiration = item.expiration - 3;
        setFridgeItems((prevItems) => removeItem(prevItems, itemName));
        break;
      case 'Frozen':
        item = findItem(frozenItems, itemName);
        item.expiration = item.expiration - 20;
        setFrozenItems((prevItems) => removeItem(prevItems, itemName));
        break;
      case 'Pantry':
        item = findItem(pantryItems, itemName);
        setPantryItems((prevItems) => removeItem(prevItems, itemName));
        break;
      default:
        break;
    }

    if (item) {
      switch (targetTab) {
        case 'Fridge':
          item.expiration = item.expiration + 3;
          setFridgeItems((prevItems) => [...prevItems, item]);
          break;
        case 'Frozen':
          item.expiration = item.expiration + 20;
          setFrozenItems((prevItems) => [...prevItems, item]);
          break;
        case 'Pantry':
          setPantryItems((prevItems) => [...prevItems, item]);
          break;
        default:
          break;
      }
    }
  };

  const handleTrashDrop = (itemName, sourceTab) => {
    const removeItem = (list, name) => list.filter((item) => item.name !== name);

    switch (sourceTab) {
      case 'All':
        setAllItems((prevItems) => removeItem(prevItems, itemName));
        setFridgeItems((prevItems) => removeItem(prevItems, itemName));
        setFrozenItems((prevItems) => removeItem(prevItems, itemName));
        setPantryItems((prevItems) => removeItem(prevItems, itemName));
        break;
      case 'Fridge':
        setFridgeItems((prevItems) => removeItem(prevItems, itemName));
        break;
      case 'Frozen':
        setFrozenItems((prevItems) => removeItem(prevItems, itemName));
        break;
      case 'Pantry':
        setPantryItems((prevItems) => removeItem(prevItems, itemName));
        break;
      default:
        break;
    }
  };

  const handleQuantityChange = (itemName, newQuantity) => {
    const updateItemQuantity = (list, name, quantity) =>
      list.map((item) =>
        item.name === name ? { ...item, quantity: Math.max(1, quantity) } : item
      );

    setAllItems((prevItems) => updateItemQuantity(prevItems, itemName, newQuantity));
    setFridgeItems((prevItems) => updateItemQuantity(prevItems, itemName, newQuantity));
    setFrozenItems((prevItems) => updateItemQuantity(prevItems, itemName, newQuantity));
    setPantryItems((prevItems) => updateItemQuantity(prevItems, itemName, newQuantity));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          animationEnabled: false,
          swipeEnabled: false,
          tabBarIndicatorStyle: {
            backgroundColor: 'green',
          },
        }}
      >
        <Tab.Screen name="All">
          {() => (
            <TabScreen
              items={allItems}
              currentTab="All"
              onDrop={handleDrop}
              onQuantityChange={handleQuantityChange}
              setTrashVisible={setTrashVisible}
              handleTrashDrop={handleTrashDrop}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Fridge">
          {() => (
            <TabScreen
              items={fridgeItems}
              currentTab="Fridge"
              onDrop={handleDrop}
              onQuantityChange={handleQuantityChange}
              setTrashVisible={setTrashVisible}
              handleTrashDrop={handleTrashDrop}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Frozen">
          {() => (
            <TabScreen
              items={frozenItems}
              currentTab="Frozen"
              onDrop={handleDrop}
              onQuantityChange={handleQuantityChange}
              setTrashVisible={setTrashVisible}
              handleTrashDrop={handleTrashDrop}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Pantry">
          {() => (
            <TabScreen
              items={pantryItems}
              currentTab="Pantry"
              onDrop={handleDrop}
              onQuantityChange={handleQuantityChange}
              setTrashVisible={setTrashVisible}
              handleTrashDrop={handleTrashDrop}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
      {trashVisible && (
        <View>
          <Ionicons name="trash-outline" style={styles.trashIcon} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = {
  
  itemContainer: { 
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15, 
    borderRadius: 10,
    backgroundColor: '#fff',
  },

  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },

  itemName: { 
    fontSize: 16, 
    fontWeight: 'bold',
    fontFamily: 'Gill Sans',
  },

  expiryContainer: {
    position: 'absolute',
    right: 150,
    padding: 5,
    borderRadius: 5,
    paddingLeft: 25,
    paddingRight:25,
  },

  quantityButton: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  quantityButtoncontanier: {
    position: 'absolute',
    right: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  
  addItemButton: {
    position: 'absolute',
    bottom: 10,
    right: 40,
  },

  trashIcon: {
    position: 'absolute',
    bottom: 5,
    left: 30,
    fontSize: 30,
    color: 'gray',
  },
};

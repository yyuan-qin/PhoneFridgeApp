import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useLocalSearchParams } from 'expo-router';
import DraggableItem from '../components/StorageItem';
import AddItemButton from '../components/LogButton';
import { Ionicons } from '@expo/vector-icons';

const Tab = createMaterialTopTabNavigator();

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
  const params = useLocalSearchParams();
  const [allItems, setAllItems] = useState([]);
  const [fridgeItems, setFridgeItems] = useState([]);
  const [frozenItems, setFrozenItems] = useState([]);
  const [pantryItems, setPantryItems] = useState([]);
  const [processedParams, setProcessedParams] = useState({});
  const [trashVisible, setTrashVisible] = useState(false);

  useEffect(() => {
    // Initialize items
    const items = [
      { name: 'Salmon', expiration: 2, storage: 'Fridge', quantity: 1 },
      { name: 'Banana', expiration: 3, storage: 'Pantry', quantity: 1 },
      { name: 'Lettuce', expiration: 1, storage: 'Fridge', quantity: 1 },
      { name: 'Tomatos', expiration: 1, storage: 'Fridge', quantity: 1 },
      { name: 'Frozen Peas', expiration: 30, storage: 'Frozen', quantity: 1 },
    ];
    setAllItems(items);
    setFridgeItems(items.filter((item) => item.storage === 'Fridge'));
    setFrozenItems(items.filter((item) => item.storage === 'Frozen'));
    setPantryItems(items.filter((item) => item.storage === 'Pantry'));
  }, []);

  useEffect(() => {
    // Avoid re-processing the same parameters
    if (JSON.stringify(params) === JSON.stringify(processedParams)) return;

    if (params?.action === 'add' && params?.items) {
      const newItems = JSON.parse(params.items);
      newItems.forEach((item) => {
        item.expiration = Math.floor(Math.random() * (15 - 7 + 1)) + 7,
          item.quantity = item.amount,
          delete (item.amount);
      });

      setAllItems((prev) => [...prev, ...newItems]);
      setFridgeItems((prev) => [
        ...prev,
        ...newItems.filter((item) => item.storage === 'Fridge'),
      ]);
      setFrozenItems((prev) => [
        ...prev,
        ...newItems.filter((item) => item.storage === 'Frozen'),
      ]);
      setPantryItems((prev) => [
        ...prev,
        ...newItems.filter((item) => item.storage === 'Pantry'),
      ]);
    }

    if (params?.action === 'delete' && params?.itemNames) {
      const itemNames = JSON.parse(params.itemNames);

      const filterOutItems = (list, names) =>
        list.filter((item) => !names.includes(item.name));

      setAllItems((prev) => filterOutItems(prev, itemNames));
      setFridgeItems((prev) => filterOutItems(prev, itemNames));
      setFrozenItems((prev) => filterOutItems(prev, itemNames));
      setPantryItems((prev) => filterOutItems(prev, itemNames));
    }

    // Mark the current params as processed
    setProcessedParams(params);
  }, [params, processedParams]);

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
    <View style={styles.containier}>
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
    </View>
  );
}

const styles = {
  containier: {
    marginTop: 50,
    marginBottom: 25,
    flex: 1,
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

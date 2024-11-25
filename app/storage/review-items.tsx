import React, { useState, useEffect } from "react";
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { useRouter, useLocalSearchParams } from 'expo-router';

const GetGroceryItems = () => {
  // Get selected items from local search params
  const { selectedItems } = useLocalSearchParams();

  if (!selectedItems) {
    return [
      { id: 1, name: "Steak", storage: "", amount: 1 },
      { id: 2, name: "Sour Bread", storage: "", amount: 1 },
      { id: 3, name: "Tomato", storage: "", amount: 1 },
      { id: 4, name: "Apple", storage: "", amount: 1 },
    ]; // Default items
  }

  // Transform selected items to match the grocery item schema
  const transformSelectedItems = (selectedItems) => {
    return selectedItems.map((item) => ({
      id: parseInt(item.id, 10), // Convert ID to a number
      name: item.name,
      storage: "", // Default storage is an empty string
      amount: 1, // Default amount is 1
    }));
  };

  return transformSelectedItems(JSON.parse(selectedItems));
};

const GroceryReview = () => {
  const router = useRouter();
  const items = GetGroceryItems();
  const [groceries, setGroceries] = useState(items);

  const updateAmount = (id, increment) => {
    setGroceries((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, amount: Math.max(1, item.amount + increment) }
          : item
      )
    );
  };

  const updateStorage = (id, storageType) => {
    setGroceries((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, storage: storageType } : item
      )
    );
  };

  const handleAddToInventory = () => {
    router.push({
      pathname: '../(tabs)',
      params: { 
        action: 'add',
        items: JSON.stringify(groceries) },
    });
  };

  const allItemsHaveStorage = groceries.every((item) => item.storage);

  const renderItem = ({ item }) => (
    <View style={[styles.itemContainer, styles.shadow]}>
      <View style={styles.itemRow}>
        <Text style={styles.itemText}>{item.name}</Text>
        <TouchableOpacity
          style={{
            ...styles.storageButton,
            backgroundColor:
              item.storage === 'Frozen'
                ? '#b3c3ff' // Blue for Frozen
                : item.storage === 'Fridge'
                ? '#b3e4ff' // Light for Refrigerated
                : item.storage === 'Pantry'
                ? '#ffe8b3' // Yellow for Pantry
                : '#f0f0f0', // Default color
          }}
          onPress={() =>
            updateStorage(
              item.id,
              item.storage = item.storage === "Frozen" ? "Fridge" : (item.storage === "Fridge" ? "Pantry" : "Frozen")
            )
          }
        >
          <Text style={styles.buttonText}>
            {item.storage || "Select"}
          </Text>
        </TouchableOpacity>
        <View style={styles.amountControls}>
          <TouchableOpacity
            onPress={() => updateAmount(item.id, -1)}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.amountText}>{item.amount}</Text>
          <TouchableOpacity
            onPress={() => updateAmount(item.id, 1)}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="chevron-back-outline" size={24} color="#888" style={styles.backIcon} />
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Review your groceries  </Text>
      </View>
      <FlatList
        data={groceries}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          style={[
            styles.addButton,
            !allItemsHaveStorage && styles.addButtonDisabled,
          ]}
          disabled={!allItemsHaveStorage}
          onPress={() => handleAddToInventory()}
        >
          <Text style={styles.addButtonText}>Add To Inventory</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 35,
    padding: 30,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  backIcon: {
    position: 'absolute',
    left: 0,
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },

  itemContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
  },

  itemRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  itemText: {
    flex: 1,
    fontSize: 18,
    fontFamily: "Gill Sans",
  },

  storageButton: {
    flex: 1,
    padding: 10,
    marginRight: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: "center",
    borderRadius: 20,
  },

  amountControls: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: '#ccc',
    height: 30,
    borderRadius: 15,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: 'Gill Sans',
  },

  amountText: {
    fontSize: 16,
  },

  addButtonContainer: {
    alignItems: 'center',
  },

  addButton: {
    width: '80%',
    height: 50,
    borderRadius: 25,
    marginBottom: 20,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },

  addButtonDisabled: {
    backgroundColor: '#a5c2a3',
  },

  addButtonText: {
    color: '#fff',
    fontFamily: 'Gill Sans',
    fontSize: 19,
    fontWeight: 'bold',
  },

  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
});

export default GroceryReview;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const CustomCheckbox = ({ value, onValueChange }) => {
  return (
    <TouchableOpacity onPress={onValueChange} style={styles.checkbox}>
      <Ionicons
        name={value ? "checkbox" : "square-outline"}
        size={24}
        color={value ? "#28a745" : "#ccc"}
      />
    </TouchableOpacity>
  );
};

const SearchScreen = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [allItems, setAllItems] = useState([
    { id: '1', name: 'Corn', selected: false },
    { id: '2', name: 'Frozen corn', selected: false },
    { id: '3', name: 'Popcorn', selected: false },
  ]);

  const handleSearch = () => {
    if (query.trim()) {
      const filteredResults = allItems.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      const selectedItems = allItems.filter((item) => item.selected);
      setResults(selectedItems);
    }
  };

  const handleToggle = (itemId) => {
    setResults((prevResults) =>
      prevResults.map((item) =>
        item.id === itemId ? { ...item, selected: !item.selected } : item
      )
    );

    setAllItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleFinish = () => {
    router.push('../storage/review-items');
  };

  const isFinishDisabled = !allItems.some((item) => item.selected);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="chevron-back-outline" size={24} color="#888" style={styles.backIcon} />
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Search for Items </Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={query}
            onChangeText={setQuery}
          />
          <TouchableOpacity onPress={handleSearch}>
            <Ionicons name="search" size={24} color="#888" style={styles.searchIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList style={styles.itemListContainer}
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name}</Text>
            <CustomCheckbox
              value={item.selected}
              onValueChange={() => handleToggle(item.id)}
            />
          </View>
        )}
      />

      <View style={styles.finishButtonContainer}>
        <TouchableOpacity
          style={[styles.finishButton, isFinishDisabled && styles.disabledButton]}
          onPress={handleFinish}
          disabled={isFinishDisabled}
        >
          <Text style={styles.finishButtonText}>Finish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 35,
    marginBottom: 20,
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

  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    height: 40,
    width: '100%',
    paddingHorizontal: 8,
    backgroundColor: '#f9f9f9',
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 8,
  },

  searchIcon: {
    marginLeft: 8,
  },

  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  itemListContainer: {
    flex: 1,
  },

  itemText: {
    fontSize: 16,
  },

  checkbox: {
    width: 24,
    height: 24,
  },

  finishButtonContainer: {
    alignItems: 'center',
  },

  finishButton: {
    marginTop: 16,
    paddingVertical: 12,
    width: '50%',
    height: 50,
    borderRadius: 25,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },

  finishButtonText: {
    color: '#fff',
    fontFamily: 'Gill Sans',
    fontSize: 19,
    fontWeight: 'bold',
  },

  disabledButton: {
    backgroundColor: '#a5c2a3',
  },

  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
});

export default SearchScreen;
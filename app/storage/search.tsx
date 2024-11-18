import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([
    { id: '1', name: 'Corn' },
    { id: '2', name: 'Frozen corn' },
    { id: '3', name: 'Popcorn' },
  ]);

  const handleSearch = () => {
    // Implement search logic here
    console.log('Searching for:', query);
  };

  const handleToggle = (itemId) => {
    setResults((prevResults) =>
      prevResults.map((item) =>
        item.id === itemId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Checkbox
              value={item.selected}
              onValueChange={() => handleToggle(item.id)}
              style={styles.checkbox}
            />
          </View>
        )}
      />

      <TouchableOpacity style={styles.finishButton}>
        <Text style={styles.finishButtonText}>Finish</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },

  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 40,
  },

  searchButton: {
    marginLeft: 8,
    backgroundColor: '#007bff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 40,
  },

  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  itemText: {
    fontSize: 16,
  },

  addButton: {
    backgroundColor: '#28a745',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
    height: 32,
  },

  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  finishButton: {
    width: '100%',
    marginTop: 16,
    backgroundColor: '#5bb362',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  
  finishButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SearchScreen;
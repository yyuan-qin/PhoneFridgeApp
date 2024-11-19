import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';

const SearchScreen = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const allItems = [
    { id: '1', name: 'Corn', selected: false },
    { id: '2', name: 'Frozen corn', selected: false },
    { id: '3', name: 'Popcorn', selected: false },
  ];

  const handleSearch = () => {
    if (query.trim()) {
      const filteredResults = allItems.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setResults([]); // Clear results if query is empty
    }
  };

  const handleToggle = (itemId) => {
    setResults((prevResults) =>
      prevResults.map((item) =>
        item.id === itemId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleFinish = () => {
    router.push('../storage/review-items');
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
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
            <Checkbox
              value={item.selected}
              onValueChange={() => handleToggle(item.id)}
              style={[styles.checkbox, { color: item.selected ? '#28a745' : '#ccc' }]}
            />
          </View>
        )}
      />

      <TouchableOpacity style={[styles.finishButton, styles.shadow]} onPress={handleFinish}>
        <Text style={styles.finishButtonText}>Finish</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#fff',
  },

  searchContainer: {
    marginBottom: 16,
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#f9f9f9',
  },

  searchInput: {
    flex: 1,
    height: 40,
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
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },

  itemText: {
    fontSize: 16,
  },

  checkbox: {
    width: 24,
    height: 24,
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
    fontWeight: 'bold',
    fontSize: 16,
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
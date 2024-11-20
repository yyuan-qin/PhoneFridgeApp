import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const recipes = [
  {
    id: '1',
    title: 'Honey Garlic Salmon',
    time: '15 min',
    ingredients: '5 ingredients',
    servings: '2 servings',
    image: require('../images/honey-garlic-salmon.jpg'),
  },
  {
    id: '2',
    title: 'Marry Me Salmon',
    time: '24 min',
    ingredients: '6 ingredients',
    servings: '2 servings',
    image: require('../images/marry-me-salmon.jpg'),
  },
  {
    id: '3',
    title: 'Grilled Salmon Taco',
    time: '20 min',
    ingredients: '5 ingredients',
    servings: '2 servings',
    image: require('../images/grilled-salmon.jpg'),
  },
];

const RecipeListScreen = () => {
  const router = useRouter();
  
  const renderRecipe = ({ item }) => (
    <View style={[styles.recipeCard, styles.shadow]}>
      <Image source={item.image} style={styles.recipeImage} />
      <View style={styles.recipeDetails}>
        <Text style={styles.recipeTitle}>{item.title}</Text>
        <Text style={styles.recipeInfo}>{item.time}</Text>
        <Text style={styles.recipeInfo}>{item.ingredients}</Text>
        <Text style={styles.recipeInfo}>{item.servings}</Text>
      </View>

      <TouchableOpacity onPress={() => router.push('./detailed-recipe')}>
        <Ionicons name="chevron-forward-outline" size={24} color="#888" style={styles.forwardIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="chevron-back-outline" size={24} color="#888" style={styles.backIcon} />
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Recommended Recipes</Text>
      </View>
      <FlatList
        data={recipes}
        renderItem={renderRecipe}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.recipeList}
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Regenerate</Text>
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

  recipeList: {
    paddingBottom: 20,
  },

  recipeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },

  recipeImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 10,
  },

  recipeDetails: {
    flex: 1,
  },

  recipeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  recipeInfo: {
    fontSize: 14,
    color: '#555',
  },

  forwardIcon: {
    paddingRight: 10,
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },

  button: {
    marginTop: 16,
    paddingVertical: 12,
    width: '50%',
    height: 50,
    borderRadius: 25,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
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

export default RecipeListScreen;

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
const RecipeDetailsScreen = () => {
  const router = useRouter();
  const recipe = {
    title: '',
    image: require('../images/honey-garlic-salmon.jpg'),
    ingredients: [''],
    preparationSteps: [''],
    cookingSteps: [''],
  };

  const { recipeName } = useLocalSearchParams();

  if (recipeName == "Honey Garlic Salmon") {
    recipe.title = "Honey Garlic Salmon";
    recipe.image = require('../images/honey-garlic-salmon.jpg');
    recipe.ingredients = [
      '4 salmon fillets (skin-on or skinless)',
      '1/4 cup honey',
      '3 garlic cloves, minced',
      '2 tablespoons soy sauce',
      '1 tablespoon fresh lemon juice',
      '1 tablespoon olive oil',
      'Salt and pepper, to taste',
      'Optional garnish: chopped parsley or sesame seeds'
    ];
    recipe.preparationSteps = [
      'Season the salmon with salt and pepper.',
      'Prepare the honey garlic sauce in a small bowl.',
      'Marinate the salmon in the sauce for 15 minutes.',
    ];
    recipe.cookingSteps = [
      'Heat oil in a skillet and sear the salmon for 2-3 minutes.',
      'Pour remaining sauce into the skillet and simmer for 5 minutes.',
      'Serve the salmon with your favorite side dish!',
    ];
  } else if (recipeName == "Marry Me Salmon") {
    recipe.title = "Marry Me Salmon";
    recipe.image = require('../images/marry-me-salmon.jpg');
    recipe.ingredients = [
      '4 salmon fillets (skin-on or skinless)',
      '2 tbsp butter',
      '3 garlic cloves, minced',
      '1 cup heavy cream',
      '1/2 cup chicken broth',
      '2 tomatoes, chopped',
      '1/4 cup grated Parmesan cheese',
      'Salt and pepper, to taste',
      'Optional garnish: chopped parsley or sesame seeds'
    ];
    recipe.preparationSteps = [
      'Pat salmon fillets dry with a paper towel and season both sides with salt and pepper.'
    ];
    recipe.cookingSteps = [
      'Heat olive oil in a large skillet over medium-high heat.',
      'Sear salmon fillets for 3-4 minutes on each side until golden brown. Remove and set aside.',
      'In the same skillet, add minced garlic and sauté until fragrant (about 30 seconds).',
      'Stir in heavy cream, sun-dried tomatoes, Parmesan cheese, and Italian seasoning.',
      'Simmer the sauce for 2-3 minutes until slightly thickened.',
      'Return the salmon to the skillet, spooning the sauce over the fillets.',
      'Garnish with fresh parsley and serve hot.',
    ]
  } else if (recipeName == "Grilled Salmon Taco") {
    recipe.title = "Grilled Salmon Taco";
    recipe.image = require('../images/grilled-salmon.jpg');
    recipe.ingredients = [
      '4 salmon fillets (skin-on or skinless)',
      '8 small tortillas',
      '1 tbsp olive oil',
      '1 tsp chili powder',
      '1/2 tsp garlic powder',
      'Salt and pepper to taste',
      '1 cup shredded lettece',
      '1/2 cup salsa (store-bought or homemade)',
      '1/4 cup sour cream or Greek yogurt',
      'Lime wedges for serving'
    ];
    recipe.preparationSteps = [
      'Rub the salmon fillets with olive oil.',
      'Season the fillets with chili powder, garlic powder, salt, and pepper.',
      'Shred the cabbage and set it aside.',
      'Warm the tortillas on a dry skillet or grill.'
    ];
    recipe.cookingSteps = [
      'Heat a grill or grill pan over medium-high heat.',
      'Cook the salmon fillets for 3–4 minutes on each side until they are flaky and fully cooked.',
      'Flake the salmon into bite-sized pieces.',
      'Assemble the tacos with salmon, shredded cabbage, salsa, and a dollop of sour cream or Greek yogurt.',
      'Serve with lime wedges for a fresh squeeze of juice on top.'
    ];
  }
  
  function IngredientsScreen() {
    return (
      <ScrollView style={[styles.stepsContainer]} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          {recipe.ingredients.map((step, index) => (
            <Text key={index} style={styles.step}>
              • {step}
            </Text>
          ))}
        </View>
      </ScrollView>
    );
  }

  function PrepScreen() {
    return (
      <ScrollView style={styles.stepsContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Preparation</Text>
          {recipe.preparationSteps.map((step, index) => (
            <Text key={index} style={styles.step}>
              {index + 1}. {step}
            </Text>
          ))} 
        </View>
      </ScrollView>
    );
  }
  
  function CookScreen() {
    return (
      <ScrollView style={styles.stepsContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Cook</Text>
        {recipe.cookingSteps.map((step, index) => (
          <Text key={index} style={styles.step}>
            {index + 1}. {step}
          </Text>
        ))}
        </View>
      </ScrollView>
    );
  }

  const handlePress = () => {
    router.push({
      pathname: '../(tabs)',
      params: {
        action: 'delete',
        itemNames: JSON.stringify(['Salmon', 'Lettuce']),
      },
    });
  };

  const [isSelected, setIsSelected] = useState(false);

  const toggleHeart = () => {
    setIsSelected((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="chevron-back-outline" size={24} color="#888" style={styles.backIcon} />
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{recipe.title}</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image source={recipe.image} style={styles.image}/>
        <TouchableOpacity style={styles.heartIcon} onPress={toggleHeart}>
          <Ionicons name={isSelected ? 'heart' : 'heart-outline'} size={26} color={isSelected ? '#f54266' : '#888'} />
        </TouchableOpacity>
      </View>

      <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold', textTransform: 'none' },
        tabBarStyle: { backgroundColor: '#FFF', borderRadius: 20, overflow: 'hidden', elevation: 4, shadowColor: '#000' }, 
        tabBarIndicatorStyle: { backgroundColor: '#4CAF50', height: 3, borderRadius: 5 },
        tabBarActiveTintColor: '#4CAF50', 
        tabBarInactiveTintColor: '#A9A9A9',
      }}>
        <Tab.Screen name="Ingredients" component={IngredientsScreen} />
        <Tab.Screen name="Preparation" component={PrepScreen} />
        <Tab.Screen name="Cook" component={CookScreen} />
      </Tab.Navigator>
        
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.shadow]} onPress={handlePress}>
          <Text style={styles.buttonText}>Let's Cook It!</Text>
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

  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },

  stepsContainer: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  
  heartIcon: { 
    position: 'absolute', 
    right: 0, top: 0, 
    margin: 10 },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginVertical: 10,
  },

  sectionContainer: {
    borderColor: '#fff',
    backgroundColor: '#fff',
    borderWidth: 3,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },

  step: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
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

  buttonContainer: {
    alignItems: 'center',
  },

  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
});

export default RecipeDetailsScreen;

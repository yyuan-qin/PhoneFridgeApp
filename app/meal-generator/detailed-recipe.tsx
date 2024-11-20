import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const RecipeDetailsScreen = () => {
  const router = useRouter();
  const recipe = {
    title: 'Honey Garlic Salmon',
    image: require('../images/honey-garlic-salmon.jpg'),
    ingredients: [
      '4 salmon fillets (skin-on or skinless)',
      '1/4 cup honey',
      '3 garlic cloves, minced',
      '2 tablespoons soy sauce',
      '1 tablespoon fresh lemon juice',
      '1 tablespoon olive oil',
      'Salt and pepper, to taste',
      'Optional garnish: chopped parsley or sesame seeds'
    ],
    preparationSteps: [
      'Season the salmon with salt and pepper.',
      'Prepare the honey garlic sauce in a small bowl.',
      'Marinate the salmon in the sauce for 15 minutes.',
    ],
    cookingSteps: [
      'Heat oil in a skillet and sear the salmon for 2-3 minutes.',
      'Pour remaining sauce into the skillet and simmer for 5 minutes.',
      'Serve the salmon with your favorite side dish!',
    ],
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="chevron-back-outline" size={24} color="#888" style={styles.backIcon} />
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{recipe.title}</Text>
      </View>

      <ScrollView style={styles.stepsContainer} showsVerticalScrollIndicator={false}>
        <Image source={recipe.image} style={styles.image} />

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          {recipe.ingredients.map((step, index) => (
            <Text key={index} style={styles.step}>
              • {step}
            </Text>
          ))}
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Preparation</Text>
          {recipe.preparationSteps.map((step, index) => (
            <Text key={index} style={styles.step}>
              {index + 1}. {step}
            </Text>
          ))} 
        </View>
        
        <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Cook</Text>
        {recipe.cookingSteps.map((step, index) => (
          <Text key={index} style={styles.step}>
            {index + 1}. {step}
          </Text>
        ))}
        </View>
        
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.shadow]}>
          <Text style={styles.buttonText}>Let's Cook It!</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
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
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },

  sectionContainer: {
    borderColor: '#ddd',
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

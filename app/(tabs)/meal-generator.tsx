import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import Slider from '@react-native-community/slider';


function Selection() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Chinese Cuisine', value: 'chinese' },
    { label: 'Mexican Cuisine', value: 'mexican' },
    { label: 'American Cuisine', value: 'american' },
    { label: 'Italian Cuisine', value: 'italian' },
    { label: 'Thai Cuisine', value: 'thai' },
    { label: 'Japanese Cuisine', value: 'japanese' },
    { label: 'Korean Cuisine', value: 'korean' },
    { label: 'Want to try anything!', value: 'anything' },
  ]);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([
    { label: 'Breakfast', value: 'breakfast' },
    { label: 'Lunch', value: 'lunch' },
    { label: 'Dinner', value: 'dinner' },
    { label: 'Snack', value: 'snack' },
  ]);

  const closeDropdowns = () => {
    if (open) setOpen(false);
    if (open2) setOpen2(false);
  };

  return (
    <TouchableWithoutFeedback onPress={closeDropdowns}>
      <View style={[styles.innerContainer, { zIndex: 2000 }]}>
      <Text style={styles.text}>Type of cuisine:</Text>
      <DropDownPicker
        style={styles.selection}
        dropDownContainerStyle={{
          backgroundColor: '#f9f9f9',
          borderRadius: 10,
          borderColor: '#ccc',
        }}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Select"
        zIndex={3000}
      />

      <View style={{ padding: 20 }} />

      <Text style={styles.text}>Meal of the day:</Text>
      <DropDownPicker
        style={styles.selection}
        dropDownContainerStyle={{
          backgroundColor: '#f9f9f9',
          borderRadius: 10,
          borderColor: '#ccc',
        }}
        open={open2}
        value={value2}
        items={items2}
        setOpen={setOpen2}
        setValue={setValue2}
        setItems={setItems2}
        placeholder="Select"
        zIndex={2000}
      />

      <View style={{ padding: 15 }} />
    </View>
    </TouchableWithoutFeedback>
  );
}

function CustomSlider() {
  const [mealTime, setMealTime] = useState(10);
  const [servingNum, setServingNum] = useState(1);
  const [spicyLevel, setSpicyLevel] = useState(0);

  return (
    <View style={[styles.innerContainer, { zIndex: 1000 }]}>
      <Text style={styles.text}>Max Time</Text>
      <Slider
        style={styles.slider}
        minimumValue={10}
        maximumValue={60}
        step={5}
        value={mealTime}
        onValueChange={(value) => setMealTime(value)}
        minimumTrackTintColor="green"
        thumbTintColor="#4CAF50"
      />
      <Text style={styles.sliderValue}> {mealTime} min</Text>

      <View style={{ padding: 15 }} />

      <Text style={styles.text}>Spicy Level</Text>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={5}
        step={1}
        value={spicyLevel}
        onValueChange={(value) => setSpicyLevel(value)}
        minimumTrackTintColor="green"
        thumbTintColor="#4CAF50"
      />
      <Text style={styles.sliderValue}> Level {spicyLevel}</Text>

      <View style={{ padding: 15 }} />

      <Text style={styles.text}>Servings</Text>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={10}
        step={1}
        value={servingNum}
        onValueChange={(value) => setServingNum(value)}
        minimumTrackTintColor="green"
        thumbTintColor="#4CAF50"
      />
      <Text style={styles.sliderValue}> {servingNum}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },

  innerContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },

  text: {
    fontSize: 16,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },

  selection: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },

  slider: {
    width: '100%',
    height: 40,
  },

  sliderValue: {
    marginTop: 10,
    fontSize: 14,
    color: '#555',
    alignSelf: 'flex-start',
  },

  button: {
    width: '50%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#5bb362',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default function MealGenerator() {
  return (
    <SafeAreaView style={styles.container}>
      <Selection />
      <CustomSlider />
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>GENERATE RECIPES</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
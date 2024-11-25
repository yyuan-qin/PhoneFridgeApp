import React, { useState } from 'react';
import { View, Text, PanResponder, Animated, TouchableOpacity } from 'react-native';

const DraggableItem = ({ item, currentTab, onDrop, onQuantityChange, setTrashVisible, handleTrashDrop }) => {
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
          <Text style={{ ...styles.itemName, color: "#381902" }}>{item.name}</Text>
          <Text style={{ ...styles.expiryContainer, fontWeight: 'bold', backgroundColor }}>{item.expiration} days</Text>
          <View style={styles.quantityButtoncontanier}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => onQuantityChange(item.name, item.quantity - 1)}
            >
              <Text>-</Text>
            </TouchableOpacity>
            <Text style={{ color: "#381902", fontWeight: 'bold' }}>{item.quantity}</Text>
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

  export default DraggableItem;

  const styles = {
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      borderRadius: 10,
      backgroundColor: '#fff',
    },
    
    expiryContainer: {
      position: 'absolute',
      right: 150,
      padding: 5,
      borderRadius: 5,
      paddingLeft: 25,
      paddingRight: 25,
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

    itemName: {
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily: 'Gill Sans',
    },
  
    shadow: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 3,
    },
  }
  
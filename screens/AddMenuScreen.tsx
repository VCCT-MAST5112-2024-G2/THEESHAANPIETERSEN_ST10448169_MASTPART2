import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

const courses = ['Starters', 'Mains', 'Desserts'];

type AddMenuScreenProps = NativeStackScreenProps<RootStackParamList, 'AddMenu'>;

export default function AddMenuScreen({ navigation, route }: AddMenuScreenProps) {
  const [menuItems, setMenuItems] = useState(route.params?.menuItems || []);
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState(courses[0]);
  const [price, setPrice] = useState('');

  // Add a new menu item
  const handleAddMenuItem = () => {
    if (!dishName || !description || !price) {
      alert('Please fill out all fields!');
      return;
    }

    const newItem = {
      dishName,
      description,
      course,
      price: parseFloat(price),
    };

    const updatedMenuItems = [...menuItems, newItem];
    setMenuItems(updatedMenuItems);
    setDishName('');
    setDescription('');
    setCourse(courses[0]);
    setPrice('');
  };

  // Delete a menu item
  const handleDeleteItem = (index: number) => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedMenuItems = menuItems.filter((_, i) => i !== index);
            setMenuItems(updatedMenuItems);
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Navigate back to HomeScreen and pass updated menu items
  const handleSaveAndExit = () => {
    navigation.navigate('Home', { menuItems });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Manage Menu Items</Text>

      {/* Add Item Form */}
      <Text style={styles.label}>Dish Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the dish name"
        value={dishName}
        onChangeText={setDishName}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a description"
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Course</Text>
      <Picker
        selectedValue={course}
        onValueChange={(value) => setCourse(value)}
        style={styles.picker}
      >
        {courses.map((c) => (
          <Picker.Item key={c} label={c} value={c} />
        ))}
      </Picker>

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddMenuItem}>
        <Text style={styles.addButtonText}>Add Item</Text>
      </TouchableOpacity>

      {/* Display Existing Items */}
      <Text style={styles.sectionTitle}>Current Menu Items</Text>
      <View style={styles.menuListContainer}>
        {menuItems.length === 0 ? (
          <Text style={styles.emptyText}>No menu items available</Text>
        ) : (
          menuItems.map((item, index) => (
            <View key={index} style={styles.menuItem}>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.dishName} - {item.course}</Text>
                <Text>{item.description}</Text>
                <Text>R{item.price.toFixed(2)}</Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteItem(index)}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>

      {/* Save and Exit Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveAndExit}>
        <Text style={styles.saveButtonText}>Save and Exit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F00',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFF',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#FFF',
  },
  input: {
    backgroundColor: '#FFF',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  picker: {
    backgroundColor: '#FFF',
    marginBottom: 15,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFF',
  },
  menuListContainer: {
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFF',
    marginBottom: 10,
    borderRadius: 5,
    elevation: 1,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  deleteButton: {
    padding: 10,
    backgroundColor: '#FF3B30',
    borderRadius: 5,
  },
  deleteText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#999',
  },
  saveButton: {
    backgroundColor: '#28A745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

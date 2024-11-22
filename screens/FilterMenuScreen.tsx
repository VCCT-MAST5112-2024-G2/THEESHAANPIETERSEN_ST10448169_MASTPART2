import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type FilterMenuScreenProps = NativeStackScreenProps<RootStackParamList, 'FilterMenu'>;

export default function FilterMenuScreen({ route }: FilterMenuScreenProps) {
  const { menuItems } = route.params;
  const [selectedCourse, setSelectedCourse] = useState<string>('');

  // Filter menu items based on the selected course
  const filteredItems = selectedCourse
    ? menuItems.filter((item) => item.course === selectedCourse)
    : menuItems;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter Menu Items</Text>

      <Picker
        selectedValue={selectedCourse}
        onValueChange={(value) => setSelectedCourse(value)}
        style={styles.picker}
      >
        <Picker.Item label="All Courses" value="" />
        <Picker.Item label="Starters" value="Starters" />
        <Picker.Item label="Mains" value="Mains" />
        <Picker.Item label="Desserts" value="Desserts" />
      </Picker>

      <FlatList
        data={filteredItems}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.itemName}>{item.dishName} - {item.course}</Text>
            <Text>{item.description}</Text>
            <Text>R{item.price.toFixed(2)}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No items found</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F00',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFF',
  },
  picker: {
    backgroundColor: '#FFF',
    marginBottom: 20,
    borderRadius: 5,
  },
  menuItem: {
    padding: 10,
    backgroundColor: '#FFF',
    marginBottom: 10,
    borderRadius: 5,
    elevation: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#999',
  },
});

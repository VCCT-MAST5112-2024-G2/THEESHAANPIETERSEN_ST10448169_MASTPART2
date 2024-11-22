import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  const [menuItems, setMenuItems] = useState<
    { dishName: string; description: string; course: string; price: number }[]
  >([]);

  useEffect(() => {
    if (route.params?.menuItems) {
      setMenuItems(route.params.menuItems);
    }
  }, [route.params?.menuItems]);

  const calculateAveragePrices = () => {
    const courses = menuItems.reduce((acc, item) => {
      if (!acc[item.course]) {
        acc[item.course] = { total: 0, count: 0 };
      }
      acc[item.course].total += item.price;
      acc[item.course].count += 1;
      return acc;
    }, {} as Record<string, { total: number; count: number }>);

    return Object.keys(courses).map((course) => ({
      course,
      average: (courses[course].total / courses[course].count).toFixed(2),
    }));
  };

  const averages = calculateAveragePrices();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Menu</Text>
      <View style={styles.navlinks}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddMenu', { menuItems })}
        >
          <Text style={styles.buttonText}>Add Items</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('FilterMenu', { menuItems })}
        >
          <Text style={styles.buttonText}>Filter Items</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={averages}
        keyExtractor={(item) => item.course}
        ListHeaderComponent={<Text style={styles.sectionTitle}>Average Prices</Text>}
        renderItem={({ item }) => (
          <View style={styles.averageItem}>
            <Text style={styles.averageLabel}>{item.course}:</Text>
            <Text style={styles.averageValue}>R{item.average}</Text>
          </View>
        )}
      />
      <Text style={styles.sectionTitle}>Menu Items ({menuItems.length})</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.itemName}>{item.dishName} - {item.course}</Text>
            <Text>{item.description}</Text>
            <Text>R{item.price.toFixed(2)}</Text>
          </View>
        )}
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
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFF',
  },
  navlinks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#FFF',
  },
  averageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#FFF',
    marginBottom: 5,
    borderRadius: 5,
    elevation: 1,
  },
  averageLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },
  averageValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#F00',
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
});

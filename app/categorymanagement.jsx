import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { fetchCategories } from "../lib/appwrite";

import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const CategoryManagementScreen = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getCategories();
  }, []);

  const handleCategoryPress = (category) => {
    router.push({
      pathname: "editcategoryscreen",
      params: { category: JSON.stringify(category) }, // Ensure the category object is stringified
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Manage Categories</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => handleCategoryPress(item)}
          >
            <Text style={styles.categoryName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  categoryName: {
    fontSize: 18,
  },
});

export default CategoryManagementScreen;

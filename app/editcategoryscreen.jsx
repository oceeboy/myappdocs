import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import { updateCategory, createBook } from "../lib/appwrite";

import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

const EditCategoryScreen = () => {
  const params = useLocalSearchParams();
  const category = JSON.parse(params.category);

  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description);
  const [newBookTitle, setNewBookTitle] = useState("");
  const [newBookGenre, setNewBookGenre] = useState("");
  const [newBookPublishedYear, setNewBookPublishedYear] = useState("");

  const handleUpdateCategory = async () => {
    try {
      await updateCategory(category.$id, { name, description });
      alert("Category updated successfully!");
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const fetchAll = () => {
    console.log("Category:", JSON.stringify(category, null, 2));
  };

  const handleAddBook = async () => {
    try {
      const bookDetails = {
        title: newBookTitle,
        genre: newBookGenre,
        publishedYear: parseInt(newBookPublishedYear, 10),
        categoryIds: [category.$id],
      };
      await createBook(bookDetails);
      alert("Book added successfully!");
      // Clear input fields
      setNewBookTitle("");
      setNewBookGenre("");
      setNewBookPublishedYear("");
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Edit Category</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Category Name"
      />
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Category Description"
      />
      <Button title="Update Category" onPress={handleUpdateCategory} />

      <Text style={styles.title}>Add New Book</Text>
      <TextInput
        style={styles.input}
        value={newBookTitle}
        onChangeText={setNewBookTitle}
        placeholder="Book Title"
      />
      <TextInput
        style={styles.input}
        value={newBookGenre}
        onChangeText={setNewBookGenre}
        placeholder="Book Genre"
      />
      <TextInput
        style={styles.input}
        value={newBookPublishedYear}
        onChangeText={setNewBookPublishedYear}
        placeholder="Published Year"
        keyboardType="numeric"
      />
      <Button title="Add Book" onPress={handleAddBook} />

      <TouchableOpacity
        style={{
          marginHorizontal: 20,
          justifyContent: "center",
          alignItems: "center",
          height: 50,
          backgroundColor: "#4CAF50",
          borderRadius: 12,
        }}
        onPress={fetchAll}
      >
        <Text>Fetxh</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Books in this Category</Text>
      <FlatList
        data={category.books}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Title: {item.title}</Text>
            <Text>Genre: {item.genre}</Text>
            <Text>Published Year: {item.publishedYear}</Text>
          </View>
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default EditCategoryScreen;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { createCategoryAndBooks } from "../lib/appwrite";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateCategoryAndBooksScreen = () => {
  const [categoryName, setCategoryName] = useState("");
  const [books, setBooks] = useState([
    {
      title: "",
      author: "",
      copies: "",
      image: "",
      published_year: "",
      raters: "",
      rating: "",
      available: false,
    },
  ]);

  const handleAddBookField = () => {
    setBooks([
      ...books,
      {
        title: "",
        author: "",
        copies: "",
        image: "",
        published_year: "",
        raters: "",
        rating: "",
        available: false,
      },
    ]);
  };

  const handleBookChange = (index, field, value) => {
    const newBooks = [...books];
    newBooks[index][field] = value;
    setBooks(newBooks);
  };

  const handleSubmit = async () => {
    try {
      await createCategoryAndBooks(categoryName, books);
      alert("Category and books created successfully!");
    } catch (error) {
      console.error("Error creating category and books:", error);
      alert("Failed to create category and books.");
    }
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Text style={styles.label}>Category Name</Text>
        <TextInput
          style={styles.input}
          value={categoryName}
          onChangeText={setCategoryName}
        />

        <Text style={styles.sectionTitle}>Books</Text>
        {books.map((book, index) => (
          <View key={index} style={styles.bookContainer}>
            <Text style={styles.label}>Book Title</Text>
            <TextInput
              style={styles.input}
              value={book.title}
              onChangeText={(value) => handleBookChange(index, "title", value)}
            />

            <Text style={styles.label}>Author</Text>
            <TextInput
              style={styles.input}
              value={book.author}
              onChangeText={(value) => handleBookChange(index, "author", value)}
            />

            <Text style={styles.label}>Copies</Text>
            <TextInput
              style={styles.input}
              value={book.copies}
              onChangeText={(value) => handleBookChange(index, "copies", value)}
            />

            <Text style={styles.label}>Image URL</Text>
            <TextInput
              style={styles.input}
              value={book.image}
              onChangeText={(value) => handleBookChange(index, "image", value)}
            />

            <Text style={styles.label}>Published Year</Text>
            <TextInput
              style={styles.input}
              value={book.published_year}
              onChangeText={(value) =>
                handleBookChange(index, "published_year", value)
              }
            />

            <Text style={styles.label}>Raters</Text>
            <TextInput
              style={styles.input}
              value={book.raters}
              onChangeText={(value) => handleBookChange(index, "raters", value)}
            />

            <Text style={styles.label}>Rating</Text>
            <TextInput
              style={styles.input}
              value={book.rating}
              onChangeText={(value) => handleBookChange(index, "rating", value)}
            />

            <View style={styles.checkboxContainer}>
              <Text style={styles.label}>Available:</Text>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() =>
                  handleBookChange(index, "available", !book.available)
                }
              >
                {book.available && <View style={styles.checkboxInner} />}
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <Button title="Add Another Book" onPress={handleAddBookField} />

        <Button title="Submit" onPress={handleSubmit} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
  },
  bookContainer: {
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: "gray",
  },
});

export default CreateCategoryAndBooksScreen;

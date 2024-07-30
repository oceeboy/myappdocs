import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { fetchBooks, fetchCategories } from "../lib/appwrite";
import { SafeAreaView } from "react-native-safe-area-context";

const DisplayDataScreen = () => {
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const getBooks = async () => {
      try {
        const booksData = await fetchBooks();
        setBooks(booksData);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    getCategories();
    getBooks();
  }, []);

  const getBookDetails = (bookIds) => {
    return books.filter((book) => bookIds.includes(book.$id));
  };

  const getCategoryDetails = (bookIds) => {
    return categories.filter((category) => bookIds.includes(category.$id));
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity
          style={{
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 20,
            backgroundColor: "red",
            borderRadius: 10,
          }}
          onPress={() => console.log(categories, books)}
        >
          <Text style={{ color: "#fff" }}>Fetch console log</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Categories</Text>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>Name: {item.name}</Text>
              <Text>Description: {item.description}</Text>
              <Text>Books:</Text>
              {item.books.map((books, index) => (
                <View key={index}>
                  <Text>Title: {books.title}</Text>
                  <Text>Genre: {books.genre}</Text>
                  <Text>Published Year: {books.publishedYear}</Text>
                </View>
              ))}
            </View>
          )}
        />
        <View style={{ marginTop: 50 }} />
        <Text style={styles.title}>Books</Text>
        <FlatList
          data={books}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>Title: {item.title}</Text>
              <Text>Genre: {item.genre}</Text>
              <Text>Published Year: {item.publishedYear}</Text>

              {item.categories.map((categories, index) => (
                <View key={index}>
                  <Text>Categories: {categories.name}</Text>
                </View>
              ))}
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default DisplayDataScreen;

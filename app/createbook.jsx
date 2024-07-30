// screens/CreateBookScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

// import { createBook, fetchCategories } from "../appwrite";
import { DropDown } from "../components";
import { createBook, fetchCategories } from "../lib/appwrite";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

const CreateBookScreen = () => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(
        fetchedCategories.map((category) => ({
          label: category.name,
          value: category.$id,
        }))
      );
    };

    loadCategories();
  }, []);

  const handleCreateBook = async () => {
    try {
      const bookDetails = {
        title,
        genre,
        publishedYear: parseInt(publishedYear, 10),
        categoryIds: selectedCategory ? [selectedCategory.value] : [],
      };
      await createBook(bookDetails);
      alert("Book created successfully!");
    } catch (error) {
      console.error("Error creating book:", error);
      alert("Failed to create book.");
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} />

        <Text style={styles.label}>Genre</Text>
        <TextInput style={styles.input} value={genre} onChangeText={setGenre} />

        <Text style={styles.label}>Published Year</Text>
        <TextInput
          style={styles.input}
          value={publishedYear}
          onChangeText={setPublishedYear}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Category</Text>
        <DropDown
          options={categories}
          onSelect={(selectedOption) => setSelectedCategory(selectedOption)}
        />

        <TouchableOpacity
          style={{
            borderRadius: 10,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#902235",
          }}
          onPress={handleCreateBook}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontFamily: "Poppins-SemiBold",
            }}
          >
            Create Book
          </Text>
        </TouchableOpacity>

        <View>
          <Link href={"/fetchbook"}> go to fetched</Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
});

export default CreateBookScreen;

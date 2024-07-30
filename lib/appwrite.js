import { Databases, ID, Client } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectId: "66a8ccc9003e6615a6de",
  databaseId: "66a8ceed0031ea0727c4",
  booksCollectionId: "66a8cf2c003b329806e1",
  categoriesCollectionId: "66a8cf140019eb167906",
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

const databases = new Databases(client);

// Function to create a category and books
export async function createCategoryAndBooks(categoryName, books) {
  try {
    // Create the category
    const newCategory = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.categoriesCollectionId,
      ID.unique(),
      {
        sectionname: categoryName,
        books: [],
      }
    );

    // Create the books and link them to the category
    for (const book of books) {
      const newBook = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.booksCollectionId,
        ID.unique(),
        {
          author: book.author,
          available: book.available,
          copies: book.copies,
          image: book.image,
          published_year: book.published_year,
          raters: parseInt(book.raters, 10),
          rating: parseFloat(book.rating),
          title: book.title,
          categories: [newCategory.$id],
        }
      );

      // Update the category with the new book's ID
      const updatedBooks = [...newCategory.books, newBook.$id];
      await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.categoriesCollectionId,
        newCategory.$id,
        { books: updatedBooks }
      );
    }

    return newCategory;
  } catch (error) {
    console.error("Error creating category and books:", error);
    throw new Error(error.message);
  }
}

// Function to fetch all categories
export async function fetchCategories() {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.categoriesCollectionId
    );

    // Fetch related book data for each category
    const categoriesWithBooks = await Promise.all(
      response.documents.map(async (category) => {
        const books = await Promise.all(
          category.books.map(async (bookId) => {
            const book = await databases.getDocument(
              appwriteConfig.databaseId,
              appwriteConfig.booksCollectionId,
              bookId
            );
            return book;
          })
        );
        return { ...category, books };
      })
    );

    return categoriesWithBooks;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Function to fetch all books
export async function fetchBooks() {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.booksCollectionId
    );

    // Fetch related category data for each book
    const booksWithCategories = await Promise.all(
      response.documents.map(async (book) => {
        const categories = await Promise.all(
          book.categories.map(async (categoryId) => {
            const category = await databases.getDocument(
              appwriteConfig.databaseId,
              appwriteConfig.categoriesCollectionId,
              categoryId
            );
            return category;
          })
        );
        return { ...book, categories };
      })
    );

    return booksWithCategories;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Function to update a category
export async function updateCategory(categoryId, updates) {
  try {
    const updatedCategory = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.categoriesCollectionId,
      categoryId,
      updates
    );
    return updatedCategory;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Function to delete a book from a category
export async function deleteBookFromCategory(categoryId, bookId) {
  try {
    const category = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.categoriesCollectionId,
      categoryId
    );

    const updatedBooks = category.books.filter((id) => id !== bookId);
    const updatedCategory = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.categoriesCollectionId,
      categoryId,
      { books: updatedBooks }
    );

    return updatedCategory;
  } catch (error) {
    throw new Error(error.message);
  }
}

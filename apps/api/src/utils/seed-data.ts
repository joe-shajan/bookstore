// require("dotenv").config();
// import { elasticClient } from "./elastic-client";
// import { seed_books } from "./seed-data";
// import { Book } from "./models/book.model";

// export const seed_books = [
//     {
//       title: "The Secret Garden",
//       author: "Frances Hodgson Burnett",
//       publicationYear: 1911,
//       isbn: "978-1-23456789-0",
//       description:
//         "A classic novel about a girl who discovers a hidden, magical garden.",
//     },
//     {
//       title: "To Kill a Mockingbird",
//       author: "Harper Lee",
//       publicationYear: 1960,
//       isbn: "978-1-23456789-1",
//       description:
//         "A powerful story of racial injustice and moral growth in the American South.",
//     },
//     {
//       title: "Pride and Prejudice",
//       author: "Jane Austen",
//       publicationYear: 1813,
//       isbn: "978-1-23456789-2",
//       description:
//         "A timeless tale of love and societal expectations in early 19th-century England.",
//     },
//     {
//       title: "1984",
//       author: "George Orwell",
//       publicationYear: 1949,
//       isbn: "978-1-23456789-3",
//       description:
//         "A dystopian novel that explores the consequences of totalitarianism.",
//     },
//     {
//       title: "Moby-Dick",
//       author: "Herman Melville",
//       publicationYear: 1851,
//       isbn: "978-1-23456789-4",
//       description:
//         "The epic tale of Captain Ahab's obsessive quest for the white whale.",
//     },
//     {
//       title: "The Catcher in the Rye",
//       author: "J.D. Salinger",
//       publicationYear: 1951,
//       isbn: "978-1-23456789-5",
//       description:
//         "A novel about a disenchanted teenager's journey through New York City.",
//     },
//     {
//       title: "The Great Gatsby",
//       author: "F. Scott Fitzgerald",
//       publicationYear: 1925,
//       isbn: "978-1-23456789-6",
//       description:
//         "A tale of wealth, love, and the American Dream in the Roaring Twenties.",
//     },
//     {
//       title: "Lord of the Flies",
//       author: "William Golding",
//       publicationYear: 1954,
//       isbn: "978-1-23456789-7",
//       description:
//         "A gripping story of a group of boys stranded on a deserted island.",
//     },
//     {
//       title: "The Hobbit",
//       author: "J.R.R. Tolkien",
//       publicationYear: 1937,
//       isbn: "978-1-23456789-8",
//       description:
//         "A fantasy adventure that precedes the events of 'The Lord of the Rings.'",
//     },
//     {
//       title: "The Hunger Games",
//       author: "Suzanne Collins",
//       publicationYear: 2008,
//       isbn: "978-1-23456789-9",
//       description:
//         "A dystopian saga of a girl's fight for survival in a brutal competition.",
//     },
//     {
//       title: "The Road",
//       author: "Cormac McCarthy",
//       publicationYear: 2006,
//       isbn: "978-1-23456789-10",
//       description:
//         "A post-apocalyptic journey of a father and son seeking safety.",
//     },
//     {
//       title: "The Alchemist",
//       author: "Paulo Coelho",
//       publicationYear: 1988,
//       isbn: "978-1-23456789-11",
//       description:
//         "A philosophical novel about following one's dreams and destiny.",
//     },
//     {
//       title: "The Shining",
//       author: "Stephen King",
//       publicationYear: 1977,
//       isbn: "978-1-23456789-12",
//       description: "A terrifying tale of a family isolated in a haunted hotel.",
//     },
//     {
//       title: "The Girl with the Dragon Tattoo",
//       author: "Stieg Larsson",
//       publicationYear: 2005,
//       isbn: "978-1-23456789-13",
//       description: "A mystery thriller involving a journalist and a hacker.",
//     },
//     {
//       title: "War and Peace",
//       author: "Leo Tolstoy",
//       publicationYear: 1869,
//       isbn: "978-1-23456789-14",
//       description:
//         "A monumental epic depicting Russian society during the Napoleonic era.",
//     },
//     {
//       title: "The Odyssey",
//       author: "Homer",
//       publicationYear: -720,
//       isbn: "978-1-23456789-15",
//       description: "An ancient Greek epic following the adventures of Odysseus.",
//     },
//     {
//       title: "Brave New World",
//       author: "Aldous Huxley",
//       publicationYear: 1932,
//       isbn: "978-1-23456789-16",
//       description:
//         "A dystopian novel exploring a future society driven by pleasure.",
//     },
//     {
//       title: "The Old Man and the Sea",
//       author: "Ernest Hemingway",
//       publicationYear: 1952,
//       isbn: "978-1-23456789-17",
//       description:
//         "A story of an old Cuban fisherman's epic battle with a marlin.",
//     },
//     {
//       title: "One Hundred Years of Solitude",
//       author: "Gabriel García Márquez",
//       publicationYear: 1967,
//       isbn: "978-1-23456789-18",
//       description: "A magical realist saga of the Buendía family in Macondo.",
//     },
//     {
//       title: "The Picture of Dorian Gray",
//       author: "Oscar Wilde",
//       publicationYear: 1890,
//       isbn: "978-1-23456789-19",
//       description:
//         "A novel exploring the consequences of a hedonistic lifestyle.",
//     },

//     {
//       title: "The Da Vinci Code",
//       author: "Dan Brown",
//       publicationYear: 2003,
//       isbn: "978-1-23456789-20",
//       description:
//         "A gripping mystery involving symbology and religious history.",
//     },
//     {
//       title: "The Chronicles of Narnia: The Lion, the Witch and the Wardrobe",
//       author: "C.S. Lewis",
//       publicationYear: 1950,
//       isbn: "978-1-23456789-21",
//       description:
//         "A fantasy classic about a magical world accessed through a wardrobe.",
//     },
//     {
//       title: "The Kite Runner",
//       author: "Khaled Hosseini",
//       publicationYear: 2003,
//       isbn: "978-1-23456789-22",
//       description:
//         "A poignant story of friendship and redemption in Afghanistan.",
//     },
//     {
//       title: "Sapiens: A Brief History of Humankind",
//       author: "Yuval Noah Harari",
//       publicationYear: 2011,
//       isbn: "978-1-23456789-23",
//       description:
//         "A thought-provoking exploration of the history and future of Homo sapiens.",
//     },
//     {
//       title: "The Handmaid's Tale",
//       author: "Margaret Atwood",
//       publicationYear: 1985,
//       isbn: "978-1-23456789-24",
//       description:
//         "A dystopian novel set in a theocratic regime where women's rights are suppressed.",
//     },

//     {
//       title: "The Hitchhiker's Guide to the Galaxy",
//       author: "Douglas Adams",
//       publicationYear: 1979,
//       isbn: "978-1-23456789-25",
//       description:
//         "A humorous science fiction series about the misadventures of an unwitting space traveler.",
//     },
//     {
//       title: "The Sun Also Rises",
//       author: "Ernest Hemingway",
//       publicationYear: 1926,
//       isbn: "978-1-23456789-26",
//       description:
//         "A novel depicting the lives of the Lost Generation in post-World War I Europe.",
//     },
//     {
//       title: "The Catcher in the Rye",
//       author: "J.D. Salinger",
//       publicationYear: 1951,
//       isbn: "978-1-23456789-27",
//       description:
//         "A coming-of-age novel following the adventures of Holden Caulfield in New York City.",
//     },
//     {
//       title: "The Grapes of Wrath",
//       author: "John Steinbeck",
//       publicationYear: 1939,
//       isbn: "978-1-23456789-28",
//       description:
//         "A story of the Joad family's journey during the Great Depression in the United States.",
//     },
//     {
//       title: "The Road Not Taken",
//       author: "Robert Frost",
//       publicationYear: 1916,
//       isbn: "978-1-23456789-29",
//       description: "A collection of iconic poems, including the title poem.",
//     },
//     {
//       title: "The Name of the Wind",
//       author: "Patrick Rothfuss",
//       publicationYear: 2007,
//       isbn: "978-1-23456789-30",
//       description:
//         "The first book in the Kingkiller Chronicle, following the life of Kvothe.",
//     },
//     {
//       title: "Frankenstein",
//       author: "Mary Shelley",
//       publicationYear: 1818,
//       isbn: "978-1-23456789-31",
//       description:
//         "A classic novel exploring the consequences of scientific experimentation.",
//     },
//     {
//       title: "The Giver",
//       author: "Lois Lowry",
//       publicationYear: 1993,
//       isbn: "978-1-23456789-32",
//       description:
//         "A young adult dystopian novel about a society with no pain or suffering.",
//     },
//     {
//       title: "The War of the Worlds",
//       author: "H.G. Wells",
//       publicationYear: 1898,
//       isbn: "978-1-23456789-33",
//       description:
//         "A science fiction classic depicting an alien invasion of Earth.",
//     },
//     {
//       title: "The Road to Wigan Pier",
//       author: "George Orwell",
//       publicationYear: 1937,
//       isbn: "978-1-23456789-34",
//       description:
//         "A non-fiction work examining the lives of coal miners in Northern England.",
//     },
//   ];

// async function seedData() {
//   try {
//     return { books: seed_books };
//     for (let book of seed_books) {
//       const newBook = new Book(book);

//       const createdbook = await newBook.save();

//       await elasticClient.index({
//         index: "books",
//         id: createdbook._id.toString(),
//         body: {
//           title: createdbook.title,
//           author: createdbook.author,
//           description: createdbook.description,
//           publicationYear: createdbook.publicationYear.toString(),
//           isbn: createdbook.isbn,
//         },
//       });

//     }

//     return { books: seed_books };
//   } catch (error) {
//     console.error(error);
//   }
// }

// seedData()

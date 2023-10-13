"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
var elastic_client_1 = require("./elastic-client");
var seed_data_1 = require("./seed-data");
var app = (0, express_1.default)();
var port = process.env.PORT || 8080;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true,
}));
app.use((0, cors_1.default)());
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongoose_1.default.connect(process.env.DB_URL)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
connectToDatabase();
var db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
    console.log("Connected to MongoDB");
});
// Define your book schema and model
var bookSchema = new mongoose_1.default.Schema({
    title: String,
    author: String,
    publicationYear: Number,
    isbn: String,
    description: String,
});
var Book = mongoose_1.default.model("Book", bookSchema);
app.get("/", function (_req, res) {
    return res.json({ message: "Express Typescript API" });
});
app.post("/books", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, author, publicationYear, isbn, description, newBook, createdbook, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, title = _a.title, author = _a.author, publicationYear = _a.publicationYear, isbn = _a.isbn, description = _a.description;
                console.log(req.body);
                newBook = new Book({
                    title: title,
                    author: author,
                    publicationYear: publicationYear,
                    isbn: isbn,
                    description: description,
                });
                return [4 /*yield*/, newBook.save()];
            case 1:
                createdbook = _b.sent();
                return [4 /*yield*/, elastic_client_1.elasticClient.index({
                        index: "books",
                        id: createdbook._id.toString(),
                        body: {
                            title: createdbook.title,
                            author: createdbook.author,
                            description: createdbook.description,
                            publicationYear: createdbook.publicationYear.toString(),
                            isbn: createdbook.isbn,
                        },
                    })];
            case 2:
                _b.sent();
                res.json({ createdbook: createdbook });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                console.error(error_1);
                res.status(500).json({ error: "Could not create a new book" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post("/seed-books", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _i, seed_books_1, book, newBook, createdbook, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [2 /*return*/, res.json({ books: seed_data_1.seed_books })];
            case 1:
                if (!(_i < seed_books_1.length)) return [3 /*break*/, 5];
                book = seed_books_1[_i];
                newBook = new Book(book);
                return [4 /*yield*/, newBook.save()];
            case 2:
                createdbook = _a.sent();
                return [4 /*yield*/, elastic_client_1.elasticClient.index({
                        index: "books",
                        id: createdbook._id.toString(),
                        body: {
                            title: createdbook.title,
                            author: createdbook.author,
                            description: createdbook.description,
                            publicationYear: createdbook.publicationYear.toString(),
                            isbn: createdbook.isbn,
                        },
                    })];
            case 3:
                _a.sent();
                console.log(newBook._id);
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 1];
            case 5:
                res.json({ books: seed_data_1.seed_books });
                return [3 /*break*/, 7];
            case 6:
                error_2 = _a.sent();
                console.error(error_2);
                res.status(500).json({ error: "Could not create a new book" });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
app.get("/search", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, searchResults, hits, books, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = req.query.query;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, elastic_client_1.elasticClient.search({
                        index: "books",
                        body: {
                            query: {
                                multi_match: {
                                    // @ts-ignore
                                    query: query,
                                    fields: ["title", "author", "description", "publicationYear"],
                                },
                            },
                        },
                    })];
            case 2:
                searchResults = _a.sent();
                hits = searchResults.hits.hits;
                books = hits.map(function (hit) {
                    return __assign(__assign({ _id: hit._id }, hit._source), { 
                        // @ts-ignore
                        publicationYear: +hit._source.publicationYear });
                });
                res.json({ books: books });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.error(error_3);
                res.status(500).json({ error: "Error performing the search" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// app.get("/search", async (req, res) => {
//   const result = await elasticClient.search({
//     index: "posts",
//     query: { fuzzy: { title: req.query.query } },
//   });
//   res.json(result);
// });
app.get("/books", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var itemsPerPage, page, skip, books, bookCount, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                itemsPerPage = 12;
                page = req.query.page ? +req.query.page : 0;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                skip = page * itemsPerPage;
                return [4 /*yield*/, Book.find().skip(skip).limit(itemsPerPage)];
            case 2:
                books = _a.sent();
                return [4 /*yield*/, Book.countDocuments()];
            case 3:
                bookCount = _a.sent();
                res.json({ books: books, bookCount: bookCount });
                return [3 /*break*/, 5];
            case 4:
                error_4 = _a.sent();
                console.error(error_4);
                res.status(500).json({ error: "Could not retrieve books" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.get("/books/:bookId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var bookId, book, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                bookId = req.params.bookId;
                return [4 /*yield*/, Book.findById(bookId)];
            case 1:
                book = _a.sent();
                if (!book) {
                    return [2 /*return*/, res.status(404).json({ error: "Book not found" })];
                }
                res.json({ book: book });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                console.error(error_5);
                res.status(500).json({ error: "Could not retrieve the book" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.put("/books/:bookId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var bookId, _a, title, author, publicationYear, isbn, description, updatedBook, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                bookId = req.params.bookId;
                _a = req.body, title = _a.title, author = _a.author, publicationYear = _a.publicationYear, isbn = _a.isbn, description = _a.description;
                return [4 /*yield*/, Book.findByIdAndUpdate(bookId, {
                        title: title,
                        author: author,
                        publicationYear: publicationYear,
                        isbn: isbn,
                        description: description,
                    }, { new: true })];
            case 1:
                updatedBook = _b.sent();
                if (!updatedBook) {
                    return [2 /*return*/, res.status(404).json({ error: "Book not found" })];
                }
                return [4 /*yield*/, elastic_client_1.elasticClient.update({
                        index: "books",
                        id: updatedBook._id.toString(),
                        body: {
                            doc: {
                                title: updatedBook.title,
                                author: updatedBook.author,
                                description: updatedBook.description,
                                publicationYear: updatedBook.publicationYear.toString(),
                                isbn: updatedBook.isbn,
                            },
                        },
                    })];
            case 2:
                _b.sent();
                res.json(updatedBook);
                return [3 /*break*/, 4];
            case 3:
                error_6 = _b.sent();
                console.error(error_6);
                res.status(500).json({ error: "Could not update the book" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.delete("/books/:bookId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var bookId, deletedBook, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                bookId = req.params.bookId;
                return [4 /*yield*/, Book.findByIdAndRemove(bookId)];
            case 1:
                deletedBook = _a.sent();
                if (!deletedBook) {
                    return [2 /*return*/, res.status(404).json({ error: "Book not found" })];
                }
                return [4 /*yield*/, elastic_client_1.elasticClient.delete({
                        index: "books",
                        id: deletedBook._id.toString(),
                    })];
            case 2:
                _a.sent();
                res.json(deletedBook);
                return [3 /*break*/, 4];
            case 3:
                error_7 = _a.sent();
                console.error(error_7);
                res.status(500).json({ error: "Could not delete the book" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    console.log("Server is listening on ".concat(port));
});

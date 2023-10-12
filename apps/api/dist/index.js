"use strict";
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
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
require("dotenv").config();
var app = (0, express_1.default)();
var port = process.env.PORT || 8080;
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
app.use((0, cors_1.default)());
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
    return res.json({ message: "Express Typescript API on Vercel" });
});
app.post("/books", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, author, publicationYear, isbn, description, newBook, savedBook, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, title = _a.title, author = _a.author, publicationYear = _a.publicationYear, isbn = _a.isbn, description = _a.description;
                newBook = new Book({
                    title: title,
                    author: author,
                    publicationYear: publicationYear,
                    isbn: isbn,
                    description: description,
                });
                return [4 /*yield*/, newBook.save()];
            case 1:
                savedBook = _b.sent();
                res.json(savedBook);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                console.error(error_1);
                res.status(500).json({ error: "Could not create a new book" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get("/books", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var books, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Book.find()];
            case 1:
                books = _a.sent();
                res.json(books);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error(error_2);
                res.status(500).json({ error: "Could not retrieve books" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get("/books/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var bookId, book, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                bookId = req.params.id;
                return [4 /*yield*/, Book.findById(bookId)];
            case 1:
                book = _a.sent();
                if (!book) {
                    return [2 /*return*/, res.status(404).json({ error: "Book not found" })];
                }
                res.json(book);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error(error_3);
                res.status(500).json({ error: "Could not retrieve the book" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.put("/books/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var bookId, _a, title, author, publicationYear, isbn, description, updatedBook, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                bookId = req.params.id;
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
                res.json(updatedBook);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _b.sent();
                console.error(error_4);
                res.status(500).json({ error: "Could not update the book" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.delete("/books/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var bookId, deletedBook, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                bookId = req.params.id;
                return [4 /*yield*/, Book.findByIdAndRemove(bookId)];
            case 1:
                deletedBook = _a.sent();
                if (!deletedBook) {
                    return [2 /*return*/, res.status(404).json({ error: "Book not found" })];
                }
                res.json(deletedBook);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                console.error(error_5);
                res.status(500).json({ error: "Could not delete the book" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    console.log("Server is listening on ".concat(port));
});

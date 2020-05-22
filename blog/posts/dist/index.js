"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const crypto_1 = require("crypto");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(cors_1.default());
const posts = {};
app.get('/posts', (req, res) => {
    res.send(posts);
});
app.post('/posts', (req, res) => {
    const id = crypto_1.randomBytes(4).toString('hex');
    const { title } = req.body;
    const post = {
        id,
        title
    };
    posts[id] = post;
    res.status(201).send(post);
});
app.listen(5000, () => {
    console.log('Listening on 5000');
});

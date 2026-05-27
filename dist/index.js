"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const api_1 = __importDefault(require("./routes/api"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Enable CORS so the browser can make requests safely
app.use((0, cors_1.default)());
// Parse JSON request body
app.use(express_1.default.json());
// Log incoming API calls for easy debugging
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});
// Register MVP API Routes
app.use('/api', api_1.default);
// Serve the interactive developer console UI
app.use(express_1.default.static(path_1.default.join(process.cwd(), 'src', 'public')));
// Fallback routing to serve the dev console dashboard
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(process.cwd(), 'src', 'public', 'index.html'));
});
// Start listening
app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(` ✨ VNP BeautyTalent Backend Service is running!`);
    console.log(` 🚀 Server Listening on: http://localhost:${PORT}`);
    console.log(` 💎 Developer Dashboard UI: http://localhost:${PORT}`);
    console.log(`====================================================`);
});

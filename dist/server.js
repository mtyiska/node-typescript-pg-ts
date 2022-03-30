"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import http from "http";
const express_1 = __importDefault(require("express"));
const utils_1 = require("./utils");
const middleware_1 = __importDefault(require("./middleware"));
const services_1 = __importDefault(require("./services"));
const app = (0, express_1.default)();
(0, utils_1.applyMiddleware)(middleware_1.default, app);
(0, utils_1.applyRoutes)(services_1.default, app);
const { PORT = 3000 } = process.env;
// const server = http.createServer(app);
// server.listen(PORT, () =>
//   console.log(`Server is running http://localhost:${PORT}...`)
// );
app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}...`);
});
//# sourceMappingURL=server.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePost = exports.createPost = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createPost = zod_1.default.object({
    title: zod_1.default.string().max(150),
    content: zod_1.default.string()
});
exports.updatePost = zod_1.default.object({
    title: zod_1.default.string().max(150),
    content: zod_1.default.string(),
    id: zod_1.default.string(),
    bookmark: zod_1.default.boolean().optional()
});

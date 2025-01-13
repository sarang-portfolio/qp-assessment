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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_repo_1 = __importDefault(require("./user.repo"));
const createUser = (userDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_repo_1.default.create(userDto);
        return user;
    }
    catch (error) {
        throw error;
    }
});
const getOneUser = (userDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_repo_1.default.getOne(userDto);
        return user;
    }
    catch (error) {
        throw error;
    }
});
exports.default = {
    createUser,
    getOneUser,
};
//# sourceMappingURL=user.service.js.map
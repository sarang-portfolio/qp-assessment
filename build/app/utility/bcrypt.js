'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.comparePassword = exports.createHash = void 0;
const bcryptjs_1 = require('bcryptjs');
const createHash = (password) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield (0, bcryptjs_1.genSalt)();
    const hashedPassword = yield (0, bcryptjs_1.hash)(password, salt);
    return hashedPassword;
  });
exports.createHash = createHash;
const comparePassword = (password, hashedPassword) =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, bcryptjs_1.compare)(password, hashedPassword);
  });
exports.comparePassword = comparePassword;
//# sourceMappingURL=bcrypt.js.map

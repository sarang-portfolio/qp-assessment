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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const common_1 = require('../../common');
const bcrypt_1 = require('../../utility/bcrypt');
const roles_service_1 = __importDefault(require('../roles/roles.service'));
const user_constants_1 = require('../user/user.constants');
const user_service_1 = __importDefault(require('../user/user.service'));
const auth_constants_1 = require('./auth.constants');
const signUp = (signUpDto) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const existingUser = yield user_service_1.default.getOneUser({
        email: signUpDto.email,
      });
      if (existingUser) {
        throw user_constants_1.USER_CONSTANTS.EXISTS;
      }
      let role = signUpDto.role
        ? yield roles_service_1.default.getOneRole({ name: signUpDto.role })
        : yield roles_service_1.default.getOneRole({ name: 'User' });
      const { password } = signUpDto,
        restUserDto = __rest(signUpDto, ['password']);
      const hashedPassword = yield (0, bcrypt_1.createHash)(password);
      yield user_service_1.default.createUser(
        Object.assign(
          {
            password: hashedPassword,
            roleId: Number(role === null || role === void 0 ? void 0 : role.id),
          },
          restUserDto,
        ),
      );
      return user_constants_1.USER_CONSTANTS.CREATED;
    } catch (error) {
      throw error;
    }
  });
const login = (loginDto) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const user = yield user_service_1.default.getOneUser({
        email: loginDto.email,
      });
      if (!user) {
        throw user_constants_1.USER_CONSTANTS.NOT_FOUND;
      }
      const isPasswordCorrect = yield (0, bcrypt_1.comparePassword)(
        loginDto.password,
        user.password,
      );
      if (!isPasswordCorrect) {
        throw auth_constants_1.AUTH_CONSTANTS.INVALID_CREDENTIALS;
      }
      const payload = {
        userId: user.id,
        role: user.roleId,
      };
      const token = (0, common_1.createToken)(payload);
      return { token };
    } catch (error) {
      throw error;
    }
  });
exports.default = {
  signUp,
  login,
};
//# sourceMappingURL=auth.service.js.map

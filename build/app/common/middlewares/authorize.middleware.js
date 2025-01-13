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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.permit =
  exports.verifyToken =
  exports.createToken =
  exports.authorize =
    void 0;
const joi_1 = __importDefault(require('joi'));
const jsonwebtoken_1 = require('jsonwebtoken');
const validator_1 = require('../../utility/validator');
const constants_1 = require('../constants');
const authorize = (excludedPaths) => {
  return (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      try {
        if (
          excludedPaths.find((e) => {
            return req.url.includes(e.path) && req.method.includes(e.method);
          })
        ) {
          return next();
        }
        const authorizationSchema = joi_1.default.object({
          authorization: joi_1.default.string().required().messages({
            'any.required': 'Authorization header is required',
            'string.empty': 'Authorization header cannot be empty',
          }),
        });
        (0, validator_1.validateSchema)(authorizationSchema, req.headers);
        const token = req.headers.authorization;
        const payload = (0, exports.verifyToken)(token);
        res.locals.user = payload;
        next();
      } catch (e) {
        next(constants_1.BASE_EXCEPTION_CONSTANTS.UNAUTHORIZED);
      }
    });
};
exports.authorize = authorize;
const createToken = (payload) => {
  const { JWT_SECRET } = process.env;
  const token = (0, jsonwebtoken_1.sign)(payload, JWT_SECRET || '');
  return token;
};
exports.createToken = createToken;
const verifyToken = (token) => {
  const { JWT_SECRET } = process.env;
  const payload = (0, jsonwebtoken_1.verify)(token, JWT_SECRET || '');
  return payload;
};
exports.verifyToken = verifyToken;
const permit = (permittedRoles) => {
  return (req, res, next) => {
    if (permittedRoles.includes(res.locals.user.role)) {
      return next();
    }
    next(constants_1.BASE_EXCEPTION_CONSTANTS.FORBIDDEN);
  };
};
exports.permit = permit;
//# sourceMappingURL=authorize.middleware.js.map

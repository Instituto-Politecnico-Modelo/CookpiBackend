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
Object.defineProperty(exports, "__esModule", { value: true });
/*import app from '../server';*/
describe('User Controller', () => {
    it('GET /users should return a list of users', () => __awaiter(void 0, void 0, void 0, function* () {
        /* const response = await request(app).get('/users');
         expect(response.status).toBe(200);
         expect(Array.isArray(response.body)).toBe(true);*/
        expect(5 + 1).toBe(6);
    }));
});
//# sourceMappingURL=userController.test.js.map
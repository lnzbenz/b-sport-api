"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("./user.entity");
exports.UserProvider = [
    {
        provide: 'UserToken',
        useFactory: (con) => con.getRepository(user_entity_1.User),
        inject: ['DbConnectionToken'],
    },
];
//# sourceMappingURL=ีusers.provider.js.map
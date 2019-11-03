"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_entity_1 = require("./store.entity");
exports.StoreProvider = [
    {
        provide: 'StoreToken',
        useFactory: (con) => con.getRepository(store_entity_1.Store),
        inject: ['DbConnectionToken'],
    },
];
//# sourceMappingURL=store.provider.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_js_1 = require("../generated/prisma/client.js");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = __importDefault(require("pg"));
const pool = new pg_1.default.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_js_1.PrismaClient({ adapter });
async function main() {
    console.log('🌱 Seeding database...');
    await prisma.category.deleteMany();
    await prisma.category.createMany({
        data: [
            { slug: 'smartphones', name: 'Smartphones' },
            { slug: 'laptops', name: 'Laptops' },
        ]
    });
    console.log('✅ Done!');
}
main().catch(console.error).finally(() => prisma.$disconnect());
//# sourceMappingURL=seed-simple.js.map
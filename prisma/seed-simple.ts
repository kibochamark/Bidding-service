import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

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

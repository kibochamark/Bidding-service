"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { PrismaClient } = require('../generated/prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });
async function main() {
    console.log('🌱 Starting database seeding...');
    console.log('🗑️  Clearing existing data...');
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.address.deleteMany();
    await prisma.kycProfile.deleteMany();
    await prisma.sellerDetails.deleteMany();
    await prisma.account.deleteMany();
    console.log('👤 Creating test accounts...');
    const account1 = await prisma.account.create({ data: { kindeId: 'kp_test_user_001' } });
    const account2 = await prisma.account.create({ data: { kindeId: 'kp_test_seller_001' } });
    console.log('📁 Creating categories...');
    await prisma.category.createMany({
        data: [
            { slug: 'smartphones', name: 'Smartphones', icon: '📱' },
            { slug: 'laptops', name: 'Laptops', icon: '💻' },
            { slug: 'audio', name: 'Audio', icon: '🎧' },
        ]
    });
    const categories = await prisma.category.findMany();
    const categoryMap = Object.fromEntries(categories.map(c => [c.slug, c.id]));
    console.log('📦 Creating products...');
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);
    await prisma.product.create({
        data: {
            title: 'iPhone 14 Pro - 256GB',
            description: 'Excellent condition iPhone with minimal wear',
            categoryId: categoryMap['smartphones'],
            condition: 'EXCELLENT',
            images: ['https://images.unsplash.com/photo-1663499482523-1c0d8c469d0c?w=800'],
            startingPrice: 699,
            currentBid: 850,
            endDate,
            sellerId: account2.kindeId,
            sellerName: 'Tech Seller',
            sellerRating: 4.8,
            specifications: { Storage: '256GB', Color: 'Purple' }
        }
    });
    console.log('✅ Database seeded successfully!');
}
main()
    .catch(e => {
    console.error('❌ Error:', e);
    process.exit(1);
})
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=seed.js.map
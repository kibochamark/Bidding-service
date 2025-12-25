import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

/**
 * Database seeding script using NestJS Factory
 *
 * This approach bootstraps the entire NestJS application context,
 * giving us access to properly configured services through DI.
 */
async function seed() {
    console.log('🌱 Starting database seeding...\n');

    // Create standalone application context (no HTTP server)
    const app = await NestFactory.createApplicationContext(AppModule, {
        logger: ['error', 'warn', 'log'],
    });

    // Get PrismaService from DI container (properly configured with adapter)
    const prisma = app.get(PrismaService);

    try {
        console.log('🗑️  Clearing existing data...');
        await prisma.product.deleteMany();
        await prisma.category.deleteMany();
        await prisma.address.deleteMany();
        await prisma.kycProfile.deleteMany();
        await prisma.sellerDetails.deleteMany();
        await prisma.account.deleteMany();
        console.log('✅ Existing data cleared\n');

        // ============================================
        // 1. Create Test Accounts
        // ============================================
        console.log('👤 Creating test accounts...');
        const buyer1 = await prisma.account.create({
            data: { kindeId: 'kp_buyer_001' },
        });
        const buyer2 = await prisma.account.create({
            data: { kindeId: 'kp_buyer_002' },
        });
        const seller1 = await prisma.account.create({
            data: { kindeId: 'kp_seller_001' },
        });
        const seller2 = await prisma.account.create({
            data: { kindeId: 'kp_seller_002' },
        });
        console.log(`✅ Created ${4} accounts\n`);

        // ============================================
        // 2. Create Seller Profiles
        // ============================================
        console.log('🏪 Creating seller profiles...');
        await prisma.sellerDetails.create({
            data: {
                companyName: 'TechHub Store',
                rating: 4.8,
                totalSales: 156,
                accountId: seller1.kindeId                
                // responseRate: 0.95,
                // description: 'Premium electronics and gadgets dealer. Fast shipping guaranteed.',
            },
        });
        await prisma.sellerDetails.create({
            data: {
                accountId: seller2.kindeId,
                companyName: 'Audio Paradise',
                rating: 4.6,
                totalSales: 89,
                // responseRate: 0.88,
            },
        });
        console.log('✅ Created 2 seller profiles\n');

        // ============================================
        // 3. Create Categories
        // ============================================
        console.log('📁 Creating categories...');
        await prisma.category.createMany({
            data: [
                { slug: 'smartphones', name: 'Smartphones', icon: '📱' },
                { slug: 'laptops', name: 'Laptops', icon: '💻' },
                { slug: 'audio', name: 'Audio Equipment', icon: '🎧' },
                { slug: 'cameras', name: 'Cameras', icon: '📷' },
                { slug: 'gaming', name: 'Gaming', icon: '🎮' },
                { slug: 'wearables', name: 'Wearables', icon: '⌚' },
            ],
        });

        const categories = await prisma.category.findMany();
        const categoryMap = Object.fromEntries(
            categories.map((c) => [c.slug, c.id])
        );
        console.log(`✅ Created ${categories.length} categories\n`);

        // ============================================
        // 4. Create Products
        // ============================================
        console.log('📦 Creating products...');

        const now = new Date();
        const endingSoon = new Date(now);
        endingSoon.setHours(now.getHours() + 6); // 6 hours from now

        const endingToday = new Date(now);
        endingToday.setDate(now.getDate() + 1); // Tomorrow

        const endingWeek = new Date(now);
        endingWeek.setDate(now.getDate() + 7); // 1 week

        const endingMonth = new Date(now);
        endingMonth.setDate(now.getDate() + 30); // 1 month


        console.log(endingSoon, endingToday, endingWeek, endingMonth);

        // Smartphones
        await prisma.product.create({
            data: {
                title: 'iPhone 14 Pro Max - 256GB Space Black',
                description:
                    'Factory unlocked iPhone 14 Pro Max in excellent condition. Includes original box, charger, and unused accessories. AppleCare+ until Dec 2025. Battery health 98%. No scratches or dents.',
                categoryId: categoryMap['smartphones'],
                condition: 'EXCELLENT',
                images: [
                    'https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=800',
                    'https://images.unsplash.com/photo-1678911820864-e2c327e0e5e2?w=800',
                ],
                startingPrice: 699,
                currentBid: 850,
                reservePrice: 900,
                buyNowPrice: 1050,
                endDate: endingSoon,
                sellerId: seller1.kindeId,
                sellerName: 'TechHub Store',
                sellerRating: 4.8,
                specifications: {
                    Storage: '256GB',
                    Color: 'Space Black',
                    Network: 'Unlocked',
                    'Battery Health': '98%',
                    Warranty: 'AppleCare+ until Dec 2025',
                },
            },
        });

        await prisma.product.create({
            data: {
                title: 'Samsung Galaxy S23 Ultra - 512GB Phantom Black',
                description:
                    'Like-new Galaxy S23 Ultra with S Pen. Minimal usage, kept in case. Comes with original packaging, 45W fast charger, and tempered glass screen protector.',
                categoryId: categoryMap['smartphones'],
                condition: 'MINT',
                images: [
                    'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800',
                ],
                startingPrice: 799,
                currentBid: 950,
                buyNowPrice: 1150,
                endDate: endingToday,
                sellerId: seller1.kindeId,
                sellerName: 'TechHub Store',
                sellerRating: 4.8,
                specifications: {
                    Storage: '512GB',
                    Color: 'Phantom Black',
                    RAM: '12GB',
                    'S Pen': 'Included',
                    Condition: 'Like New',
                },
            },
        });

        await prisma.product.create({
            data: {
                title: 'Google Pixel 8 Pro - 128GB Bay Blue',
                description:
                    'Google Pixel 8 Pro in good condition. Some minor wear on the edges but screen is pristine. Upgraded to newer model. Includes case and original charger.',
                categoryId: categoryMap['smartphones'],
                condition: 'GOOD',
                images: [
                    'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800',
                ],
                startingPrice: 499,
                currentBid: 499,
                buyNowPrice: 650,
                endDate: endingWeek,
                sellerId: seller2.kindeId,
                sellerName: 'Audio Paradise',
                sellerRating: 4.6,
                specifications: {
                    Storage: '128GB',
                    Color: 'Bay Blue',
                    RAM: '12GB',
                    Features: 'Google Tensor G3, Magic Eraser',
                },
            },
        });

        // Laptops
        await prisma.product.create({
            data: {
                title: 'MacBook Pro 16" M2 Max - 32GB RAM, 1TB SSD',
                description:
                    'Professional-grade MacBook Pro with M2 Max chip. Perfect for video editing and development. Barely used, purchased for project that was cancelled. Includes original box and all accessories.',
                categoryId: categoryMap['laptops'],
                condition: 'EXCELLENT',
                images: [
                    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
                ],
                startingPrice: 2200,
                currentBid: 2450,
                reservePrice: 2500,
                buyNowPrice: 2800,
                endDate: endingWeek,
                sellerId: seller1.kindeId,
                sellerName: 'TechHub Store',
                sellerRating: 4.8,
                specifications: {
                    Processor: 'Apple M2 Max',
                    RAM: '32GB',
                    Storage: '1TB SSD',
                    Display: '16-inch Liquid Retina XDR',
                    'Battery Cycles': '12',
                },
            },
        });

        await prisma.product.create({
            data: {
                title: 'Dell XPS 15 - i7-12700H, 16GB, RTX 3050 Ti',
                description:
                    'High-performance Windows laptop for creative professionals. Excellent condition with minor keyboard wear. Great for photo/video editing and light gaming.',
                categoryId: categoryMap['laptops'],
                condition: 'GOOD',
                images: [
                    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800',
                ],
                startingPrice: 899,
                currentBid: 1050,
                buyNowPrice: 1250,
                endDate: endingMonth,
                sellerId: seller1.kindeId,
                sellerName: 'TechHub Store',
                sellerRating: 4.8,
                specifications: {
                    Processor: 'Intel i7-12700H',
                    RAM: '16GB DDR5',
                    Storage: '512GB NVMe SSD',
                    GPU: 'NVIDIA RTX 3050 Ti',
                    Display: '15.6" 3.5K OLED',
                },
            },
        });

        // Audio Equipment
        await prisma.product.create({
            data: {
                title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
                description:
                    'Premium noise-cancelling headphones in mint condition. Used only a handful of times. Includes original case, cables, and airplane adapter. Industry-leading ANC performance.',
                categoryId: categoryMap['audio'],
                condition: 'MINT',
                images: [
                    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800',
                ],
                startingPrice: 249,
                currentBid: 280,
                buyNowPrice: 330,
                endDate: endingSoon,
                sellerId: seller2.kindeId,
                sellerName: 'Audio Paradise',
                sellerRating: 4.6,
                specifications: {
                    Type: 'Over-Ear Wireless',
                    'Noise Cancellation': 'Active (Best-in-class)',
                    'Battery Life': '30 hours',
                    Connectivity: 'Bluetooth 5.2, 3.5mm',
                    Features: 'LDAC, Multipoint, Speak-to-Chat',
                },
            },
        });

        await prisma.product.create({
            data: {
                title: 'AirPods Pro 2nd Generation with MagSafe',
                description:
                    'Latest AirPods Pro with improved ANC and Adaptive Transparency. Excellent condition, upgraded to over-ear headphones. Includes charging case and all ear tips.',
                categoryId: categoryMap['audio'],
                condition: 'EXCELLENT',
                images: [
                    'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800',
                ],
                startingPrice: 179,
                currentBid: 195,
                buyNowPrice: 220,
                endDate: endingToday,
                sellerId: seller2.kindeId,
                sellerName: 'Audio Paradise',
                sellerRating: 4.6,
                specifications: {
                    Type: 'True Wireless In-Ear',
                    'Noise Cancellation': 'Active (2x better)',
                    'Battery Life': '6 hours (30 with case)',
                    Chip: 'Apple H2',
                    Features: 'Spatial Audio, Adaptive Transparency',
                },
            },
        });

        // Cameras
        await prisma.product.create({
            data: {
                title: 'Canon EOS R6 Mark II Mirrorless Camera (Body Only)',
                description:
                    'Professional full-frame mirrorless camera with 24.2MP sensor. Low shutter count (2,500 actuations). Perfect for wedding and portrait photography. Includes battery, charger, and strap.',
                categoryId: categoryMap['cameras'],
                condition: 'EXCELLENT',
                images: [
                    'https://images.unsplash.com/photo-1606980707965-cde9f6886bb2?w=800',
                ],
                startingPrice: 1899,
                currentBid: 2100,
                reservePrice: 2200,
                buyNowPrice: 2400,
                endDate: endingWeek,
                sellerId: seller1.kindeId,
                sellerName: 'TechHub Store',
                sellerRating: 4.8,
                specifications: {
                    Sensor: '24.2MP Full-Frame CMOS',
                    Video: '4K 60fps, 6K RAW',
                    'Shutter Count': '2,500',
                    'Image Stabilization': '5-axis IBIS',
                    AF: 'Dual Pixel CMOS AF II',
                },
            },
        });

        // Gaming
        await prisma.product.create({
            data: {
                title: 'PlayStation 5 Digital Edition with Extra Controller',
                description:
                    'PS5 Digital Edition in excellent condition. Includes extra DualSense controller, HDMI cable, and power cord. Minimal usage, upgraded to disc version.',
                categoryId: categoryMap['gaming'],
                condition: 'EXCELLENT',
                images: [
                    'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800',
                ],
                startingPrice: 349,
                currentBid: 380,
                buyNowPrice: 430,
                endDate: endingSoon,
                sellerId: seller1.kindeId,
                sellerName: 'TechHub Store',
                sellerRating: 4.8,
                specifications: {
                    Model: 'Digital Edition',
                    Storage: '825GB SSD',
                    Resolution: '4K/120fps',
                    Includes: 'Extra DualSense Controller',
                },
            },
        });

        // Wearables
        await prisma.product.create({
            data: {
                title: 'Apple Watch Series 9 GPS + Cellular 45mm Midnight',
                description:
                    'Latest Apple Watch in mint condition. Used for 2 months, includes original box, charger, and 3 additional bands (Sport Loop, Braided Solo, Nike Sport).',
                categoryId: categoryMap['wearables'],
                condition: 'MINT',
                images: [
                    'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800',
                ],
                startingPrice: 399,
                currentBid: 420,
                buyNowPrice: 480,
                endDate: endingToday,
                sellerId: seller2.kindeId,
                sellerName: 'Audio Paradise',
                sellerRating: 4.6,
                specifications: {
                    Size: '45mm',
                    Color: 'Midnight Aluminum',
                    Connectivity: 'GPS + Cellular',
                    'Extra Bands': '3 (Sport Loop, Braided, Nike)',
                    Features: 'Always-On, Blood Oxygen, ECG',
                },
            },
        });

        const productCount = await prisma.product.count();
        console.log(`✅ Created ${productCount} products\n`);

        // ============================================
        // Summary
        // ============================================
        console.log('📊 Seeding Summary:');
        console.log(`   Accounts: ${4}`);
        console.log(`   Seller Profiles: ${2}`);
        console.log(`   Categories: ${categories.length}`);
        console.log(`   Products: ${productCount}`);
        console.log('\n✨ Database seeded successfully!');
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        throw error;
    } finally {
        // Clean up: disconnect Prisma and close NestJS application context
        await prisma.$disconnect();
        await app.close();
    }
}

// Execute seeding
seed()
    .catch((error) => {
        console.error('Fatal error:', error);
        process.exit(1);
    });

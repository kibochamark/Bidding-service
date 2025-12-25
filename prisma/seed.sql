-- Clear existing data (in reverse order of dependencies)
TRUNCATE TABLE "Product" CASCADE;

TRUNCATE TABLE "Category" CASCADE;

TRUNCATE TABLE "Address" CASCADE;

TRUNCATE TABLE "KycProfile" CASCADE;

TRUNCATE TABLE "SellerDetails" CASCADE;

TRUNCATE TABLE "Account" CASCADE;

-- Reset sequences if you have them
-- ALTER SEQUENCE "Account_id_seq" RESTART WITH 1;
-- ALTER SEQUENCE "Category_id_seq" RESTART WITH 1;
-- ============================================
-- 1. Create Test Accounts
-- ============================================
INSERT INTO
    "Account" ("id", "kindeId", "createdAt", "updatedAt")
VALUES
    (uuid_generate_v4(), 'kp_buyer_001', NOW(), NOW()),
    (uuid_generate_v4(), 'kp_buyer_002', NOW(), NOW()),
    (
        uuid_generate_v4(),
        'kp_seller_001',
        NOW(),
        NOW()
    ),
    (
        uuid_generate_v4(),
        'kp_seller_002',
        NOW(),
        NOW()
    );

-- ============================================
-- 2. Create Seller Profiles
-- ============================================
INSERT INTO
    "SellerDetails" (
        "id",
        "accountId",
        "companyName",
        "rating",
        "totalSales",
        "createdAt",
        "updatedAt"
    )
VALUES
    (
        uuid_generate_v4(),
        'kp_seller_001',
        'TechHub Store',
        4.8,
        156,
        NOW(),
        NOW()
    ),
    (
        uuid_generate_v4(),
        'kp_seller_002',
        'Audio Paradise',
        4.6,
        89,
        NOW(),
        NOW()
    );

-- ============================================
-- 3. Create Categories
-- ============================================
INSERT INTO
    "Category" (
        "id",
        "slug",
        "name",
        "icon",
        "createdAt",
        "updatedAt"
    )
VALUES
    (
        uuid_generate_v4(),
        'smartphones',
        'Smartphones',
        '📱',
        NOW(),
        NOW()
    ),
    (
        uuid_generate_v4(),
        'laptops',
        'Laptops',
        '💻',
        NOW(),
        NOW()
    ),
    (
        uuid_generate_v4(),
        'audio',
        'Audio Equipment',
        '🎧',
        NOW(),
        NOW()
    ),
    (
        uuid_generate_v4(),
        'cameras',
        'Cameras',
        '📷',
        NOW(),
        NOW()
    ),
    (
        uuid_generate_v4(),
        'gaming',
        'Gaming',
        '🎮',
        NOW(),
        NOW()
    ),
    (
        uuid_generate_v4(),
        'wearables',
        'Wearables',
        '⌚',
        NOW(),
        NOW()
    );

-- ============================================
-- 4. Create Products
-- ============================================
-- Get category IDs for reference
DO $ $ DECLARE smartphones_id UUID;

laptops_id UUID;

audio_id UUID;

cameras_id UUID;

gaming_id UUID;

wearables_id UUID;

ending_soon TIMESTAMP;

ending_today TIMESTAMP;

ending_week TIMESTAMP;

ending_month TIMESTAMP;

BEGIN -- Get category IDs
SELECT
    "id" INTO smartphones_id
FROM
    "Category"
WHERE
    "slug" = 'smartphones';

SELECT
    "id" INTO laptops_id
FROM
    "Category"
WHERE
    "slug" = 'laptops';

SELECT
    "id" INTO audio_id
FROM
    "Category"
WHERE
    "slug" = 'audio';

SELECT
    "id" INTO cameras_id
FROM
    "Category"
WHERE
    "slug" = 'cameras';

SELECT
    "id" INTO gaming_id
FROM
    "Category"
WHERE
    "slug" = 'gaming';

SELECT
    "id" INTO wearables_id
FROM
    "Category"
WHERE
    "slug" = 'wearables';

-- Calculate end dates
ending_soon := NOW() + INTERVAL '6 hours';

ending_today := NOW() + INTERVAL '1 day';

ending_week := NOW() + INTERVAL '7 days';

ending_month := NOW() + INTERVAL '30 days';

-- Smartphones
INSERT INTO
    "Product" (
        "id",
        "title",
        "description",
        "categoryId",
        "condition",
        "images",
        "startingPrice",
        "currentBid",
        "reservePrice",
        "buyNowPrice",
        "endDate",
        "sellerId",
        "sellerName",
        "sellerRating",
        "specifications",
        "bidsCount",
        "startDate",
        "isActive",
        "rating",
        "reviewCount",
        "createdAt",
        "updatedAt"
    )
VALUES
    (
        uuid_generate_v4(),
        'iPhone 14 Pro Max - 256GB Space Black',
        'Factory unlocked iPhone 14 Pro Max in excellent condition. Includes original box, charger, and unused accessories. AppleCare+ until Dec 2025. Battery health 98%. No scratches or dents.',
        smartphones_id,
        'EXCELLENT',
        ARRAY ['https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=800', 'https://images.unsplash.com/photo-1678911820864-e2c327e0e5e2?w=800'],
        699.00,
        850.00,
        900.00,
        1050.00,
        ending_soon,
        'kp_seller_001',
        'TechHub Store',
        4.80,
        '{"Storage": "256GB", "Color": "Space Black", "Network": "Unlocked", "Battery Health": "98%", "Warranty": "AppleCare+ until Dec 2025"}' :: jsonb,
        0,
        NOW(),
        true,
        0.0,
        0,
        NOW(),
        NOW()
    ),
    (
        uuid_generate_v4(),
        'Samsung Galaxy S23 Ultra - 512GB Phantom Black',
        'Like-new Galaxy S23 Ultra with S Pen. Minimal usage, kept in case. Comes with original packaging, 45W fast charger, and tempered glass screen protector.',
        smartphones_id,
        'MINT',
        ARRAY ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800'],
        799.00,
        950.00,
        NULL,
        1150.00,
        ending_today,
        'kp_seller_001',
        'TechHub Store',
        4.80,
        '{"Storage": "512GB", "Color": "Phantom Black", "RAM": "12GB", "S Pen": "Included", "Condition": "Like New"}' :: jsonb,
        0,
        NOW(),
        true,
        0.0,
        0,
        NOW(),
        NOW()
    ),
    (
        uuid_generate_v4(),
        'Google Pixel 8 Pro - 128GB Bay Blue',
        'Google Pixel 8 Pro in good condition. Some minor wear on the edges but screen is pristine. Upgraded to newer model. Includes case and original charger.',
        smartphones_id,
        'GOOD',
        ARRAY ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800'],
        499.00,
        499.00,
        NULL,
        650.00,
        ending_week,
        'kp_seller_002',
        'Audio Paradise',
        4.60,
        '{"Storage": "128GB", "Color": "Bay Blue", "RAM": "12GB", "Features": "Google Tensor G3, Magic Eraser"}' :: jsonb,
        0,
        NOW(),
        true,
        0.0,
        0,
        NOW(),
        NOW()
    ),
    -- Laptops
    (
        uuid_generate_v4(),
        'MacBook Pro 16" M2 Max - 32GB RAM, 1TB SSD',
        'Professional-grade MacBook Pro with M2 Max chip. Perfect for video editing and development. Barely used, purchased for project that was cancelled. Includes original box and all accessories.',
        laptops_id,
        'EXCELLENT',
        ARRAY ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800'],
        2200.00,
        2450.00,
        2500.00,
        2800.00,
        ending_week,
        'kp_seller_001',
        'TechHub Store',
        4.80,
        '{"Processor": "Apple M2 Max", "RAM": "32GB", "Storage": "1TB SSD", "Display": "16-inch Liquid Retina XDR", "Battery Cycles": "12"}' :: jsonb,
        0,
        NOW(),
        true,
        0.0,
        0,
        NOW(),
        NOW()
    ),
    (
        uuid_generate_v4(),
        'Dell XPS 15 - i7-12700H, 16GB, RTX 3050 Ti',
        'High-performance Windows laptop for creative professionals. Excellent condition with minor keyboard wear. Great for photo/video editing and light gaming.',
        laptops_id,
        'GOOD',
        ARRAY ['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800'],
        899.00,
        1050.00,
        NULL,
        1250.00,
        ending_month,
        'kp_seller_001',
        'TechHub Store',
        4.80,
        '{"Processor": "Intel i7-12700H", "RAM": "16GB DDR5", "Storage": "512GB NVMe SSD", "GPU": "NVIDIA RTX 3050 Ti", "Display": "15.6\" 3.5K OLED"}' :: jsonb,
        0,
        NOW(),
        true,
        0.0,
        0,
        NOW(),
        NOW()
    ),
    -- Audio Equipment
    (
        uuid_generate_v4(),
        'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
        'Premium noise-cancelling headphones in mint condition. Used only a handful of times. Includes original case, cables, and airplane adapter. Industry-leading ANC performance.',
        audio_id,
        'MINT',
        ARRAY ['https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800'],
        249.00,
        280.00,
        NULL,
        330.00,
        ending_soon,
        'kp_seller_002',
        'Audio Paradise',
        4.60,
        '{"Type": "Over-Ear Wireless", "Noise Cancellation": "Active (Best-in-class)", "Battery Life": "30 hours", "Connectivity": "Bluetooth 5.2, 3.5mm", "Features": "LDAC, Multipoint, Speak-to-Chat"}' :: jsonb,
        0,
        NOW(),
        true,
        0.0,
        0,
        NOW(),
        NOW()
    ),
    (
        uuid_generate_v4(),
        'AirPods Pro 2nd Generation with MagSafe',
        'Latest AirPods Pro with improved ANC and Adaptive Transparency. Excellent condition, upgraded to over-ear headphones. Includes charging case and all ear tips.',
        audio_id,
        'EXCELLENT',
        ARRAY ['https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800'],
        179.00,
        195.00,
        NULL,
        220.00,
        ending_today,
        'kp_seller_002',
        'Audio Paradise',
        4.60,
        '{"Type": "True Wireless In-Ear", "Noise Cancellation": "Active (2x better)", "Battery Life": "6 hours (30 with case)", "Chip": "Apple H2", "Features": "Spatial Audio, Adaptive Transparency"}' :: jsonb,
        0,
        NOW(),
        true,
        0.0,
        0,
        NOW(),
        NOW()
    ),
    -- Cameras
    (
        uuid_generate_v4(),
        'Canon EOS R6 Mark II Mirrorless Camera (Body Only)',
        'Professional full-frame mirrorless camera with 24.2MP sensor. Low shutter count (2,500 actuations). Perfect for wedding and portrait photography. Includes battery, charger, and strap.',
        cameras_id,
        'EXCELLENT',
        ARRAY ['https://images.unsplash.com/photo-1606980707965-cde9f6886bb2?w=800'],
        1899.00,
        2100.00,
        2200.00,
        2400.00,
        ending_week,
        'kp_seller_001',
        'TechHub Store',
        4.80,
        '{"Sensor": "24.2MP Full-Frame CMOS", "Video": "4K 60fps, 6K RAW", "Shutter Count": "2,500", "Image Stabilization": "5-axis IBIS", "AF": "Dual Pixel CMOS AF II"}' :: jsonb,
        0,
        NOW(),
        true,
        0.0,
        0,
        NOW(),
        NOW()
    ),
    -- Gaming
    (
        uuid_generate_v4(),
        'PlayStation 5 Digital Edition with Extra Controller',
        'PS5 Digital Edition in excellent condition. Includes extra DualSense controller, HDMI cable, and power cord. Minimal usage, upgraded to disc version.',
        gaming_id,
        'EXCELLENT',
        ARRAY ['https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800'],
        349.00,
        380.00,
        NULL,
        430.00,
        ending_soon,
        'kp_seller_001',
        'TechHub Store',
        4.80,
        '{"Model": "Digital Edition", "Storage": "825GB SSD", "Resolution": "4K/120fps", "Includes": "Extra DualSense Controller"}' :: jsonb,
        0,
        NOW(),
        true,
        0.0,
        0,
        NOW(),
        NOW()
    ),
    -- Wearables
    (
        uuid_generate_v4(),
        'Apple Watch Series 9 GPS + Cellular 45mm Midnight',
        'Latest Apple Watch in mint condition. Used for 2 months, includes original box, charger, and 3 additional bands (Sport Loop, Braided Solo, Nike Sport).',
        wearables_id,
        'MINT',
        ARRAY ['https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800'],
        399.00,
        420.00,
        NULL,
        480.00,
        ending_today,
        'kp_seller_002',
        'Audio Paradise',
        4.60,
        '{"Size": "45mm", "Color": "Midnight Aluminum", "Connectivity": "GPS + Cellular", "Extra Bands": "3 (Sport Loop, Braided, Nike)", "Features": "Always-On, Blood Oxygen, ECG"}' :: jsonb,
        0,
        NOW(),
        true,
        0.0,
        0,
        NOW(),
        NOW()
    );

END $ $;

-- ============================================
-- Summary Query
-- ============================================
SELECT
    (
        SELECT
            COUNT(*)
        FROM
            "Account"
    ) as accounts_count,
    (
        SELECT
            COUNT(*)
        FROM
            "SellerDetails"
    ) as sellers_count,
    (
        SELECT
            COUNT(*)
        FROM
            "Category"
    ) as categories_count,
    (
        SELECT
            COUNT(*)
        FROM
            "Product"
    ) as products_count;



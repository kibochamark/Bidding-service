/**
 * Seed Script for Bidding Service - Electronics Focus
 *
 * Usage:
 *   node scripts/seed.mjs                          # defaults to http://localhost:4000
 *   node scripts/seed.mjs http://your-server:4000   # custom API URL
 *
 * What it does:
 *   1. Downloads sample images from picsum.photos
 *   2. Creates 5 electronics sub-categories with icons
 *   3. Creates 15 products (3 per category)
 *   4. Uploads 2 images per product
 */

import { readFile, writeFile, mkdir, access } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMAGE_DIR = join(__dirname, 'seed-images');
const API_URL = process.argv[2] || 'http://localhost:4000';

// ─── Helpers ────────────────────────────────────────────────────

async function downloadImage(url, filename) {
  const filepath = join(IMAGE_DIR, filename);
  try {
    await access(filepath);
    console.log(`  [cached] ${filename}`);
    return filepath;
  } catch {
    // file doesn't exist, download it
  }

  console.log(`  downloading ${filename}...`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  await writeFile(filepath, buffer);
  console.log(`  done ${filename}`);
  return filepath;
}

async function createCategory(category, iconPath) {
  const fileBuffer = await readFile(iconPath);
  const file = new File([fileBuffer], 'icon.jpg', { type: 'image/jpeg' });

  const form = new FormData();
  form.append('file', file);
  form.append('slug', category.slug);
  form.append('name', category.name);
  form.append('description', category.description);
  if (category.parentId) form.append('parentId', category.parentId);

  const res = await fetch(`${API_URL}/categories`, {
    method: 'POST',
    body: form,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to create category "${category.name}": ${err}`);
  }

  const data = await res.json();
  console.log(`  + Category: ${category.name} (${data.id})`);
  return data;
}

async function createProduct(product) {
  const res = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to create product "${product.title}": ${err}`);
  }

  const data = await res.json();
  console.log(`  + Product: ${product.title} (${data.id})`);
  return data;
}

async function uploadProductImages(productId, imagePaths) {
  const form = new FormData();

  for (const imgPath of imagePaths) {
    const buffer = await readFile(imgPath);
    const filename = imgPath.split('/').pop();
    const file = new File([buffer], filename, { type: 'image/jpeg' });
    form.append('files', file);
  }

  const res = await fetch(`${API_URL}/upload/product-images/${productId}`, {
    method: 'POST',
    body: form,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to upload images for product ${productId}: ${err}`);
  }

  const data = await res.json();
  console.log(`    uploaded ${data.count} images`);
  return data;
}

// ─── Image URLs (Unsplash - free, stable, product-relevant) ────

const IMAGES = {
  // Category icons
  cat_smartphones:  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
  cat_headphones:   'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
  cat_smartwatches: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
  cat_laptops:      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
  cat_tablets:      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',

  // Smartphones
  iphone_1:         'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=600&fit=crop',
  iphone_2:         'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop',
  samsung_1:        'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&h=600&fit=crop',
  samsung_2:        'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&h=600&fit=crop',
  pixel_1:          'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=600&fit=crop',
  pixel_2:          'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&h=600&fit=crop',

  // Headphones
  sony_hp_1:        'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&h=600&fit=crop',
  sony_hp_2:        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&h=600&fit=crop',
  airpods_1:        'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&h=600&fit=crop',
  airpods_2:        'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&h=600&fit=crop',
  bose_1:           'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop',
  bose_2:           'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&h=600&fit=crop',

  // Smartwatches
  applewatch_1:     'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&h=600&fit=crop',
  applewatch_2:     'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=800&h=600&fit=crop',
  galaxywatch_1:    'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&h=600&fit=crop',
  galaxywatch_2:    'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&h=600&fit=crop',
  garmin_1:         'https://images.unsplash.com/photo-1510017803434-a899398421b3?w=800&h=600&fit=crop',
  garmin_2:         'https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?w=800&h=600&fit=crop',

  // Laptops
  macbook_1:        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop',
  macbook_2:        'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&h=600&fit=crop',
  rog_1:            'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&h=600&fit=crop',
  rog_2:            'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800&h=600&fit=crop',
  dell_1:           'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&h=600&fit=crop',
  dell_2:           'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=600&fit=crop',

  // Tablets
  ipad_1:           'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=600&fit=crop',
  ipad_2:           'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&h=600&fit=crop',
  tabs9_1:          'https://images.unsplash.com/photo-1632882765546-1ee75f53becb?w=800&h=600&fit=crop',
  tabs9_2:          'https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?w=800&h=600&fit=crop',
  remarkable_1:     'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=800&h=600&fit=crop',
  remarkable_2:     'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=800&h=600&fit=crop',
};

// ─── Seed Data ──────────────────────────────────────────────────

const CATEGORIES = [
  { slug: 'smartphones',    name: 'Smartphones',    description: 'iPhones, Samsung Galaxy, Google Pixel and other mobile phones',       imageKey: 'cat_smartphones' },
  { slug: 'headphones',     name: 'Headphones',     description: 'Over-ear, in-ear, wireless and noise-cancelling headphones',          imageKey: 'cat_headphones' },
  { slug: 'smartwatches',   name: 'Smartwatches',   description: 'Apple Watch, Samsung Galaxy Watch, Garmin and fitness trackers',       imageKey: 'cat_smartwatches' },
  { slug: 'laptops',        name: 'Laptops',        description: 'MacBooks, gaming laptops, ultrabooks and workstations',                imageKey: 'cat_laptops' },
  { slug: 'tablets',        name: 'Tablets',         description: 'iPads, Samsung tablets, e-readers and drawing tablets',                imageKey: 'cat_tablets' },
];

function buildProducts(categoryMap) {
  const futureDate = (days) => new Date(Date.now() + days * 86400000).toISOString();

  return [
    // ── Smartphones ──
    {
      title: 'iPhone 15 Pro Max 256GB Natural Titanium',
      description: 'Brand new sealed iPhone 15 Pro Max. A17 Pro chip, 48MP camera system, titanium design. Unlocked, works with any carrier.',
      categoryId: categoryMap['smartphones'],
      condition: 'NEW',
      retailValue: 1199.00,
      entryFee: 5.00,
      endDate: futureDate(7),
      sellerId: 'seed-seller-001',
      sellerName: 'TechVault',
      specifications: { brand: 'Apple', model: 'iPhone 15 Pro Max', storage: '256GB', color: 'Natural Titanium', chip: 'A17 Pro', camera: '48MP' },
      imageKeys: ['iphone_1', 'iphone_2'],
    },
    {
      title: 'Samsung Galaxy S24 Ultra 512GB',
      description: 'Samsung Galaxy S24 Ultra with S Pen. 200MP camera, Snapdragon 8 Gen 3, titanium frame. Phantom Black.',
      categoryId: categoryMap['smartphones'],
      condition: 'NEW',
      retailValue: 1419.99,
      entryFee: 5.00,
      endDate: futureDate(6),
      sellerId: 'seed-seller-001',
      sellerName: 'TechVault',
      specifications: { brand: 'Samsung', model: 'Galaxy S24 Ultra', storage: '512GB', color: 'Phantom Black', chip: 'Snapdragon 8 Gen 3', camera: '200MP' },
      imageKeys: ['samsung_1', 'samsung_2'],
    },
    {
      title: 'Google Pixel 8 Pro 128GB Obsidian',
      description: 'Google Pixel 8 Pro with Tensor G3 chip. Best-in-class computational photography. 7 years of OS updates. Mint condition.',
      categoryId: categoryMap['smartphones'],
      condition: 'MINT',
      retailValue: 999.00,
      entryFee: 3.00,
      endDate: futureDate(5),
      sellerId: 'seed-seller-002',
      sellerName: 'MobileDeals',
      specifications: { brand: 'Google', model: 'Pixel 8 Pro', storage: '128GB', color: 'Obsidian', chip: 'Tensor G3', camera: '50MP' },
      imageKeys: ['pixel_1', 'pixel_2'],
    },

    // ── Headphones ──
    {
      title: 'Sony WH-1000XM5 Wireless',
      description: 'Industry-leading noise cancellation. 30-hour battery, multipoint connection, speak-to-chat. Sealed in box.',
      categoryId: categoryMap['headphones'],
      condition: 'NEW',
      retailValue: 399.99,
      entryFee: 2.00,
      endDate: futureDate(5),
      sellerId: 'seed-seller-001',
      sellerName: 'TechVault',
      specifications: { brand: 'Sony', model: 'WH-1000XM5', type: 'Over-ear', connectivity: 'Bluetooth 5.2', battery: '30 hours', anc: true },
      imageKeys: ['sony_hp_1', 'sony_hp_2'],
    },
    {
      title: 'AirPods Pro 2nd Gen USB-C',
      description: 'Apple AirPods Pro (2nd generation) with USB-C MagSafe case. Adaptive Audio, Conversation Awareness, IP54 rated.',
      categoryId: categoryMap['headphones'],
      condition: 'NEW',
      retailValue: 249.00,
      entryFee: 2.00,
      endDate: futureDate(4),
      sellerId: 'seed-seller-002',
      sellerName: 'MobileDeals',
      specifications: { brand: 'Apple', model: 'AirPods Pro 2', type: 'In-ear', connectivity: 'Bluetooth 5.3', battery: '6 hours (30 with case)', anc: true },
      imageKeys: ['airpods_1', 'airpods_2'],
    },
    {
      title: 'Bose QuietComfort Ultra Headphones',
      description: 'Bose QC Ultra with Immersive Audio and spatial sound. CustomTune technology. World-class noise cancellation. Like new.',
      categoryId: categoryMap['headphones'],
      condition: 'EXCELLENT',
      retailValue: 429.00,
      entryFee: 2.50,
      endDate: futureDate(6),
      sellerId: 'seed-seller-003',
      sellerName: 'AudioHub',
      specifications: { brand: 'Bose', model: 'QuietComfort Ultra', type: 'Over-ear', connectivity: 'Bluetooth 5.3', battery: '24 hours', anc: true },
      imageKeys: ['bose_1', 'bose_2'],
    },

    // ── Smartwatches ──
    {
      title: 'Apple Watch Ultra 2 Titanium',
      description: 'Apple Watch Ultra 2 with 49mm titanium case and Orange Alpine Loop. GPS + Cellular. Brightest Apple display ever at 3000 nits.',
      categoryId: categoryMap['smartwatches'],
      condition: 'NEW',
      retailValue: 799.00,
      entryFee: 3.00,
      endDate: futureDate(8),
      sellerId: 'seed-seller-001',
      sellerName: 'TechVault',
      specifications: { brand: 'Apple', model: 'Watch Ultra 2', size: '49mm', material: 'Titanium', connectivity: 'GPS + Cellular', waterResistance: '100m' },
      imageKeys: ['applewatch_1', 'applewatch_2'],
    },
    {
      title: 'Samsung Galaxy Watch 6 Classic 47mm',
      description: 'Galaxy Watch 6 Classic with rotating bezel. Silver stainless steel. BioActive sensor for body composition analysis.',
      categoryId: categoryMap['smartwatches'],
      condition: 'NEW',
      retailValue: 429.99,
      entryFee: 2.00,
      endDate: futureDate(5),
      sellerId: 'seed-seller-002',
      sellerName: 'MobileDeals',
      specifications: { brand: 'Samsung', model: 'Galaxy Watch 6 Classic', size: '47mm', material: 'Stainless Steel', os: 'Wear OS', battery: '425mAh' },
      imageKeys: ['galaxywatch_1', 'galaxywatch_2'],
    },
    {
      title: 'Garmin Fenix 7X Solar Edition',
      description: 'Garmin Fenix 7X Solar with Power Glass solar charging lens. 51mm DLC titanium. Up to 37 days battery with solar. Perfect for adventurers.',
      categoryId: categoryMap['smartwatches'],
      condition: 'EXCELLENT',
      retailValue: 999.99,
      entryFee: 4.00,
      endDate: futureDate(10),
      sellerId: 'seed-seller-003',
      sellerName: 'AudioHub',
      specifications: { brand: 'Garmin', model: 'Fenix 7X Solar', size: '51mm', material: 'DLC Titanium', battery: '37 days solar', gps: 'Multi-band GNSS' },
      imageKeys: ['garmin_1', 'garmin_2'],
    },

    // ── Laptops ──
    {
      title: 'MacBook Pro 16" M3 Max',
      description: 'MacBook Pro 16-inch with M3 Max chip, 36GB unified memory, 1TB SSD. Space Black. Sealed in box with Apple warranty.',
      categoryId: categoryMap['laptops'],
      condition: 'NEW',
      retailValue: 3499.00,
      entryFee: 10.00,
      endDate: futureDate(10),
      sellerId: 'seed-seller-001',
      sellerName: 'TechVault',
      specifications: { brand: 'Apple', model: 'MacBook Pro 16"', chip: 'M3 Max', ram: '36GB', storage: '1TB SSD', display: '16.2" Liquid Retina XDR' },
      imageKeys: ['macbook_1', 'macbook_2'],
    },
    {
      title: 'ASUS ROG Zephyrus G16 Gaming Laptop',
      description: 'ROG Zephyrus G16 with Intel Core i9-14900HX, RTX 4090, 32GB DDR5, 2TB SSD. 16" 240Hz OLED display. Beast for gaming.',
      categoryId: categoryMap['laptops'],
      condition: 'NEW',
      retailValue: 2999.99,
      entryFee: 8.00,
      endDate: futureDate(7),
      sellerId: 'seed-seller-002',
      sellerName: 'MobileDeals',
      specifications: { brand: 'ASUS', model: 'ROG Zephyrus G16', cpu: 'i9-14900HX', gpu: 'RTX 4090', ram: '32GB DDR5', storage: '2TB SSD' },
      imageKeys: ['rog_1', 'rog_2'],
    },
    {
      title: 'Dell XPS 15 OLED Touch',
      description: 'Dell XPS 15 with 15.6" 3.5K OLED touchscreen, Intel Core i7-13700H, 32GB RAM, 1TB SSD. Excellent for creative work.',
      categoryId: categoryMap['laptops'],
      condition: 'EXCELLENT',
      retailValue: 1899.99,
      entryFee: 5.00,
      endDate: futureDate(6),
      sellerId: 'seed-seller-003',
      sellerName: 'AudioHub',
      specifications: { brand: 'Dell', model: 'XPS 15 9530', cpu: 'i7-13700H', gpu: 'RTX 4060', ram: '32GB', storage: '1TB SSD', display: '15.6" 3.5K OLED' },
      imageKeys: ['dell_1', 'dell_2'],
    },

    // ── Tablets ──
    {
      title: 'iPad Pro 12.9" M2 256GB',
      description: 'iPad Pro 12.9-inch with M2 chip, Liquid Retina XDR display. WiFi + Cellular. Includes Apple Pencil 2 and Magic Keyboard.',
      categoryId: categoryMap['tablets'],
      condition: 'MINT',
      retailValue: 1399.00,
      entryFee: 5.00,
      endDate: futureDate(7),
      sellerId: 'seed-seller-001',
      sellerName: 'TechVault',
      specifications: { brand: 'Apple', model: 'iPad Pro 12.9" M2', storage: '256GB', display: '12.9" Liquid Retina XDR', chip: 'M2', connectivity: 'WiFi + Cellular' },
      imageKeys: ['ipad_1', 'ipad_2'],
    },
    {
      title: 'Samsung Galaxy Tab S9 Ultra',
      description: 'Galaxy Tab S9 Ultra with 14.6" Dynamic AMOLED 2X display. Snapdragon 8 Gen 2, 12GB RAM, 512GB. Comes with S Pen.',
      categoryId: categoryMap['tablets'],
      condition: 'NEW',
      retailValue: 1199.99,
      entryFee: 4.00,
      endDate: futureDate(8),
      sellerId: 'seed-seller-002',
      sellerName: 'MobileDeals',
      specifications: { brand: 'Samsung', model: 'Galaxy Tab S9 Ultra', storage: '512GB', ram: '12GB', display: '14.6" Dynamic AMOLED 2X', chip: 'Snapdragon 8 Gen 2' },
      imageKeys: ['tabs9_1', 'tabs9_2'],
    },
    {
      title: 'Remarkable 2 E-Ink Tablet',
      description: 'Remarkable 2 paper tablet. 10.3" e-ink display for distraction-free reading and writing. Includes Marker Plus pen and folio case.',
      categoryId: categoryMap['tablets'],
      condition: 'EXCELLENT',
      retailValue: 549.00,
      entryFee: 2.00,
      endDate: futureDate(5),
      sellerId: 'seed-seller-003',
      sellerName: 'AudioHub',
      specifications: { brand: 'Remarkable', model: 'Remarkable 2', display: '10.3" E-Ink', storage: '8GB', battery: '2 weeks', weight: '403g' },
      imageKeys: ['remarkable_1', 'remarkable_2'],
    },
  ];
}

// ─── Main ───────────────────────────────────────────────────────

async function main() {
  console.log(`\nSeeding Bidding Service at ${API_URL}\n`);

  // 1. Download all images (product-relevant from Unsplash)
  console.log('Downloading product images...');
  await mkdir(IMAGE_DIR, { recursive: true });

  const imagePromises = Object.entries(IMAGES).map(([key, url]) =>
    downloadImage(url, `${key}.jpg`)
  );
  await Promise.all(imagePromises);

  // 2. Create categories with relevant icons
  console.log('\nCreating categories...');
  const categoryMap = {};
  for (const cat of CATEGORIES) {
    const iconPath = join(IMAGE_DIR, `${cat.imageKey}.jpg`);
    const created = await createCategory(cat, iconPath);
    categoryMap[cat.slug] = created.id;
  }

  // 3. Create products and upload matching images
  console.log('\nCreating products and uploading images...');
  const products = buildProducts(categoryMap);

  for (const product of products) {
    const { imageKeys, ...productData } = product;
    const created = await createProduct(productData);

    // Upload the product-specific images
    const imagePaths = imageKeys.map((key) => join(IMAGE_DIR, `${key}.jpg`));
    await uploadProductImages(created.id, imagePaths);
  }

  // 4. Summary
  console.log('\n-----------------------------------------');
  console.log('Seed complete!');
  console.log(`  ${CATEGORIES.length} categories created`);
  console.log(`  ${products.length} products created`);
  console.log(`  ${products.length * 2} product images uploaded`);
  console.log(`\n  API: ${API_URL}`);
  console.log(`  Try: curl ${API_URL}/categories`);
  console.log(`  Try: curl ${API_URL}/products`);
  console.log('-----------------------------------------\n');
}

main().catch((err) => {
  console.error('\nSeed failed:', err.message);
  process.exit(1);
});

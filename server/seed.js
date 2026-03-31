require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');
const connectDB = require('./config/db');

const products = [
  { name: 'Ponni Raw Rice', description: 'Premium quality Ponni raw rice from Thanjavur', price: 52, category: 'Rice', stock: 500, unit: 'kg', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400' },
  { name: 'Ponni Boiled Rice', description: 'Traditional Ponni boiled rice, soft and aromatic', price: 48, category: 'Rice', stock: 400, unit: 'kg', image: 'https://images.unsplash.com/photo-1536304993881-ff86e0c9b4b5?w=400' },
  { name: 'Basmati Rice', description: 'Long grain premium Basmati rice', price: 95, category: 'Rice', stock: 300, unit: 'kg', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400' },
  { name: 'Sona Masoori Rice', description: 'Lightweight and aromatic Sona Masoori rice', price: 58, category: 'Rice', stock: 350, unit: 'kg', image: 'https://images.unsplash.com/photo-1536304993881-ff86e0c9b4b5?w=400' },
  { name: 'Idli Rice', description: 'Special rice for making soft idlis', price: 45, category: 'Rice', stock: 250, unit: 'kg', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400' },
  { name: 'Toor Dal', description: 'Premium quality toor dal (pigeon peas)', price: 120, category: 'Pulses', stock: 200, unit: 'kg', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400' },
  { name: 'Urad Dal', description: 'White urad dal for idli and dosa batter', price: 130, category: 'Pulses', stock: 150, unit: 'kg', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400' },
  { name: 'Chana Dal', description: 'Split chickpeas, perfect for curries', price: 90, category: 'Pulses', stock: 180, unit: 'kg', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400' },
  { name: 'Moong Dal', description: 'Green moong dal, nutritious and tasty', price: 110, category: 'Pulses', stock: 160, unit: 'kg', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400' },
  { name: 'Turmeric Powder', description: 'Pure turmeric powder from Erode', price: 180, category: 'Spices', stock: 100, unit: 'kg', image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400' },
  { name: 'Red Chilli Powder', description: 'Hot and spicy red chilli powder', price: 200, category: 'Spices', stock: 80, unit: 'kg', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400' },
  { name: 'Coriander Powder', description: 'Freshly ground coriander powder', price: 150, category: 'Spices', stock: 90, unit: 'kg', image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400' },
  { name: 'Groundnut Oil', description: 'Cold pressed groundnut oil, pure and natural', price: 180, category: 'Oil', stock: 200, unit: 'litre', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400' },
  { name: 'Coconut Oil', description: 'Pure coconut oil for cooking', price: 220, category: 'Oil', stock: 150, unit: 'litre', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400' },
  { name: 'Sugar', description: 'White refined sugar', price: 42, category: 'Groceries', stock: 500, unit: 'kg', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400' },
  { name: 'Salt', description: 'Iodized table salt', price: 20, category: 'Groceries', stock: 400, unit: 'kg', image: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=400' },
  { name: 'Wheat Flour (Atta)', description: 'Whole wheat flour for chapati and roti', price: 45, category: 'Groceries', stock: 300, unit: 'kg', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400' },
  { name: 'Semolina (Rava)', description: 'Fine semolina for upma and halwa', price: 38, category: 'Groceries', stock: 250, unit: 'kg', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400' }
];

const seed = async () => {
  await connectDB();
  await Product.deleteMany();
  await User.deleteMany({ email: 'admin@arasi.com' });

  await Product.insertMany(products);
  await User.create({
    name: 'Admin',
    email: 'admin@arasi.com',
    password: 'admin123',
    role: 'admin'
  });

  console.log('✅ Seed complete');
  console.log('Admin: admin@arasi.com / admin123');
  process.exit();
};

seed().catch(err => { console.error(err); process.exit(1); });

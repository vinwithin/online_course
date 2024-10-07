const mongoose = require('mongoose');
const Categories = require('../model/Category'); // Path ke model Category

// Koneksi ke database MongoDB
mongoose.connect('mongodb://localhost:27017/db_course')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB...', err));

const seedCategories = async () => {
  try {
    // Data kategori yang ingin dimasukkan
    const categories = [
      { name: 'Programming' },
      { name: 'Design' },
      { name: 'Marketing' },
      { name: 'Business' },
    ];

    // Menghapus data kategori yang ada (jika ingin clear database sebelumnya
    
    // Memasukkan data baru ke koleksi kategori
    await Categories.create(categories);
    
    console.log('Categories seeded successfully!');
    mongoose.connection.close(); // Menutup koneksi setelah seeding selesai
  } catch (error) {
    console.error('Error seeding categories:', error);
    mongoose.connection.close(); // Menutup koneksi jika terjadi error
  }
};

// Menjalankan seeder
seedCategories();

const { MongoClient } = require('mongodb');

async function migrateACRefrigeration() {
  const client = new MongoClient('mongodb://lovosisadmin:Digitech2030@145.79.12.143:27017/lovosisdb?authSource=admin');
  
  try {
    await client.connect();
    const db = client.db('lovosisdb');
    
    // 1. Find the Educational Trainer Kit NavbarCategory ID
    const educationalTrainerKit = await db.collection('navbarcategories').findOne({ 
      slug: 'educational-trainer-kit' 
    });
    
    // 2. Find the AC REFRIGERATION Category ID
    const acRefCategory = await db.collection('categories').findOne({ 
      slug: 'ac-refrigeration' 
    });
    
    if (!educationalTrainerKit || !acRefCategory) {
      console.error('Required categories not found');
      return;
    }
    
    console.log('Educational Trainer Kit ID:', educationalTrainerKit._id);
    console.log('AC REFRIGERATION Category ID:', acRefCategory._id);
    
    // 3. Find old AC REFRIGERATION NavbarCategory (to identify products)
    const oldACRefNavbar = await db.collection('navbarcategories').findOne({ 
      slug: 'ac-refrigeration' 
    });
    
    if (oldACRefNavbar) {
      // Show what products will be affected BEFORE updating
      const productsToUpdate = await db.collection('products').find({ 
        navbarCategoryId: oldACRefNavbar._id 
      }).toArray();
      
      console.log('Products that will be updated:');
      productsToUpdate.forEach(product => {
        console.log(`- ${product.name}`);
      });
      
      // 4. Update all products from old structure to new structure
      const result = await db.collection('products').updateMany(
        { navbarCategoryId: oldACRefNavbar._id }, // ONLY AC REFRIGERATION products
        { 
          $set: {
            navbarCategoryId: educationalTrainerKit._id,
            categoryId: acRefCategory._id
          }
        }
      );
      
      console.log(`Updated ${result.modifiedCount} products`);
      
      // 5. Delete the old NavbarCategory
      await db.collection('navbarcategories').deleteOne({ _id: oldACRefNavbar._id });
      console.log('Deleted old AC REFRIGERATION NavbarCategory');
    } else {
      console.log('Old AC REFRIGERATION NavbarCategory not found - migration may have already run');
    }
    
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await client.close();
  }
}

// Run the migration
migrateACRefrigeration();
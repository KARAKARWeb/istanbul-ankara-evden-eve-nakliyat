const fs = require('fs');
const path = require('path');

const REGIONS_DIR = path.join(__dirname, '../data/regions');

function fixSlug(text) {
  return text.toLowerCase()
    .replace(/İ/g, 'i')
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/\s+/g, '-');
}

async function fixAllRegions() {
  const files = fs.readdirSync(REGIONS_DIR).filter(f => f.endsWith('.json') && f !== '.gitkeep');
  
  console.log(`Found ${files.length} region files to fix...`);
  
  for (const file of files) {
    const filePath = path.join(REGIONS_DIR, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    // Slug'u düzelt
    const correctSlug = fixSlug(data.title);
    const correctId = correctSlug;
    
    // Eğer slug yanlışsa düzelt
    if (data.slug !== correctSlug || data.id !== correctId) {
      console.log(`Fixing: ${file}`);
      console.log(`  Old slug: ${data.slug}`);
      console.log(`  New slug: ${correctSlug}`);
      
      // Data'yı güncelle
      data.slug = correctSlug;
      data.id = correctId;
      data.updatedAt = new Date().toISOString();
      
      // Yeni dosya adı
      const newFileName = `${correctSlug}.json`;
      const newFilePath = path.join(REGIONS_DIR, newFileName);
      
      // Yeni dosyayı yaz
      fs.writeFileSync(newFilePath, JSON.stringify(data, null, 2), 'utf-8');
      
      // Eski dosyayı sil (eğer farklıysa)
      if (file !== newFileName) {
        fs.unlinkSync(filePath);
        console.log(`  Renamed: ${file} -> ${newFileName}`);
      }
    } else {
      console.log(`OK: ${file}`);
    }
  }
  
  console.log('\nAll regions fixed!');
}

fixAllRegions().catch(console.error);

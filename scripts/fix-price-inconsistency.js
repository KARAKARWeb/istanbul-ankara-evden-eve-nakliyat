const fs = require('fs');
const path = require('path');

const regionsDir = path.join(__dirname, '../data/regions');

// Tüm JSON dosyalarını oku
const files = fs.readdirSync(regionsDir).filter(f => f.endsWith('.json'));

let fixedCount = 0;
let errorCount = 0;

files.forEach(file => {
  const filePath = path.join(regionsDir, file);
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(content);
    
    // priceMin ve priceMax kontrolü
    if (data.priceMin && data.priceMax) {
      if (data.priceMin > data.priceMax) {
        console.log(`❌ HATA: ${file}`);
        console.log(`   priceMin: ${data.priceMin}, priceMax: ${data.priceMax}`);
        
        // Swap yap
        const temp = data.priceMin;
        data.priceMin = data.priceMax;
        data.priceMax = temp;
        
        // Kaydet
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
        
        console.log(`   ✅ Düzeltildi: priceMin: ${data.priceMin}, priceMax: ${data.priceMax}`);
        fixedCount++;
      }
    }
  } catch (error) {
    console.error(`❌ Hata (${file}):`, error.message);
    errorCount++;
  }
});

console.log('\n📊 Özet:');
console.log(`✅ Düzeltilen: ${fixedCount}`);
console.log(`❌ Hata: ${errorCount}`);
console.log(`📁 Toplam: ${files.length}`);

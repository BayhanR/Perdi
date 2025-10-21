const fs = require('fs');
const path = require('path');

const brandsDir = path.join(__dirname, '../public/brands');
const output = path.join(__dirname, '../components/data/brands.ts');

if (!fs.existsSync(brandsDir)) {
  console.log('markalar klasörü yok: public/brands');
  process.exit(1);
}

const files = fs.readdirSync(brandsDir).filter(
  file => ['.jpg', '.jpeg', '.png', '.svg', '.webp'].includes(path.extname(file).toLowerCase())
);

const brands = files.map((file, idx) => ({
  id: idx + 1,
  name: path.parse(file).name.replace(/[-_]/g, ' '),
  src: `/brands/${file}`
}));

const tsContent = `interface Brand {
  id: number
  name: string
  src: string
}

export const brandsData: Brand[] = ${JSON.stringify(brands, null, 2)}

export default brandsData
`;

fs.writeFileSync(output, tsContent);
console.log('brands.ts dosyası oluşturuldu,', brands.length, 'marka bulundu.');

const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../public/portfolio');
const output = path.join(__dirname, '../components/data/portfolio.ts');

if (!fs.existsSync(dir)) {
  console.log('portfolio klasörü yok: public/portfolio');
  process.exit(1);
}

const files = fs.readdirSync(dir).filter(
  file => ['.jpg', '.jpeg', '.png', '.svg', '.webp'].includes(path.extname(file).toLowerCase())
);

const items = files.map((file, idx) => ({
  id: idx + 1,
  name: path.parse(file).name.replace(/[-_]/g, ' '),
  src: `/portfolio/${file}`
}));

const tsContent = `interface PortfolioItem {
  id: number
  name: string
  src: string
}

export const portfolioData: PortfolioItem[] = ${JSON.stringify(items, null, 2)}

export default portfolioData
`;

fs.writeFileSync(output, tsContent);
console.log('portfolio.ts dosyası oluşturuldu,', items.length, 'görsel bulundu.');

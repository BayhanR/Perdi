const fs = require('fs');
const path = require('path');

function writeData(dirName, outFile) {
  const dir = path.join(__dirname, `../public/${dirName}`);
  const output = path.join(__dirname, `../components/${outFile}`);
  if (!fs.existsSync(dir)) {
    console.log(`Klasör yok: public/${dirName}`);
    return;
  }
  const files = fs.readdirSync(dir).filter(
    file => ['.jpg', '.jpeg', '.png', '.svg', '.webp'].includes(path.extname(file).toLowerCase())
  );
  const data = files.map((file, idx) => ({
    id: idx + 1,
    name: path.parse(file).name.replace(/[-_]/g, ' '),
    src: `/${dirName}/${file}`
  }));
  fs.writeFileSync(output, JSON.stringify(data, null, 2));
  console.log(`${outFile} dosyası güncellendi — ${data.length} dosya.`);
}

writeData('brands', 'brands-data.json');
writeData('portfolio', 'portfolio-data.json');
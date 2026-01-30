const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data/resources-items.json', 'utf8'));
const names = [...new Set(data.items.map(i => i.name).filter(n => n))].sort();
fs.writeFileSync('public/data/item-names.json', JSON.stringify(names));
console.log('Extracted ' + names.length + ' unique item names');

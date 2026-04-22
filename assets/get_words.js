const fs = require('fs');
const file = 'c:\\Users\\Brayan Rodriguez\\Desktop\\ARCHIVOS BRAYAN\\trabajos ANTIGRAVITY\\PAGINA WEB DE ELECTRONICA\\script.js';
const text = fs.readFileSync(file, 'utf8');
const words = text.match(/\S*[^\x00-\x7F]\S*/g) || [];
const unique = [...new Set(words)];
unique.forEach(w => console.log(w));

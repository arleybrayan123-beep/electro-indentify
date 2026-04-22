const fs = require('fs');

let content = fs.readFileSync('script.js', 'utf8');

content = content.replace(/"imageUrl": "assets\/capacitores\/(main_[^\.]+)\.svg"/g, (match, p1) => {
    if (p1 === 'main_var') {
        return `"imageUrl": "assets/capacitores/main_var_ai.jpg"`;
    } else {
        return `"imageUrl": "assets/capacitores/${p1}_ai.png"`;
    }
});

fs.writeFileSync('script.js', content);

let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/script\.js\?v=\d+\.\d+\.\d+/g, 'script.js?v=6.3.0');
fs.writeFileSync('index.html', html);

console.log("Updated script.js to point to AI PNGs and bumped index.html version!");

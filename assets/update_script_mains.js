const fs = require('fs');

let content = fs.readFileSync('script.js', 'utf8');

content = content.replace(/"imageUrl": "data:image\/svg\+xml.*"/g, (match) => {
    if (match.includes("Cer%C3%A1mico")) return `"imageUrl": "assets/capacitores/main_cer.svg"`;
    if (match.includes("Electrol%C3%ADtico")) return `"imageUrl": "assets/capacitores/main_elec.svg"`;
    if (match.includes("Tantalio")) return `"imageUrl": "assets/capacitores/main_tan.svg"`;
    if (match.includes("Poli%C3%A9ster")) return `"imageUrl": "assets/capacitores/main_poly.svg"`;
    if (match.includes("Mica")) return `"imageUrl": "assets/capacitores/main_mica.svg"`;
    if (match.includes("Supercapacitor")) return `"imageUrl": "assets/capacitores/main_super.svg"`;
    if (match.includes("Variable")) return `"imageUrl": "assets/capacitores/main_var.svg"`;
    return match;
});

fs.writeFileSync('script.js', content);

let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/script\.js\?v=\d+\.\d+\.\d+/g, 'script.js?v=6.2.0');
fs.writeFileSync('index.html', html);

console.log("Updated script.js and index.html version!");

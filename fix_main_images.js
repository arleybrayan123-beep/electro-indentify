const fs = require('fs');

let content = fs.readFileSync('script.js', 'utf8');

// The object keys are not quoted in script.js (imageUrl: instead of "imageUrl":)
content = content.replace(/imageUrl:\s*"data:image\/svg\+xml[^"]+"/g, (match) => {
    if (match.includes("Cer%C3%A1mico")) return `imageUrl: "assets/capacitores/main_cer_ai.png"`;
    if (match.includes("Electrol%C3%ADtico")) return `imageUrl: "assets/capacitores/main_elec_ai.png"`;
    if (match.includes("Tantalio")) return `imageUrl: "assets/capacitores/main_tan_ai.png"`;
    if (match.includes("Poli%C3%A9ster")) return `imageUrl: "assets/capacitores/main_poly_ai.png"`;
    if (match.includes("Mica")) return `imageUrl: "assets/capacitores/main_mica_ai.png"`;
    if (match.includes("Supercapacitor")) return `imageUrl: "assets/capacitores/main_super_ai.png"`;
    if (match.includes("Variable")) return `imageUrl: "assets/capacitores/main_var_ai.jpg"`;

    // In case there's a fallback needed
    return match;
});

// Write it back
fs.writeFileSync('script.js', content);

// Also update index.html to force browser cache refresh
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/script\.js\?v=\d+\.\d+\.\d+/g, 'script.js?v=7.0.0');
fs.writeFileSync('index.html', html);

console.log("Successfully replaced unquoted imageUrls and bumped index version to 7.0.0");

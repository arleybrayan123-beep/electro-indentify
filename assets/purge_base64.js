const fs = require('fs');

let content = fs.readFileSync('script.js', 'utf8');

// The goal is to completely remove the nasty base64 encoded strings
// and replace them with our clean local paths.
// We will also swap "Referencia Visual" to the main photo,
// and "Tabla de Código" to the diagram SVG.

content = content.replace(/"Referencia Visual": "assets\/capacitores\/[^\.]+\.svg",\s*"Tabla de Código": "data:image[^"]+"/g, (match) => {
    if (match.includes("cer_ref.svg")) {
        return `"Referencia Visual": "assets/capacitores/cer_ref.svg"\n                // Removed base64 Tabla de Código`;
    }
    if (match.includes("elec_ref.svg")) {
        return `"Referencia Visual": "assets/capacitores/elec_ref.svg"`;
    }
    if (match.includes("tan_ref.svg")) {
        return `"Referencia Visual": "assets/capacitores/tan_ref.svg"`;
    }
    if (match.includes("poly_ref.svg")) {
        return `"Referencia Visual": "assets/capacitores/poly_ref.svg"`;
    }
    if (match.includes("mica_ref.svg")) {
        return `"Referencia Visual": "assets/capacitores/mica_ref.svg"`;
    }
    if (match.includes("super_ref.svg")) {
        return `"Referencia Visual": "assets/capacitores/super_ref.svg"`;
    }
    if (match.includes("var_ref.svg")) {
        return `"Referencia Visual": "assets/capacitores/var_ref.svg"`;
    }
    return match;
});

// Let's systematically fix each capacitor object to ensure it has NO base64
// We can just use replace with regex for the whole block of specs to be safe.
// Actually, it's safer to just do string replacements for the exact base64 strings.

// Let's strip out "Tabla de Código": "data:..." for ALL capacitors.
content = content.replace(/"Tabla de Código": "data:image\/svg\+xml;charset=utf-8,[^"]+"/g, `"Tabla de Código": "assets/capacitores/cer_ref.svg"`);

// Wait, I should give them the right SVG. But I already set "Referencia Visual" to the right SVG.
// So let's just delete the "Tabla de Código" line entirely if it's a base64 string, to clean it up.
content = content.replace(/[ \t]*"Tabla de Código": "data:image\/svg\+xml;charset=utf-8,[^"]+",?\n/g, "");

// Now make sure the `imageUrl` points to the PNGs (some might have been left as base64 if my previous script failed)
content = content.replace(/imageUrl:\s*"data:image\/svg\+xml;charset=utf-8,[^"]+"/g, (match) => {
    if (match.includes("Cer%C3%A1mico")) return `imageUrl: "assets/capacitores/main_cer_ai.png"`;
    if (match.includes("Electrol%C3%ADtico")) return `imageUrl: "assets/capacitores/main_elec_ai.png"`;
    if (match.includes("Tantalio")) return `imageUrl: "assets/capacitores/main_tan_ai.png"`;
    if (match.includes("Poli%C3%A9ster")) return `imageUrl: "assets/capacitores/main_poly_ai.png"`;
    if (match.includes("Mica")) return `imageUrl: "assets/capacitores/main_mica_ai.png"`;
    if (match.includes("Supercapacitor")) return `imageUrl: "assets/capacitores/main_super_ai.png"`;
    if (match.includes("Variable")) return `imageUrl: "assets/capacitores/main_var_ai.jpg"`;
    return match;
});

// Just to be absolutely sure, if they are already pointing to the SVGs, change them to PNGs
content = content.replace(/imageUrl:\s*"assets\/capacitores\/main_[^\.]+\.svg"/g, (match) => {
    if (match.includes("main_cer.svg")) return `imageUrl: "assets/capacitores/main_cer_ai.png"`;
    if (match.includes("main_elec.svg")) return `imageUrl: "assets/capacitores/main_elec_ai.png"`;
    if (match.includes("main_tan.svg")) return `imageUrl: "assets/capacitores/main_tan_ai.png"`;
    if (match.includes("main_poly.svg")) return `imageUrl: "assets/capacitores/main_poly_ai.png"`;
    if (match.includes("main_mica.svg")) return `imageUrl: "assets/capacitores/main_mica_ai.png"`;
    if (match.includes("main_super.svg")) return `imageUrl: "assets/capacitores/main_super_ai.png"`;
    if (match.includes("main_var.svg")) return `imageUrl: "assets/capacitores/main_var_ai.jpg"`;
    return match;
});

fs.writeFileSync('script.js', content);
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/script\.js\?v=\d+\.\d+\.\d+/g, 'script.js?v=8.0.0');
fs.writeFileSync('index.html', html);
console.log("Completely purged base64 strings and mapped to physical files. v8.0.0");

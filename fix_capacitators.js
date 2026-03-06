const fs = require('fs');
const path = require('path');
const https = require('https');

const dir = path.join(__dirname, 'assets', 'capacitores');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

// 1. GENERATE SVGs for Visual References
const svgTemplate = (title, lines) => {
    let textElements = lines.map((line, i) => {
        const y = 80 + (i * 30);
        const color = line.color || "#aaaaaa";
        const size = line.size || "16";
        const weight = line.bold ? "bold" : "normal";
        return `<text x="50%" y="${y}" fill="${color}" font-family="sans-serif" font-size="${size}" font-weight="${weight}" text-anchor="middle">${line.text}</text>`;
    }).join('\n  ');

    return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250">
  <rect width="100%" height="100%" fill="#0d0f17" rx="15" ry="15"/>
  <rect x="2" y="2" width="396" height="246" fill="none" stroke="#00f2ff" stroke-width="2" rx="15" ry="15" opacity="0.3"/>
  <text x="50%" y="40" fill="#00f2ff" font-family="sans-serif" font-size="20" font-weight="bold" text-anchor="middle">${title}</text>
  <line x1="50" y1="55" x2="350" y2="55" stroke="#00f2ff" stroke-width="1" opacity="0.5"/>
  ${textElements}
</svg>`;
};

const svgs = {
    'cer_ref.svg': svgTemplate("Lectura Capacitor Cerámico", [
        { text: "Ejemplo de Código: 104", color: "#ffffff", size: "18", bold: true },
        { text: "1º Dígito: 1" },
        { text: "2º Dígito: 0" },
        { text: "3º Dígito (Multiplicador): 0000" },
        { text: "Resultado: 100,000 pF", color: "#00ffaa", bold: true },
        { text: "Equivalencia: 100 nF = 0.1 µF", color: "#00ffaa", bold: true }
    ]),
    'elec_ref.svg': svgTemplate("Polaridad: Electrolítico", [
        { text: "Símbolo Técnico:  + |[ --  -", color: "#ffffff" },
        { text: "Identificación Física:", color: "#00f2ff", size: "18", bold: true },
        { text: "1. Franja lateral gris/blanca indica Negativo (-)" },
        { text: "2. Terminal (pata) más corta es Negativo (-)" },
        { text: "3. Terminal (pata) más larga es Positivo (+)" },
        { text: "¡ATENCIÓN! Invertirlo puede causar explosión", color: "#ff4444", bold: true }
    ]),
    'tan_ref.svg': svgTemplate("Polaridad: Tantalio", [
        { text: "Símbolo Técnico:  + |[ --  -", color: "#ffffff" },
        { text: "Identificación Física:", color: "#00f2ff", size: "18", bold: true },
        { text: "1. Posee una banda o raya en un extremo" },
        { text: "2. La banda indica el polo POSITIVO (+)", color: "#00ffaa", bold: true },
        { text: "3. A diferencia del electrolítico de aluminio" },
        { text: "Muy sensibles a inversión de polaridad", color: "#ff4444" }
    ]),
    'poly_ref.svg': svgTemplate("Lectura Capacitor Poliéster", [
        { text: "Ejemplo: 473 J 100V", color: "#ffffff", size: "18", bold: true },
        { text: "Valor: 47 × 10³ pF = 47,000 pF (47 nF)" },
        { text: "Tolerancia (J): ±5%", color: "#00ffaa" },
        { text: "(K = ±10%, M = ±20%)", size: "14" },
        { text: "Voltaje Máximo: 100V (Corriente Continua)" },
        { text: "No tiene polaridad", color: "#00f2ff", bold: true }
    ]),
    'mica_ref.svg': svgTemplate("Datos: Capacitor de Mica", [
        { text: "Características Principales", color: "#00f2ff", size: "18", bold: true },
        { text: "Dieléctrico: Mica natural (mineral)" },
        { text: "Alta Precisión: Tolerancias de ±1% a ±5%", color: "#00ffaa" },
        { text: "Uso: Osciladores y Radiofrecuencia (RF)" },
        { text: "Código: Impreso en pF o puntos de color" },
        { text: "No polarizado - Soporta altos voltajes" }
    ]),
    'super_ref.svg': svgTemplate("Datos: Supercapacitor (EDLC)", [
        { text: "Características Principales", color: "#00f2ff", size: "18", bold: true },
        { text: "Capacitancia Extrema: Medida en Faradios (F)", color: "#00ffaa" },
        { text: "Capacidad típica: 1F hasta 3000F" },
        { text: "Voltaje Máx: Muy bajo (típicamente 2.7V)", color: "#ff4444" },
        { text: "Uso: Respaldo de memoria, UPS en miniatura" },
        { text: "¡ATENCIÓN! Componente Polarizado (+/-)" }
    ]),
    'var_ref.svg': svgTemplate("Datos: Capacitor Variable", [
        { text: "Símbolo con flecha diagonal", color: "#ffffff" },
        { text: "Ajuste de Capacitancia", color: "#00f2ff", size: "18", bold: true },
        { text: "Rango típico: Trimmers de 2pF a 60pF" },
        { text: "Uso: Sintonización de Radios AM/FM" },
        { text: "Ajuste: Girar tornillo superior suavemente" },
        { text: "Se usa destornillador cerámico/plástico", color: "#00ffaa" }
    ])
};

Object.keys(svgs).forEach(filename => {
    fs.writeFileSync(path.join(dir, filename), svgs[filename]);
    console.log(`Created ${filename}`);
});

// 2. DOWNLOAD Main Images (Working Wikipedia Links)
const imagesToDownload = [
    // Correctly structured Wikimedia API links for raw image
    ['https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Ceramic_capacitors.jpg/320px-Ceramic_capacitors.jpg', 'main_cer.jpg'],
    ['https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Electrolytic_capacitors.jpg/320px-Electrolytic_capacitors.jpg', 'main_elec.jpg'],
    ['https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Tantalum_capacitors.jpg/320px-Tantalum_capacitors.jpg', 'main_tan.jpg'],
    ['https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Polyester_film_capacitor.jpg/320px-Polyester_film_capacitor.jpg', 'main_poly.jpg'],
    ['https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Mica_capacitor.jpg/320px-Mica_capacitor.jpg', 'main_mica.jpg'],
    ['https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Supercapacitors.jpg/320px-Supercapacitors.jpg', 'main_super.jpg'],
    ['https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Bc547_variable_condenser.jpg/320px-Bc547_variable_condenser.jpg', 'main_var.jpg']
];

function download(url, filename) {
    return new Promise((resolve, reject) => {
        const dest = path.join(dir, filename);
        const file = fs.createWriteStream(dest);

        // Randomize user agent to avoid 429
        const agents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2.1 Safari/605.1.15',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0'
        ];
        const ua = agents[Math.floor(Math.random() * agents.length)];

        https.get(url, { headers: { 'User-Agent': ua } }, (res) => {
            if (res.statusCode === 200) {
                res.pipe(file);
                file.on('finish', () => file.close(resolve));
            } else {
                reject(new Error(`${res.statusCode}`));
            }
        }).on('error', reject);
    });
}

async function runDownloads() {
    for (const img of imagesToDownload) {
        try {
            await download(img[0], img[1]);
            console.log(`Downloaded ${img[1]}`);
        } catch (e) {
            console.error(`Failed ${img[1]}: ${e.message}. Using fallback SVG.`);
            // Create a fallback text image just in case
            const fallbackStr = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="100%" height="100%" fill="#12141c" /><text x="50%" y="50%" fill="#00f2ff" font-family="sans-serif" font-size="20" text-anchor="middle">${img[1].replace('.jpg', '')}</text></svg>`;
            fs.writeFileSync(path.join(dir, img[1].replace('.jpg', '.svg')), fallbackStr);
        }
        await new Promise(r => setTimeout(r, 2000)); // 2 sec delay to avoid 429
    }
}

runDownloads().then(() => {
    // 3. Modifying script.js directly with the local paths
    let scriptContent = fs.readFileSync('script.js', 'utf8');

    // Replace reference dataURIs with the local SVG relative paths
    scriptContent = scriptContent.replace(/"Referencia Visual": "data:image\/svg\+xml.*"/g, (match) => {
        // Very brute-force mapping based on content
        if (match.includes("Cer%C3%A1mico")) return `"Referencia Visual": "assets/capacitores/cer_ref.svg"`;
        if (match.includes("Electrol%C3%ADtico")) return `"Referencia Visual": "assets/capacitores/elec_ref.svg"`;
        if (match.includes("Tantalio")) return `"Referencia Visual": "assets/capacitores/tan_ref.svg"`;
        if (match.includes("Poli%C3%A9ster")) return `"Referencia Visual": "assets/capacitores/poly_ref.svg"`;
        if (match.includes("Mica")) return `"Referencia Visual": "assets/capacitores/mica_ref.svg"`;
        if (match.includes("Supercapacitor")) return `"Referencia Visual": "assets/capacitores/super_ref.svg"`;
        if (match.includes("Variable")) return `"Referencia Visual": "assets/capacitores/var_ref.svg"`;
        return match;
    });

    // Also update main imageUrl placeholders
    scriptContent = scriptContent.replace(/"imageUrl": "data:image\/svg\+xml.*"/g, (match) => {
        if (match.includes("Cer%C3%A1mico")) return `"imageUrl": "assets/capacitores/main_cer.jpg"`;
        if (match.includes("Electrol%C3%ADtico")) return `"imageUrl": "assets/capacitores/main_elec.jpg"`;
        if (match.includes("Tantalio")) return `"imageUrl": "assets/capacitores/main_tan.jpg"`;
        if (match.includes("Poli%C3%A9ster")) return `"imageUrl": "assets/capacitores/main_poly.jpg"`;
        if (match.includes("Mica")) return `"imageUrl": "assets/capacitores/main_mica.jpg"`;
        if (match.includes("Supercapacitor")) return `"imageUrl": "assets/capacitores/main_super.jpg"`;
        if (match.includes("Variable")) return `"imageUrl": "assets/capacitores/main_var.jpg"`;
        return match;
    });

    // We also need to fix `isImageUrl` to simply allow `.svg` or `.jpg` regardless of `http`
    scriptContent = scriptContent.replace(
        /const isImageUrl = .*;/g,
        `const isImageUrl = strVal.match(/\\.(jpg|jpeg|png|gif|svg|webp)(\\?.*)?$/i) !== null;`
    );

    fs.writeFileSync('script.js', scriptContent);
    console.log("script.js updated correctly with robust asset paths.");
});

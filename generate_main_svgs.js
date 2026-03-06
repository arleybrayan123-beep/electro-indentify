const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'assets', 'capacitores');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

// Background that looks nice in dark mode
const bg = `<rect width="100%" height="100%" fill="#0a0c10" rx="10" />`;

const svgs = {
    'main_cer.svg': `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      ${bg}
      <!-- Leads -->
      <path d="M 75,100 L 75,180" stroke="#8892b0" stroke-width="4" stroke-linecap="round"/>
      <path d="M 125,100 L 125,180" stroke="#8892b0" stroke-width="4" stroke-linecap="round"/>
      <!-- Body -->
      <circle cx="100" cy="80" r="45" fill="#e6a836" stroke="#c0821b" stroke-width="3"/>
      <!-- Text -->
      <text x="100" y="75" font-family="sans-serif" font-size="22" font-weight="bold" fill="#4d3204" text-anchor="middle">104</text>
      <text x="100" y="95" font-family="sans-serif" font-size="14" font-weight="bold" fill="#4d3204" text-anchor="middle">Z5U</text>
      <!-- Glow effect for neon aesthetic -->
      <circle cx="100" cy="80" r="47" fill="none" stroke="#e6a836" stroke-width="1" opacity="0.3"/>
    </svg>`,

    'main_elec.svg': `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      ${bg}
      <!-- Leads -->
      <path d="M 80,140 L 80,185" stroke="#8892b0" stroke-width="5" stroke-linecap="round"/>
      <path d="M 120,140 L 120,165" stroke="#8892b0" stroke-width="5" stroke-linecap="round"/>
      <!-- Body cylinder -->
      <rect x="60" y="30" width="80" height="110" rx="10" fill="#1b2a4a" stroke="#4a6ebf" stroke-width="3"/>
      <!-- Top aluminum cap -->
      <ellipse cx="100" cy="30" rx="40" ry="15" fill="#c0c7d6" stroke="#4a6ebf" stroke-width="2"/>
      <path d="M 85,25 L 115,35 M 115,25 L 85,35" stroke="#8892b0" stroke-width="2"/>
      <!-- Negative stripe -->
      <rect x="120" y="35" width="20" height="100" fill="#e0e0e0" opacity="0.8"/>
      <text x="130" y="80" font-family="sans-serif" font-size="20" font-weight="bold" fill="#000" text-anchor="middle">-</text>
      <text x="130" y="100" font-family="sans-serif" font-size="20" font-weight="bold" fill="#000" text-anchor="middle">-</text>
      <text x="130" y="120" font-family="sans-serif" font-size="20" font-weight="bold" fill="#000" text-anchor="middle">-</text>
      <!-- Text -->
      <text x="90" y="80" font-family="sans-serif" font-size="16" fill="#fff" text-anchor="middle">1000µF</text>
      <text x="90" y="105" font-family="sans-serif" font-size="14" fill="#a0b5e8" text-anchor="middle">50V</text>
    </svg>`,

    'main_tan.svg': `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      ${bg}
      <!-- Leads -->
      <path d="M 85,130 L 85,170" stroke="#8892b0" stroke-width="4" stroke-linecap="round"/>
      <path d="M 115,130 L 115,170" stroke="#8892b0" stroke-width="4" stroke-linecap="round"/>
      <!-- Body (Teardrop) -->
      <path d="M 100,20 C 140,20 150,70 145,110 C 140,150 60,150 55,110 C 50,70 60,20 100,20 Z" fill="#d4c13a" stroke="#b09e25" stroke-width="3"/>
      <!-- Polarity band (+) -->
      <path d="M 60,110 L 60,40 M 65,115 L 65,35" stroke="#82720d" stroke-width="4" opacity="0.6"/>
      <text x="65" y="80" font-family="sans-serif" font-size="20" font-weight="bold" fill="#544907" text-anchor="middle">+</text>
      <!-- Text -->
      <text x="105" y="80" font-family="sans-serif" font-size="18" font-weight="bold" fill="#544907" text-anchor="middle">106</text>
      <text x="105" y="105" font-family="sans-serif" font-size="14" font-weight="bold" fill="#544907" text-anchor="middle">16V</text>
    </svg>`,

    'main_poly.svg': `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      ${bg}
      <!-- Leads -->
      <path d="M 70,140 L 70,180" stroke="#8892b0" stroke-width="5" stroke-linecap="round"/>
      <path d="M 130,140 L 130,180" stroke="#8892b0" stroke-width="5" stroke-linecap="round"/>
      <!-- Body box -->
      <rect x="40" y="40" width="120" height="100" rx="8" fill="#bc3e3e" stroke="#8a2a2a" stroke-width="3"/>
      <!-- Text -->
      <text x="100" y="80" font-family="sans-serif" font-size="24" font-weight="bold" fill="#ffcccc" text-anchor="middle">474J</text>
      <text x="100" y="110" font-family="sans-serif" font-size="18" fill="#ffcccc" text-anchor="middle">400V</text>
    </svg>`,

    'main_mica.svg': `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      ${bg}
      <!-- Leads -->
      <path d="M 70,130 L 60,180" stroke="#8892b0" stroke-width="5" stroke-linecap="round"/>
      <path d="M 130,130 L 140,180" stroke="#8892b0" stroke-width="5" stroke-linecap="round"/>
      <!-- Body dipped -->
      <rect x="40" y="30" width="120" height="100" rx="20" fill="#6d3920" stroke="#4a2412" stroke-width="4"/>
      <!-- Text -->
      <text x="100" y="70" font-family="sans-serif" font-size="20" font-weight="bold" fill="#d9ad95" text-anchor="middle">Silver Mica</text>
      <text x="100" y="100" font-family="sans-serif" font-size="24" font-weight="bold" fill="#d9ad95" text-anchor="middle">100pF</text>
      <text x="100" y="120" font-family="sans-serif" font-size="14" fill="#d9ad95" text-anchor="middle">500V ±1%</text>
    </svg>`,

    'main_super.svg': `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      ${bg}
      <!-- Leads -->
      <path d="M 80,160 L 80,190" stroke="#8892b0" stroke-width="6" stroke-linecap="round"/>
      <path d="M 120,160 L 120,175" stroke="#8892b0" stroke-width="6" stroke-linecap="round"/>
      <!-- Body Coin (Top down perspective) -->
      <circle cx="100" cy="90" r="70" fill="#303540" stroke="#60677a" stroke-width="5"/>
      <circle cx="100" cy="90" r="60" fill="#1b1e26" stroke="#404655" stroke-width="2"/>
      <!-- Text -->
      <text x="100" y="75" font-family="sans-serif" font-size="20" font-weight="bold" fill="#fff" text-anchor="middle">EDLC</text>
      <text x="100" y="105" font-family="sans-serif" font-size="28" font-weight="bold" fill="#a0b5e8" text-anchor="middle">1.0 F</text>
      <text x="100" y="130" font-family="sans-serif" font-size="16" fill="#7d8ea6" text-anchor="middle">5.5V</text>
    </svg>`,

    'main_var.svg': `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      ${bg}
      <!-- Base plastic -->
      <rect x="60" y="60" width="80" height="80" fill="#cc3333" stroke="#992222" stroke-width="3" rx="5"/>
      <!-- Outer Metal -->
      <circle cx="100" cy="100" r="30" fill="#e0e0e0" stroke="#888" stroke-width="3"/>
      <!-- Inner Screw -->
      <circle cx="100" cy="100" r="15" fill="#f5f5f5" stroke="#666" stroke-width="2"/>
      <!-- Cross for screwdriver -->
      <path d="M 90,100 L 110,100 M 100,90 L 100,110" stroke="#888" stroke-width="3" stroke-linecap="round"/>
      <!-- Metal terminals -->
      <path d="M 100,60 L 100,45" stroke="#e0e0e0" stroke-width="12" stroke-linecap="square"/>
      <path d="M 100,140 L 100,155" stroke="#e0e0e0" stroke-width="12" stroke-linecap="square"/>
    </svg>`
};

Object.keys(svgs).forEach(filename => {
    fs.writeFileSync(path.join(dir, filename), svgs[filename]);
    console.log(`Created ${filename}`);
});

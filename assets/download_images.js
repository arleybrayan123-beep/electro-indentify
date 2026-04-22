const https = require('https');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'assets', 'capacitors');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

// Format: [URL, filename]
const imagesToDownload = [
    // --- MAIN IMAGES ---
    ['https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Ceramic_capacitors.jpg/320px-Ceramic_capacitors.jpg', 'main_cer.jpg'],
    ['https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Electrolytic_capacitors.jpg/320px-Electrolytic_capacitors.jpg', 'main_elec.jpg'],
    ['https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Tantalum_capacitors.jpg/320px-Tantalum_capacitors.jpg', 'main_tan.jpg'],
    ['https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Polyester_film_capacitor.jpg/320px-Polyester_film_capacitor.jpg', 'main_poly.jpg'],
    ['https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Mica_capacitor.jpg/320px-Mica_capacitor.jpg', 'main_mica.jpg'],
    ['https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Supercapacitors.jpg/320px-Supercapacitors.jpg', 'main_super.jpg'],
    ['https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Bc547_variable_condenser.jpg/320px-Bc547_variable_condenser.jpg', 'main_var.jpg'],

    // --- REFERENCE IMAGES ---
    ['https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Capacitor_codigos.png/320px-Capacitor_codigos.png', 'ref_cer_tabla.png'],
    ['https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Mylar_capacitor_codes.svg/320px-Mylar_capacitor_codes.svg.png', 'ref_cer_tabla_2.png'],
    ['https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Capacitor_electrolytic_polarity.jpg/320px-Capacitor_electrolytic_polarity.jpg', 'ref_elec_polaridad.jpg'],
    ['https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/TantalumCapacitorSymbol.svg/320px-TantalumCapacitorSymbol.svg.png', 'ref_tan_simbolo.png'],
    ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Supercapacitor_diagram.svg/320px-Supercapacitor_diagram.svg.png', 'ref_super_diagrama.png'],
    ['https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Variable_capacitor_symbol.svg/200px-Variable_capacitor_symbol.svg.png', 'ref_var_simbolo.png']
];

function download(url, filename) {
    return new Promise((resolve, reject) => {
        const dest = path.join(dir, filename);
        if (fs.existsSync(dest)) {
            console.log(`Skipping (already exists): ${filename}`);
            return resolve();
        }

        const file = fs.createWriteStream(dest);
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
            }
        };
        https.get(url, options, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                });
            } else if (response.statusCode === 301 || response.statusCode === 302) {
                download(response.headers.location, filename).then(resolve).catch(reject);
            } else {
                reject(new Error(`Failed with ${response.statusCode} - ${url}`));
            }
        }).on('error', (err) => {
            fs.unlink(dest, () => { });
            reject(err);
        });
    });
}

async function run() {
    for (const img of imagesToDownload) {
        try {
            await download(img[0], img[1]);
            console.log(`Success: ${img[1]}`);
        } catch (e) {
            console.error(`Error downloading ${img[1]}: ${e.message}`);
        }
        await new Promise(r => setTimeout(r, 500)); // sleep
    }
}
run();

const https = require('https');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'assets', 'capacitores');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

const images = {
    'main_cer.jpg': 'https://cdn.sparkfun.com/r/300-300/assets/parts/3/0/1/4/10416-01.jpg',
    'main_elec.jpg': 'https://cdn.sparkfun.com/r/300-300/assets/parts/4/5/1/5/09371-01.jpg',
    'main_tan.jpg': 'https://media.digikey.com/Photos/AVX%20Photos/TAP105K035SRW.jpg',
    'main_poly.jpg': 'https://media.digikey.com/Photos/Panasonic%20Photos/ECQ-E2105KF.jpg',
    'main_mica.jpg': 'https://media.digikey.com/Photos/Cornell%20Dubilier%20Photos/CD15FD101JO3F.jpg',
    'main_super.jpg': 'https://cdn.sparkfun.com/r/300-300/assets/parts/3/9/8/08107-02.jpg',
    'main_var.jpg': 'https://media.digikey.com/Photos/Murata%20Photos/TZC3P200A110R00.jpg'
};

function download(url, filename) {
    return new Promise((resolve, reject) => {
        const dest = path.join(dir, filename);
        const file = fs.createWriteStream(dest);
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            if (res.statusCode === 200) {
                res.pipe(file);
                file.on('finish', () => file.close(resolve));
            } else {
                reject(new Error(`Status Code: ${res.statusCode}`));
            }
        }).on('error', reject);
    });
}

(async function () {
    for (const [filename, url] of Object.entries(images)) {
        try {
            await download(url, filename);
            console.log(`Success: ${filename}`);
        } catch (e) {
            console.error(`Failed ${filename}: ${e.message}`);
        }
    }
})();

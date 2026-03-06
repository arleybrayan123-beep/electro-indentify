const https = require('https');

const urls = [
    "https://m.media-amazon.com/images/I/51A1i2-e6-L._AC_SL1000_.jpg",
    "https://www.zonamaker.com/images/electronica/componentes/capacitores/cap_cer_tabla.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Mylar_capacitor_codes.svg/320px-Mylar_capacitor_codes.svg.png",
    "https://m.media-amazon.com/images/I/61J2m0C6-OL._AC_SL1500_.jpg",
    "https://i.pinimg.com/736x/8a/a5/d2/8aa5d2c77df51fb264cacf43bd64d509--electronics-components-electrical-electronics.jpg",
    "https://m.media-amazon.com/images/I/41D8zD5fP9L._AC_.jpg",
    "https://es.farnell.com/wcsstore/ExtendedSitesCatalogAssetStore/cms/asset/images/americas/common/article165-2019-12-16-17-06-25-303.png",
    "https://m.media-amazon.com/images/I/61P1YInmE-L._AC_SL1000_.jpg",
    "https://www.inventable.eu/media/171_Capacitors_codes/Capacitor-codes-all-1.png",
    "https://m.media-amazon.com/images/I/51fTf9m-E9L._AC_SL1000_.jpg",
    "https://www.ecured.cu/images/thumb/a/ad/CondensadorMica_2.jpg/300px-CondensadorMica_2.jpg",
    "https://m.media-amazon.com/images/I/61C2lAt3qPL._AC_SL1100_.jpg",
    "https://www.tecsaqro.com.mx/wp-content/uploads/2019/10/Supercapacitor-construction-y-structure.jpg",
    "https://m.media-amazon.com/images/I/61S6hUoO8iL._AC_SL1000_.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Variable_capacitor_symbol.svg/200px-Variable_capacitor_symbol.svg.png"
];

urls.forEach(url => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        console.log(`[${res.statusCode}] ${url} - ${res.headers['content-type']}`);
    }).on('error', (e) => {
        console.error(`[ERR] ${url} - ${e.message}`);
    });
});

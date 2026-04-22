const fs = require('fs');

const file = 'c:\\Users\\Brayan Rodriguez\\Desktop\\ARCHIVOS BRAYAN\\trabajos ANTIGRAVITY\\PAGINA WEB DE ELECTRONICA\\script.js';
let content = fs.readFileSync(file, 'utf8');

const replacements = [
    [/anal(.?)gicos/g, 'analógicos'],
    [/an(.?)logo/gi, 'análogo'],
    [/an(.?)logos/gi, 'análogos'],
    [/a(.?)n /g, 'aún '],
    [/Aseg(.?)rese/g, 'Asegúrese'],
    [/cat(.?)logo/gi, 'catálogo'],
    [/comunicaci(.?)n/gi, 'comunicación'],
    [/Depuraci(.?)n/g, 'Depuración'],
    [/depuraci(.?)n/g, 'depuración'],
    [/dise(.?)o/gi, 'diseño'],
    [/el(.?)ctricas/gi, 'eléctricas'],
    [/electr(.?)nica/gi, 'electrónica'],
    [/estaci(.?)n/gi, 'estación'],
    [/est(.?)ndar/gi, 'estándar'],
    [/f(.?)cil/g, 'fácil'],
    [/habilitaci(.?)n/gi, 'habilitación'],
    [/inversi(.?)n/gi, 'inversión'],
    [/l(.?)gicas/gi, 'lógicas'],
    [/l(.?)gicos/gi, 'lógicos'],
    [/l(.?)mite/g, 'límite'],
    [/m(.?)s\b/g, 'más'],
    [/medici(.?)n/gi, 'medición'],
    [/m(.?)ltiples/g, 'múltiples'],
    [/mult(.?)metro/gi, 'multímetro'],
    [/mult(.?)metros/gi, 'multímetros'],
    [/port(.?)til/gi, 'portátil'],
    [/precisi(.?)n/gi, 'precisión'],
    [/programaci(.?)n/gi, 'programación'],
    [/protecci(.?)n/gi, 'protección'],
    [/r(.?)pida/gi, 'rápida'],
    [/r(.?)pidamente/g, 'rápidamente'],
    [/r(.?)pidas/gi, 'rápidas'],
    [/r(.?)pido/g, 'rápido'],
    [/resoluci(.?)n/gi, 'resolución'],
    [/se(.?)al\b/gi, 'señal'],
    [/se(.?)ales/gi, 'señales'],
    [/subcategor(.?)as/gi, 'subcategorías'],
    [/subcategor(.?)a\b/gi, 'subcategoría'],
    [/t(.?)cnica/gi, 'técnica'],
    [/t(.?)cnicos/gi, 'técnicos'],
    [/t(.?)rmico/g, 'térmico'],
    [/tensi(.?)n/g, 'tensión'],
    [/visi(.?)n/gi, 'visión'],
    [/Nivel\s*2(.*?)Nivel\s*3/g, 'Nivel 2 -> Nivel 3'],
    [/Nivel\s*3(.*?)Nivel\s*2/g, 'Nivel 3 -> Nivel 2']
];

replacements.forEach(([pattern, replacement]) => {
    content = content.replace(pattern, (match) => {
        if (match[0] === match[0].toUpperCase()) {
            return replacement.charAt(0).toUpperCase() + replacement.slice(1);
        }
        return replacement;
    });
});

fs.writeFileSync(file, content, 'utf8');
console.log('Codificación reparada con éxito en Node.js.');

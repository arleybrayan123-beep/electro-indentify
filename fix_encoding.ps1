$file = 'c:\Users\Brayan Rodriguez\Desktop\ARCHIVOS BRAYAN\trabajos ANTIGRAVITY\PAGINA WEB DE ELECTRONICA\script.js'
$content = Get-Content $file -Raw

$replacements = @(
    @('\banal.gicos\b', 'analógicos'),
    @('\ban.logo\b', 'análogo'),
    @('\ban.logos\b', 'análogos'),
    @('\ba.n\b', 'aún'),
    @('\bAseg.rese\b', 'Asegúrese'),
    @('\bcat.logo\b', 'catálogo'),
    @('\bcomunicaci.n\b', 'comunicación'),
    @('\bDepuraci.n\b', 'Depuración'),
    @('\bdepuraci.n\b', 'depuración'),
    @('\bdise.o\b', 'diseño'),
    @('\bel.ctricas\b', 'eléctricas'),
    @('\belectr.nica\b', 'electrónica'),
    @('\bElectr.nica\b', 'Electrónica'),
    @('\bElectr.nicos\b', 'Electrónicos'),
    @('\bestaci.n\b', 'estación'),
    @('\bEstaci.n\b', 'Estación'),
    @('\bEst.ndar\b', 'Estándar'),
    @('\bf.cil\b', 'fácil'),
    @('\bHabilitaci.n\b', 'Habilitación'),
    @('\binversi.n\b', 'inversión'),
    @('\bl.gicas\b', 'lógicas'),
    @('\bL.gicos\b', 'Lógicos'),
    @('\bl.gicos\b', 'lógicos'),
    @('\bl.mite\b', 'límite'),
    @('\bm.s\b', 'más'),
    @('\bMedici.n\b', 'Medición'),
    @('\bm.ltiples\b', 'múltiples'),
    @('\bMult.metro\b', 'Multímetro'),
    @('\bMult.metros\b', 'Multímetros'),
    @('\bport.til\b', 'portátil'),
    @('\bPort.til\b', 'Portátil'),
    @('\bprecisi.n\b', 'precisión'),
    @('\bprogramaci.n\b', 'programación'),
    @('\bprotecci.n\b', 'protección'),
    @('\br.pida\b', 'rápida'),
    @('\br.pidamente\b', 'rápidamente'),
    @('\bR.pidas\b', 'Rápidas'),
    @('\br.pidas\b', 'rápidas'),
    @('\br.pido\b', 'rápido'),
    @('\bresoluci.n\b', 'resolución'),
    @('\bse.al\b', 'señal'),
    @('\bse.ales\b', 'señales'),
    @('\bSe.ales\b', 'Señales'),
    @('\bSubcategor.as\b', 'Subcategorías'),
    @('\bsubcategor.as\b', 'subcategorías'),
    @('\bsubcategor.a\b', 'subcategoría'),
    @('\bt.cnica\b', 'técnica'),
    @('\bT.cnicos\b', 'Técnicos'),
    @('\bt.rmico\b', 'térmico'),
    @('\btensi.n\b', 'tensión'),
    @('\bvisi.n\b', 'visión'),
    @('Nivel 2 . Nivel 3', 'Nivel 2 -> Nivel 3'),
    @('Nivel 3 . Nivel 2', 'Nivel 3 -> Nivel 2')
)

foreach ($pair in $replacements) {
    # Using case-sensitive Regex Replace so we don't accidentally mess up case
    $content = [regex]::Replace($content, $pair[0], $pair[1])
}

Set-Content -Path $file -Value $content -Encoding UTF8

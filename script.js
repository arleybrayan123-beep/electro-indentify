document.addEventListener('DOMContentLoaded', () => {
    // --- Referencias a Páginas y Elementos Principales ---
    const landingPage = document.getElementById('landing-page');
    const subcategoryPage = document.getElementById('subcategory-page');
    const catalogPage = document.getElementById('catalog-page');
    const calculatorsPage = document.getElementById('calculators-page');
    const converterPage = document.getElementById('converter-page');
    const favoritesPage = document.getElementById('favorites-page');
    const pinoutsPage = document.getElementById('pinouts-page');
    const catalogGrid = document.getElementById('catalog-grid');
    
    // Referencias Visor de Pinouts (Se agregan globales para que renderChip no falle)
    const pinTabs = document.querySelectorAll('.pin-tab');
    const pinoutViewer = document.getElementById('pinout-viewer');

    const navCalculators = document.getElementById('nav-calculators');
    const backToHomeFromCalc = document.getElementById('back-to-home-from-calc');
    const backToHomeFromConv = document.getElementById('back-to-home-from-conv');
    const backToHome = document.getElementById('back-to-home');
    const backToHomeSub = document.getElementById('back-to-home-from-sub');
    const backToHomeFromFav = document.getElementById('back-to-home-from-favorites');
    const backToHomeFromPinouts = document.getElementById('back-to-home-from-pinouts');
    const backToSub = document.getElementById('back-to-sub');

    // --- Navegación General con Hash Routing ---
    function showPage(page) {
        // Al ocultar páginas, nos aseguramos de que el scroll vuelva arriba
        [landingPage, subcategoryPage, catalogPage, calculatorsPage, converterPage, favoritesPage, pinoutsPage].forEach(p => {
            if (p) p.classList.add('hidden-page');
        });
        if (page) {
            page.classList.remove('hidden-page');
            window.scrollTo(0, 0);
        }
    }

    function handleRouting() {
        const hash = window.location.hash;
        console.log("Navegando a hash:", hash);

        if (!hash || hash === '' || hash === '#') {
            showPage(landingPage);
            return;
        }

        if (hash === '#calculadora') {
            showPage(calculatorsPage);
        } else if (hash === '#convertidor') {
            showPage(converterPage);
        } else if (hash === '#favoritos') {
            if(window.renderFavorites) window.renderFavorites();
            showPage(favoritesPage);
        } else if (hash === '#pinouts') {
            showPage(pinoutsPage);
        } else if (hash === '#academia') {
            const academiaPage = document.getElementById('academia-page');
            if(academiaPage) showPage(academiaPage);
        } else if (hash === '#camera') {
            const photoTab = document.querySelector('.tab-btn[data-tab="photo"]');
            if (photoTab) photoTab.click();
        } else if (hash.startsWith('#aparatos')) {
            const parts = hash.split('/');
            if (parts.length > 1) {
                const subName = decodeURIComponent(parts[1]);
                openCategory(subName, "Aparatos Electrónicos", false); // false = no empujar hash de nuevo
            } else {
                renderSubcategories("Aparatos Electrónicos");
                showPage(subcategoryPage);
            }
        } else if (hash.startsWith('#circuitos')) {
            const parts = hash.split('/');
            if (parts.length > 1) {
                const subName = decodeURIComponent(parts[1]);
                openCategory(subName, "Circuitos Integrados", false);
            } else {
                renderSubcategories("Circuitos Integrados");
                showPage(subcategoryPage);
            }
        } else {
            showPage(landingPage);
        }
    }

    // Escuchar cambios en el hash
    window.addEventListener('hashchange', handleRouting);

    if (navCalculators) {
        navCalculators.addEventListener('click', (e) => {
            e.preventDefault();
            // Solo abrir nueva pestaña si NO estamos ya en la página de calculadoras
            if (window.location.hash !== '#calculadora') {
                const url = window.location.pathname + '#calculadora';
                window.open(url, '_blank');
            } else {
                showPage(calculatorsPage);
            }
        });
    }

    const backBtnsArr = [backToHomeFromCalc, backToHome, backToHomeSub, backToHomeFromConv, backToHomeFromFav, backToHomeFromPinouts];
    backBtnsArr.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                window.location.hash = ''; // Limpiar hash para volver al inicio real
                showPage(landingPage);
            });
        }
    });

    // --- Lógica Menú Desplegable ---
    const menuToggle = document.getElementById('menu-toggle');
    const dropdownMenu = document.getElementById('dropdown-menu');
    
    if(menuToggle && dropdownMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('hidden-dropdown');
        });
        
        document.addEventListener('click', (e) => {
            if (!dropdownMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                dropdownMenu.classList.add('hidden-dropdown');
            }
        });
    }

    // --- Lógica Convertidor de Unidades ---
    const convValue = document.getElementById('conv-value');
    const convPrefix = document.getElementById('conv-prefix');
    const convUnit = document.getElementById('conv-unit');
    
    function updateConverter() {
        if(!convValue) return;
        const val = parseFloat(convValue.value) || 0;
        const prefixMult = parseFloat(convPrefix.value) || 1;
        const unit = convUnit.value;
        const baseValue = val * prefixMult;
        
        const formatRes = (mult) => {
            if(baseValue === 0) return "0 " + unit;
            let res = baseValue / mult;
            if(Math.abs(res) < 1e-15) return "0 " + unit;
            return Number(res.toPrecision(7)).toString() + " " + unit; 
        };
        
        document.getElementById('res-p').innerText = formatRes(1e-12);
        document.getElementById('res-n').innerText = formatRes(1e-9);
        document.getElementById('res-u').innerText = formatRes(1e-6);
        document.getElementById('res-m').innerText = formatRes(1e-3);
        document.getElementById('res-base').innerText = formatRes(1);
        document.getElementById('res-k').innerText = formatRes(1e3);
        document.getElementById('res-M').innerText = formatRes(1e6);
        document.getElementById('res-G').innerText = formatRes(1e9);
        
        document.querySelectorAll('.conv-res-item').forEach(el => el.classList.remove('highlight-res'));
        const prefixes = ['1e-12','1e-9','1e-6','1e-3','1','1e3','1e6','1e9'];
        const pIndex = prefixes.indexOf(convPrefix.value);
        if(pIndex >= 0) {
            document.querySelectorAll('.conv-res-item')[pIndex].classList.add('highlight-res');
        }
    }

    if(convValue) {
        [convValue, convPrefix, convUnit].forEach(el => el.addEventListener('input', updateConverter));
        updateConverter();
    }

    // --- Lógica Ley de Ohm ---
    const ohmV = document.getElementById('ohm-v');
    const ohmI = document.getElementById('ohm-i');
    const ohmR = document.getElementById('ohm-r');
    const ohmResult = document.getElementById('ohm-result');
    const clearOhm = document.getElementById('clear-ohm');

    function calculateOhm() {
        const v = parseFloat(ohmV.value);
        const i = parseFloat(ohmI.value);
        const r = parseFloat(ohmR.value);

        if (!isNaN(v) && !isNaN(i)) {
            const res = v / i;
            ohmR.value = res.toFixed(2);
            ohmResult.innerHTML = `Resistencia (R) = <strong>${res.toFixed(2)} Ω</strong>`;
        } else if (!isNaN(v) && !isNaN(r)) {
            const res = v / r;
            ohmI.value = res.toFixed(2);
            ohmResult.innerHTML = `Corriente (I) = <strong>${res.toFixed(2)} A</strong>`;
        } else if (!isNaN(i) && !isNaN(r)) {
            const res = i * r;
            ohmV.value = res.toFixed(2);
            ohmResult.innerHTML = `Voltaje (V) = <strong>${res.toFixed(2)} V</strong>`;
        }
    }

    [ohmV, ohmI, ohmR].forEach(input => {
        input.addEventListener('input', calculateOhm);
    });

    clearOhm.addEventListener('click', () => {
        ohmV.value = '';
        ohmI.value = '';
        ohmR.value = '';
        ohmResult.innerText = 'Ingresa dos valores para calcular el tercero';
    });

    // --- Lógica Código de Colores ---
    const colors = [
        { name: 'Negro', color: '#000000', value: 0, mult: 1, tol: null },
        { name: 'Marrón', color: '#8B4513', value: 1, mult: 10, tol: 1 },
        { name: 'Rojo', color: '#FF0000', value: 2, mult: 100, tol: 2 },
        { name: 'Naranja', color: '#FFA500', value: 3, mult: 1000, tol: null },
        { name: 'Amarillo', color: '#FFFF00', value: 4, mult: 10000, tol: null },
        { name: 'Verde', color: '#008000', value: 5, mult: 100000, tol: 0.5 },
        { name: 'Azul', color: '#0000FF', value: 6, mult: 1000000, tol: 0.25 },
        { name: 'Violeta', color: '#EE82EE', value: 7, mult: 10000000, tol: 0.1 },
        { name: 'Gris', color: '#808080', value: 8, mult: 100000000, tol: 0.05 },
        { name: 'Blanco', color: '#FFFFFF', value: 9, mult: 1000000000, tol: null },
        { name: 'Oro', color: '#D4AF37', value: null, mult: 0.1, tol: 5 },
        { name: 'Plata', color: '#C0C0C0', value: null, mult: 0.01, tol: 10 }
    ];

    const b1S = document.getElementById('band1-select');
    const b2S = document.getElementById('band2-select');
    const b3S = document.getElementById('band3-select');
    const b4S = document.getElementById('band4-select');
    const resResult = document.getElementById('resistor-result');

    function initResistor() {
        colors.forEach((c, index) => {
            if (c.value !== null) {
                b1S.add(new Option(c.name, index));
                b2S.add(new Option(c.name, index));
            }
            if (c.mult !== null) b3S.add(new Option(c.name, index));
            if (c.tol !== null) b4S.add(new Option(c.name + ' (' + c.tol + '%)', index));
        });

        // Valores iniciales (1k 5%)
        b1S.value = 1; // Marrón
        b2S.value = 0; // Negro
        b3S.value = 2; // Rojo (x100)
        b4S.value = 10; // Oro (5%)
        updateResistor();
    }

    function updateResistor() {
        const c1 = colors[b1S.value];
        const c2 = colors[b2S.value];
        const c3 = colors[b3S.value];
        const c4 = colors[b4S.value];

        document.getElementById('b1').style.backgroundColor = c1.color;
        document.getElementById('b2').style.backgroundColor = c2.color;
        document.getElementById('b3').style.backgroundColor = c3.color;
        document.getElementById('b4').style.backgroundColor = c4.color;

        const val = (c1.value * 10 + c2.value) * c3.mult;
        let displayVal = val >= 1000000 ? (val / 1000000).toFixed(1) + ' M' :
            val >= 1000 ? (val / 1000).toFixed(1) + ' k' : val;

        resResult.innerHTML = `<strong>${displayVal} Ω ± ${c4.tol}%</strong>`;
    }

    [b1S, b2S, b3S, b4S].forEach(s => s.addEventListener('change', updateResistor));
    initResistor();

    const themeToggle = document.getElementById('theme-toggle');
    const toggleIcon = themeToggle ? themeToggle.querySelector('i') : null;

    if (!themeToggle || !toggleIcon) {
        console.warn("Theme toggle components not found");
        return; // Detener ejecución de esta parte si faltan elementos
    }

    // Check local storage or match media
    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggleIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            toggleIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            toggleIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });


    const header = document.getElementById('header');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const searchByText = document.getElementById('search-by-text');
    const searchByPhoto = document.getElementById('search-by-photo');
    const mainSearch = document.getElementById('main-search');
    const searchTrigger = document.getElementById('search-trigger');

    window.equipmentData = [
        {
            name: "Osciloscopio Digital Rigol",
            ref: "DS1054Z",
            category: "Osciloscopios",
            mainCategory: "Aparatos Electrónicos",
            desc: "Excelente para laboratorios educativos y aficionados. Muy popular por su hacking potencial.",
            videoUrl: "https://www.youtube.com/watch?v=-fYAJQ9uCUg",
            imageUrl: "assets/osciloscopios/rigol_ds1054z.png",
            specs: {
                "Ancho de Banda": "50 MHz",
                "Canales": "4 análogos",
                "Velocidad de Muestreo": "1 GSa/s",
                "Memoria": "12 Mpts (24 Mpts opc.)",
                "Pantalla": "7 pulgadas WVGA (800x480)"
            },
            usageSteps: [
                "Conecte la sonda al terminal de entrada BNC del canal 1.",
                "Conecte la punta al terminal de prueba de compensación (0.5Vpp).",
                "Ajuste el mando 'Vertical' y 'Horizontal' para centrar la señal.",
                "Capture y analice los valores de Vpp y frecuencia en pantalla."
            ],
            type: "Digital Storage Oscilloscope (DSO)"
        },
        {
            name: "Osciloscopio Tektronix",
            ref: "TBS1052B",
            category: "Osciloscopios",
            mainCategory: "Aparatos Electrónicos",
            desc: "Instrumento robusto y preciso para entornos industriales y educativos.",
            videoUrl: "https://www.youtube.com/watch?v=TCCdMGBlSko",
            imageUrl: "https://www.mouser.com/images/tektronixinc/lrg/tbs1000b_edu.jpg",
            specs: {
                "Ancho de Banda": "50 MHz",
                "Canales": "2 análogos",
                "Velocidad de Muestreo": "1 GSa/s",
                "Contador": "Frecuencímetro de doble canal"
            },
            usageSteps: [
                "Instale la sonda en el canal activo (CH1 o CH2).",
                "Presione 'PROBE CHECK' para compensar la sonda rápidamente.",
                "Use los mandos físicos para ajustar escala y posición.",
                "Observe la señal estable; use 'Single' para capturar transitorios."
            ],
            type: "Digital Storage Oscilloscope (DSO)"
        },
        {
            name: "Osciloscopio Siglent",
            ref: "SDS1202X-E",
            category: "Osciloscopios",
            mainCategory: "Aparatos Electrónicos",
            desc: "Tecnología Super Phosphor (SPO) de alta velocidad.",
            videoUrl: "https://www.youtube.com/watch?v=zQsrt3ND0JM",
            imageUrl: "https://www.saelig.com/miva/graphics/00000001/sds1202x-e_1280x787.jpg",
            specs: {
                "Ancho de Banda": "200 MHz",
                "Canales": "2 análogos",
                "Velocidad de Muestreo": "1 GSa/s",
                "Tasa de Captura": "100.000 wfm/s"
            },
            usageSteps: [
                "Conecte la sonda de alta frecuencia al terminal BNC.",
                "Realice el auto-ajuste para detectar el tipo de señal.",
                "Navegue por el menú para configurar la decodificación.",
                "Analice formas de onda complejas con tecnología SPO."
            ],
            type: "Super Phosphor Oscilloscope (SPO)"
        },
        {
            name: "Osciloscopio Portátil Hantek",
            ref: "2D42",
            category: "Osciloscopios",
            mainCategory: "Aparatos Electrónicos",
            desc: "Instrumento multifunción para servicio técnico de campo.",
            videoUrl: "https://www.youtube.com/watch?v=u2tUSq8z67s",
            imageUrl: "assets/osciloscopios/hantek_2d42.png",
            specs: {
                "Ancho de Banda": "40 MHz",
                "Canales": "2 análogos",
                "DMM": "Multímetro Digital True RMS",
                "Generador": "Generador de formas de onda arbitrarias"
            },
            usageSteps: [
                "Conecte las puntas según el modo (DSO o DMM).",
                "Utilice la función AUTO para pruebas de campo rápidas.",
                "Ajuste el generador para inyectar señal si es necesario.",
                "Guarde los resultados en la memoria interna."
            ],
            type: "Handheld DSO / DMM"
        },
        {
            name: "Multímetro Digital Fluke",
            ref: "117",
            category: "Multímetros Digitales",
            mainCategory: "Aparatos Electrónicos",
            desc: "Diseñado para electricistas profesionales con tecnología VoltAlert.",
            videoUrl: "https://www.youtube.com/watch?v=uMSFrv1UVMc",
            imageUrl: "https://www.fluke-direct.com/images/products/cache/fluke/117/main/fluke-117-digital-multimeter-with-non-contact-voltage.jpg",
            specs: {
                "Precisión DC": "0.5%",
                "Cuentas": "6000",
                "Seguridad": "CAT III 600 V",
                "VoltAlert": "Detección de voltaje sin contacto"
            },
            usageSteps: [
                "Gire el selector a la magnitud deseada.",
                "Use la función 'Auto-V/LoZ' para evitar lecturas falsas.",
                "Acerque la punta superior a un cable para usar VoltAlert.",
                "Presione el botón de luz para entornos oscuros."
            ],
            type: "Multímetro Digital de Electricista"
        },
        {
            name: "Multímetro Industrial Fluke",
            ref: "87V",
            category: "Multímetros Digitales",
            mainCategory: "Aparatos Electrónicos",
            desc: "El estándar de la industria para entornos robustos y señales complejas. Medición de verdadero valor eficaz (True RMS).",
            videoUrl: "https://www.youtube.com/watch?v=Ai3PR9oUO7s",
            imageUrl: "assets/multimetros/fluke_87v.png",
            specs: {
                "Precisión DC": "0.05%",
                "Resolución": "20000 cuentas",
                "Filtro paso bajo": "Medición precisa en variadores",
                "Temperatura": "Termopar tipo K integrado"
            },
            usageSteps: [
                "Seleccione la magnitud y ajuste manual/automático con RANGE.",
                "Usa MIN/MAX para capturar lecturas extremas intermitentes.",
                "Presiona el botón amarillo para acceder a las funciones secundarias.",
                "Regula el Pitido de continuidad ajustando umbrales rápidos."
            ],
            type: "Multímetro Industrial True-RMS"
        },
        {
            name: "Multímetro de Banco/Laboratorio UNI-T",
            ref: "UT61E+",
            category: "Multímetros Digitales",
            mainCategory: "Aparatos Electrónicos",
            desc: "Excelente relación calidad-precio con alta precisión y conexión a PC para adquisición de datos.",
            videoUrl: "https://www.youtube.com/watch?v=zIFYZ5AwDUI",
            imageUrl: "assets/multimetros/unit_ut61e.jpg",
            specs: {
                "Precisión DC": "0.05%",
                "Resolución": "22000 cuentas",
                "Conectividad": "Cable USB aislado ópticamente",
                "True RMS": "Ancho de banda 45Hz~10kHz"
            },
            usageSteps: [
                "Encienda el dispositivo seleccionando la variable en el dial.",
                "Conecte el cable óptico en la ranura para registrar datos en PC.",
                "Presione 'PEAK' para retener picos transitorios rápidos.",
                "Use el software UNI-T para visualizar gráficas en tiempo real."
            ],
            type: "Multímetro True-RMS + Datalogger"
        },
        {
            name: "Multímetro Avanzado Brymen",
            ref: "BM869s",
            category: "Multímetros Digitales",
            mainCategory: "Aparatos Electrónicos",
            desc: "Alta gama y precisión, doble display y especificaciones superlativas para electrónica de potencia.",
            videoUrl: "https://www.youtube.com/watch?v=aSrq3UJt4qU",
            imageUrl: "https://brymen.eu/wp-content/uploads/2021/12/BM869s.jpg",
            specs: {
                "Precisión DC": "0.02%",
                "Cuentas": "500.000 / 50.000",
                "Pantalla": "Doble display con barra analógica",
                "Temperatura": "T1, T2 y diferencial T1-T2"
            },
            usageSteps: [
                "Configure la doble lectura pulsando el botón SELECT.",
                "Conecte ambos termopares para observar deltas (T1-T2).",
                "Utilice la alta resolución para calibraciones finas.",
                "Habilite el filtro VFD para medidas de variadores de motor."
            ],
            type: "Multímetro de Precisión Doble Display"
        },
        {
            name: "Multímetro de Electricista Klein Tools",
            ref: "MM400",
            category: "Multímetros Digitales",
            mainCategory: "Aparatos Electrónicos",
            desc: "Multímetro hiper-resistente, fácil de usar y diseñado desde la perspectiva del trabajo de campo.",
            videoUrl: "https://www.youtube.com/watch?v=3Se87lYg5O0",
            imageUrl: "https://data.kleintools.com/sites/all/product_assets/png/klein/mm400.png",
            specs: {
                "Cuentas": "4000",
                "Durabilidad": "Caídas desde 1 m (3.3 pies)",
                "Medición Acústica": "Continuidad Audible Rápida",
                "Seguridad": "CAT III 600 V"
            },
            usageSteps: [
                "Asegúrese de apagar el circuito antes de medir resistencias.",
                "Ajuste el selector a la señal de tensión o corriente requerida.",
                "Use 'HOLD' para mantener lectura en lugares sin visión.",
                "Use los soportes traseros para las puntas durante el almacenamiento."
            ],
            type: "Multímetro de Campo/Trabajo Pesado"
        },
        {
            name: "Fuente de Poder DC Lineal Programable Rigol",
            ref: "DP832",
            category: "Fuentes de Poder",
            mainCategory: "Aparatos Electrónicos",
            desc: "Estándar en laboratorios académicos e industriales por su diseño lineal de bajo ruido y tres canales aislados.",
            videoUrl: "https://www.youtube.com/watch?v=we2FwdLs8a8",
            imageUrl: "https://assets.testequity.com/te1/product-images/large/Rigol-DP832-Front.jpg",
            specs: {
                "Canales": "3 (30V/3A, 30V/3A, 5V/3A)",
                "Potencia Total": "195 vatios",
                "Ruido y Ripple": "<350 \u03bcVrms / 2 mVpp",
                "Conectividad": "USB, LAN, RS232"
            },
            usageSteps: [
                "Presione el botón del canal deseado (CH1, CH2 o CH3) para seleccionarlo.",
                "Use el teclado numérico o la perilla para fijar el voltaje deseado.",
                "Ajuste el límite de corriente para proteger su circuito bajo prueba.",
                "Presione 'ON/OFF' correspondiente al canal para energizar la salida."
            ],
            type: "Fuente DC Lineal Programable"
        },
        {
            name: "Fuente de Poder DC Alta Gama Keysight",
            ref: "E36312A",
            category: "Fuentes de Poder",
            mainCategory: "Aparatos Electrónicos",
            desc: "Fuente de alimentación premium de precisión extrema, con pantalla a color y mediciones de baja corriente.",
            videoUrl: "https://www.youtube.com/watch?v=WWTmAzL5pnw",
            imageUrl: "https://assets.testequity.com/te1/product-images/large/E36312A-500.jpg",
            specs: {
                "Salidas": "3 aisladas (6V/5A, 25V/1A, 25V/1A)",
                "Potencia": "80 vatios",
                "Medición": "Datalogger integrado (Voltaje y Corriente)",
                "Precisión": "Programación 0.03%"
            },
            usageSteps: [
                "Encienda el equipo. La pantalla mostrará el estado de todos los canales.",
                "Seleccione si usar canales independientes o combinados (Serie/Paralelo).",
                "Configure secuencias de salida en el panel frontal si es necesario.",
                "Utilice la medición de 4 hilos (Sense) traseros para cables largos."
            ],
            type: "Fuente DC de Precisión Serie E36300"
        },
        {
            name: "Fuente de Poder Variable Korad",
            ref: "KA3005P",
            category: "Fuentes de Poder",
            mainCategory: "Aparatos Electrónicos",
            desc: "Opción accesible, robusta y con memoria para uso en reparaciones, hobbies y proyectos DIY. Control por USB.",
            videoUrl: "https://www.youtube.com/watch?v=yksjM7GAdQQ",
            imageUrl: "https://www.sra-solder.com/pub/media/catalog/product/cache/de8ef5f7c7ec061290cae8f47c68f0eb/k/o/korad-ka3005p-main_1.jpg",
            specs: {
                "Rango": "0-30V / 0-5A",
                "Tipo": "Lineal Un Solo Canal",
                "Memorias": "4 programables externas (M1-M4)",
                "Ruido": "<1 mVrms"
            },
            usageSteps: [
                "Mantenga presionado el botón de voltaje y regule la perilla.",
                "Ajuste el límite de corriente OCP para evitar cortocircuitos.",
                "Guarde configuraciones comunes manteniendo pulsado M1, M2, etc.",
                "Pulse 'OUTPUT' para aplicar la energía al dispositivo."
            ],
            type: "Fuente de Poder Lineal de Banco"
        },
        {
            name: "Fuente de Poder AC Variable (Variac)",
            ref: "TDGC2-2KM",
            category: "Fuentes de Poder",
            mainCategory: "Aparatos Electrónicos",
            desc: "Autotransformador variable para pruebas de equipos de corriente alterna y testeo seguro en bancos de reparación.",
            videoUrl: "https://www.youtube.com/watch?v=LpWtZkSbIOk",
            imageUrl: "https://mastechpowersupply.com/images/source/5KVA_110V250V_main.jpg",
            specs: {
                "Voltaje de Entrada": "110V / 120V AC",
                "Voltaje de Salida": "0 - 130V AC (Variable)",
                "Potencia Máxima": "2000VA (2KVA)",
                "Medidores": "Analógicos / Opcional Digital"
            },
            usageSteps: [
                "Gire la perilla superior completamente al cero (0V) antes de encender.",
                "Conecte el dispositivo a reparar a la toma del Variac aislada.",
                "Encienda el Variac y gire lentamente la perilla para inyectar voltaje.",
                "Monitoree los amperios; si la corriente se dispara, regrese a 0V."
            ],
            type: "Autotransformador AC (Variac)"
        },
        {
            name: "Generador de Señales Arbitrarias Siglent",
            ref: "SDG1032X",
            category: "Generadores de Señales",
            mainCategory: "Aparatos Electrónicos",
            desc: "Excelente generador de ondas complejas con tecnología EasyPulse, ideal para diseño y simulaciones.",
            videoUrl: "https://www.youtube.com/watch?v=XynqWZjHtRs",
            imageUrl: "https://siglentna.com/wp-content/uploads/2017/09/713839551390.MAIN_.jpg",
            specs: {
                "Ancho de Banda": "30 MHz",
                "Canales": "2 Canales Independientes",
                "Frecuencia de Muestreo": "150 MSa/s",
                "Resolución Vertical": "14 bits"
            },
            usageSteps: [
                "Seleccione la forma de onda deseada (Seno, Cuadrada, Pulso, etc.).",
                "Configure la frecuencia y la amplitud de pico a pico (Vpp).",
                "Active la salida del canal correspondiente ('CH1/CH2 On').",
                "Utilice el software EasyWave para dibujar ondas personalizadas."
            ],
            type: "Generador de Señales Arbitrario (AWG)"
        },
        {
            name: "Generador de Señales de RF Rigol",
            ref: "DSG815",
            category: "Generadores de Señales",
            mainCategory: "Aparatos Electrónicos",
            desc: "Generador para radiofrecuencia (RF) y microondas con excelentes capacidades de modulación analógica.",
            videoUrl: "https://www.youtube.com/watch?v=A0G0uz--5uA",
            imageUrl: "https://www.axiomtest.com/images/models/Rigol_DSG815.jpeg",
            specs: {
                "Rango de Frecuencia": "9 kHz a 1.5 GHz",
                "Ruido de Fase": "<-105 dBc/Hz (t\u00edpico)",
                "Modulaciones": "AM/FM/\u00d8M Est\u00e1ndar",
                "Potencia de Salida": "Hasta +20 dBm (T\u00edpico)"
            },
            usageSteps: [
                "Establezca la frecuencia central de transmisi\u00f3n en el teclado.",
                "Ajuste el nivel de potencia de salida RF (Level) en dBm.",
                "Configure los par\u00e1metros de modulaci\u00f3n (AM, FM o de fase).",
                "Active 'RF' y 'Mod' para iniciar la transmisi\u00f3n controlada."
            ],
            type: "Generador de Se\u00f1ales de Radiofrecuencia (RF)"
        },
        {
            name: "Generador de Se\u00f1ales Port\u00e1til FeelElec",
            ref: "FY6900",
            category: "Generadores de Se\u00f1ales",
            mainCategory: "Aparatos Electr\u00f3nicos",
            desc: "Dispositivo DDS port\u00e1til y accesible que incluye m\u00faltiples funciones como contador de frecuencia y barredor de se\u00f1ales.",
            videoUrl: "https://www.youtube.com/watch?v=ixkh2rXsqRo",
            imageUrl: "assets/osciloscopios/feelelec_fy6900.png",
            specs: {
                "Ancho de Banda Max": "60 MHz a 100 MHz (Seg\u00fan modelo)",
                "Frecuencia de Muestreo": "250 MSa/s",
                "Formas Predefinidas": "64 tipos",
                "Función Extra": "Medidor/Contador de Frecuencia"
            },
            usageSteps: [
                "Seleccione el canal principal presionando CH1 o CH2.",
                "Gire la perilla selectora principal para ajustar dígitos precisos de Hz.",
                "Ingrese al menú 'Sweep' si desea realizar barridos de frecuencia.",
                "Acople la salida a su osciloscopio usando un cable BNC-BNC."
            ],
            type: "Generador DDS de Doble Canal"
        },

        {
            name: "Analizador Lógico Profesional Saleae",
            ref: "Logic-8",
            category: "Analizadores Lógicos",
            mainCategory: "Aparatos Electrónicos",
            desc: "El referente de la industria. Decodifica más de 60 protocolos digitales con hardware compacto y software potente.",
            videoUrl: "https://www.youtube.com/watch?v=XhWKoFj_p9k",
            imageUrl: "https://cdn-shop.adafruit.com/970x728/2512-04.jpg",
            specs: {
                "Canales": "8 Digitales + 8 Analógicos",
                "Tasa de Muestreo Digital": "100 MS/s",
                "Protocolos": "SPI, I2C, UART, CAN, 1-Wire y más",
                "Software": "Logic 2 (Gratuito, Multiplataforma)"
            },
            usageSteps: [
                "Conecte el dispositivo al PC y abra el software Logic 2.",
                "Asigne un nombre y voltaje a cada canal en la interfaz.",
                "Pulse 'Start' y dispare el circuito bajo prueba.",
                "Añada un Protocol Decoder para leer automáticamente el protocolo."
            ],
            type: "Analizador Lógico USB de Alta Gama"
        },
        {
            name: "Analizador Lógico USB Económico",
            ref: "LA-8CH-24MHz",
            category: "Analizadores Lógicos",
            mainCategory: "Aparatos Electrónicos",
            desc: "Compatible con Saleae y PulseView (Sigrok). Excelente opción de entrada para estudiantes y makers con 8 canales a 24 MHz.",
            videoUrl: "https://www.youtube.com/watch?v=SNJCQBZotjQ",
            imageUrl: "https://electropeak.com/media/catalog/product/cache/a99a51fafac039a73087ecfaa8ccceba/p/r/pro-01-021-1-24mhz-8channel-logic.jpg",
            specs: {
                "Canales": "8 Digitales",
                "Tasa de Muestreo": "24 MHz",
                "Voltaje de Entrada": "0 - 5.5V",
                "Software": "PulseView (Sigrok) / OLS / Logic"
            },
            usageSteps: [
                "Instale los drivers CP2102 y descargue Sigrok PulseView.",
                "Conecte el analizador por USB y seleccione el dispositivo en PulseView.",
                "Enganche los clips a las señales digitales de su circuito (GND común).",
                "Configure el muestreo y pulse REC para capturar y decodificar señales."
            ],
            type: "Analizador Lógico USB Económico (8ch)"
        },
        {
            name: "Resistencia de Película de Carbón",
            ref: "RES-CARBON",
            category: "Resistencias",
            mainCategory: "Circuitos Integrados",
            desc: "Componente pasivo fundamental que limita el flujo de corriente. Es vital saber identificar su valor mediante las bandas de colores.",
            videoUrl: "https://www.youtube.com/watch?v=ZakHnvGVxLk",
            imageUrl: "https://www.logicbus.com.mx/blog/wp-content/uploads/2019/07/codigo-colores-resistencias-e1563802288271.jpg",
            specs: {
                "Funcionamiento": "Se opone al paso de la corriente eléctrica, disipando energía en forma de calor.",
                "Identificación": "Se lee mediante 4 o 5 bandas de colores impresas en su cuerpo.",
                "Tolerancia": "±5% (Banda dorada) típica",
                "Potencia": "1/4W o 1/2W para uso general"
            },
            usageSteps: [
                "Localice la banda de tolerancia (generalmente dorada) y colóquela a la derecha.",
                "Lea los colores de las primeras bandas de izquierda a derecha.",
                "Use la tabla de colores para convertir colores en cifras.",
                "Multiplique por el valor de la tercera banda para obtener los Ohmios (Ω).",
                "Verifique el valor real con un multímetro antes de soldar."
            ],
            type: "Componente Pasivo"
        },
        {
            name: "Capacitor Cerámico",
            ref: "CAP-CER",
            category: "Capacitores",
            mainCategory: "Circuitos Integrados",
            desc: "Son los más utilizados, compactos y con baja resistencia en serie equivalente (ESR). Esenciales para el filtrado de alta frecuencia y desacople de alimentación.",
            videoUrl: "https://www.youtube.com/watch?v=-Qzuj5PHqxs",
            imageUrl: "assets/capacitores/main_cer_ai.png",
            specs: {
                "Funcionamiento": "Almacena carga sin polaridad fija. Ideal para bypass y alta frecuencia.",
                "Voltaje": "50V - 100V típicos",
                "Polaridad": "No polarizado",
                "Referencia Visual": "assets/capacitores/cer_ref.svg"
                // Removed base64 Tabla de Código
            },
            usageSteps: [
                "Identifique el valor por el código de 3 dígitos impreso (ej: 104 = 10 × 10⁴ pF = 100nF).",
                "El primer y segundo dígito son cifras significativas; el tercero es el multiplicador (número de ceros).",
                "Inserte en cualquier orientación en la PCB, no tiene polaridad.",
                "Ubique lo más cerca posible de los pines de VCC de los circuitos integrados.",
                "Suelde asegurando que el cuerpo no toque otros componentes calientes."
            ],
            type: "Pasivo No Polarizado"
        },
        {
            name: "Capacitor Electrolítico de Aluminio",
            ref: "CAP-ELEC-AL",
            category: "Capacitores",
            mainCategory: "Circuitos Integrados",
            desc: "Ofrecen capacitancia muy alta para filtrado en fuentes de alimentación. Su dieléctrico de óxido de aluminio les permite alcanzar miles de microfaradios.",
            videoUrl: "https://www.youtube.com/watch?v=bLE_cJ8Hrpc",
            imageUrl: "assets/capacitores/main_elec_ai.png",
            specs: {
                "Funcionamiento": "Almacena grandes cargas para suavizar el rizado en fuentes DC.",
                "Voltaje Max": "Varía según modelo: 6.3V, 16V, 25V, 50V, 100V",
                "Polaridad": "Polarizado — la franja gris lateral indica el polo Negativo (−)",
                "Referencia Visual": "assets/capacitores/elec_ref.svg"
            },
            usageSteps: [
                "Identifique el Cátodo (−) por la franja gris/blanca lateral con el símbolo '−−−'.",
                "La pata más CORTA también corresponde al polo Negativo (−).",
                "Verifique que el voltaje del circuito sea al menos 20% menor que el voltaje nominal del capacitor.",
                "Respete la polaridad estrictamente: invertirlo puede causar explosión.",
                "Corte el exceso de terminales a ras de la PCB tras soldar."
            ],
            type: "Pasivo Polarizado"
        },
        {
            name: "Capacitor de Tantalio",
            ref: "CAP-TAN",
            category: "Capacitores",
            mainCategory: "Circuitos Integrados",
            desc: "Polarizados con dieléctrico de pentóxido de tantalio. Proporcionan alta estabilidad, mejor respuesta en frecuencia y vida útil superior a los de aluminio.",
            videoUrl: "https://www.youtube.com/watch?v=TYVUeag-Ggk",
            imageUrl: "assets/capacitores/main_tan_ai.png",
            specs: {
                "Funcionamiento": "Dieléctrico sólido de óxido de tantalio. Ideal para aplicaciones compactas de precisión y filtrado fino.",
                "Ventaja": "Larga vida útil, bajo ESR y tamaño reducido vs. electrolítico de Al.",
                "Polaridad": "Polarizado — la barra o '+' sobre el cuerpo indica el polo Positivo (+)",
                "Referencia Visual": "assets/capacitores/tan_ref.svg"
            },
            usageSteps: [
                "Identifique el polo Positivo (+) por la RAYA o marca '+' impresa en el cuerpo del capacitor.",
                "En cápsula SMD, la banda indica el terminal POSITIVO (al contrario del electrolítico de aluminio).",
                "No exceda nunca el voltaje nominal; son extremadamente sensibles a sobretensión.",
                "Use en etapas de salida de reguladores de voltaje y circuitos de precisión.",
                "Suelde rápidamente con temperatura controlada para no dañar el dieléctrico sólido."
            ],
            type: "Pasivo Polarizado"
        },
        {
            name: "Capacitor de Película/Poliéster",
            ref: "CAP-POLY",
            category: "Capacitores",
            mainCategory: "Circuitos Integrados",
            desc: "Utilizan una lámina de poliéster (Mylar) o polipropileno como dieléctrico. Son muy estables, resistentes a la humedad y comunes en audio e industriales.",
            videoUrl: "https://www.youtube.com/watch?v=hon7S766jrI",
            imageUrl: "assets/capacitores/main_poly_ai.png",
            specs: {
                "Funcionamiento": "Alta capacidad de sobretensión, baja pérdida dieléctrica y excelente estabilidad térmica.",
                "Aplicación": "Filtros de audio, acoplamiento de señal AC y fuentes sin transformador (X2).",
                "Polaridad": "No polarizado — conéctelo en cualquier dirección",
                "Referencia Visual": "assets/capacitores/poly_ref.svg"
            },
            usageSteps: [
                "Lea el código impreso: 3 dígitos + letra de tolerancia + número de voltaje.",
                "Ejemplo: '473J 100V' = 47nF, ±5%, 100V de trabajo.",
                "Puede conectarse en cualquier orientación (no tiene polaridad).",
                "Ideal para señales de corriente alterna (AC) y acoplamiento de etapas de audio.",
                "Aísle bien las patas si trabaja con voltajes superiores a 100V."
            ],
            type: "Pasivo No Polarizado"
        },
        {
            name: "Capacitor de Mica",
            ref: "CAP-MICA",
            category: "Capacitores",
            mainCategory: "Circuitos Integrados",
            desc: "Usan mica natural como dieléctrico. Ofrecen la mayor precisión y estabilidad de todos los capacitores, ideales para circuitos de radiofrecuencia (RF).",
            videoUrl: "https://www.youtube.com/watch?v=8fGiGl20JCY",
            imageUrl: "assets/capacitores/main_mica_ai.png",
            specs: {
                "Funcionamiento": "Mínimas pérdidas dieléctricas (factor Q muy alto) y excelente estabilidad ante temperatura.",
                "Uso": "Osciladores de RF, circuitos resonantes LC y filtros sintonizados de precisión.",
                "Tolerancia": "±1% a ±5%; los más precisos del mercado",
                "Referencia Visual": "assets/capacitores/mica_ref.svg"
            },
            usageSteps: [
                "Lea el código de color (5 o 6 puntos) o el valor numérico impreso en pF.",
                "Maneje con cuidado: el cuerpo de mica es frágil y puede agrietarse.",
                "Úselo en circuitos donde la deriva de frecuencia y temperatura deba ser mínima.",
                "Suelde con soldadura de alta calidad y temperatura controlada.",
                "Verifique siempre el voltaje máximo — generalmente son de 100V a 500V."
            ],
            type: "Pasivo de Precisión RF"
        },
        {
            name: "Supercapacitor (EDLC)",
            ref: "CAP-SUPER",
            category: "Capacitores",
            mainCategory: "Circuitos Integrados",
            desc: "Condensadores de doble capa eléctrica (EDLC) con capacitancias de 1F a miles de Faradios. Actúan como híbrido entre capacitor y batería para respaldo de energía.",
            videoUrl: "https://www.youtube.com/watch?v=nsX31lOdWoY",
            imageUrl: "assets/capacitores/main_super_ai.png",
            specs: {
                "Funcionamiento": "Almacenan energía por adsorción electrostática de iones, no por reacción química. Carga/descarga muy rápida.",
                "Capacidad": "1F a 3000F (Faradios). Densidad de potencia muy alta.",
                "Voltaje Nominal": "2.5V a 2.7V por celda típico (se combinan en serie para mayor voltaje)",
                "Referencia Visual": "assets/capacitores/super_ref.svg"
            },
            usageSteps: [
                "Identifique el terminal positivo (+) por la marca impresa; respete siempre la polaridad.",
                "Cargue lentamente o use una resistencia limitadora para evitar picos de corriente al conectar.",
                "El voltaje máximo de una celda es ~2.7V; en serie puede aumentarlo (ej: 2 × 2.7V = 5.4V).",
                "Use como respaldo de energía (UPS) para SRAM, RTC o circuitos de memoria.",
                "Nunca descargue en cortocircuito directo: puede liberar grandes corrientes destructoras."
            ],
            type: "Almacenamiento de Energía"
        },
        {
            name: "Capacitor Variable/Ajustable",
            ref: "CAP-VAR",
            category: "Capacitores",
            mainCategory: "Circuitos Integrados",
            desc: "Permiten ajustar su capacitancia manualmente. Fundamentales para la sintonización precisa de circuitos de radio AM/FM y filtros resonantes.",
            videoUrl: "https://www.youtube.com/watch?v=8fGiGl20JCY",
            imageUrl: "assets/capacitores/main_var_ai.jpg",
            specs: {
                "Funcionamiento": "Varía el área de placas conductoras enfrentadas mediante un eje giratorio, cambiando la capacitancia.",
                "Tipos": "Variable de aire (radios) y Trimmer ajustable (cerámico/plástico en PCB)",
                "Rango Típico": "10pF a 500pF (variable de aire) / 2pF a 60pF (trimmer)",
                "Referencia Visual": "assets/capacitores/var_ref.svg"
            },
            usageSteps: [
                "Gire el eje del trimmer muy suavemente con un destornillador de punta plana cerámica o plástica.",
                "Nunca use destornillador metálico: su presencia cerca cambia la capacitancia durante el ajuste.",
                "Ajuste mientras monitorea la frecuencia de resonancia en el osciloscopio o contador.",
                "No fuerce los topes mecánicos de giro: el ajuste es de 180° o 360° máximo según modelo.",
                "Fije la posición con laca o parafina cuando encuentre la sintonía correcta."
            ],
            type: "Capacitor Ajustable"
        },
        {
            name: "Transistor NPN 2N2222",
            ref: "2N2222",
            category: "Transistores",
            mainCategory: "Circuitos Integrados",
            desc: "El transistor NPN de propósito general más popular. Ideal para conmutación digital y amplificación de pequeña señal a alta velocidad.",
            videoUrl: "https://www.youtube.com/watch?v=8REH0_N6U2k",
            imageUrl: "assets/transistores/npn_2n2222_ai.png",
            specs: {
                "Funcionamiento": "Transistor BJT NPN de unión. La corriente de Base controla la corriente Colector-Emisor con una ganancia (hFE) de 75 a 300.",
                "Encapsulado": "TO-92 (plástico) / TO-18 (metal)",
                "Corriente Colector Máx.": "600 mA (IC)",
                "Voltaje C-E Máx.": "40 V (VCEO)",
                "Frecuencia de Corte": "300 MHz",
                "Datasheet": "https://www.onsemi.com/pdf/datasheet/p2n2222a-d.pdf"
            },
            usageSteps: [
                "Con el lado plano hacia usted (TO-92): pines son Emisor - Base - Colector (de izquierda a derecha).",
                "Calcule la resistencia de base: RB = (VIN - 0.7V) / IB, donde IB = IC / hFE.",
                "Conecte la carga entre VCC y el Colector; el Emisor a GND.",
                "Para conmutar una carga inductiva (relay, motor), añada un diodo de rueda libre en paralelo con la carga.",
                "Verifique que la disipación de potencia (VCE × IC) no exceda 625 mW sin disipador."
            ],
            type: "Transistor BJT NPN"
        },
        {
            name: "Transistor PNP BC557",
            ref: "BC557",
            category: "Transistores",
            mainCategory: "Circuitos Integrados",
            desc: "Transistor PNP de pequeña señal para conmutación de carga en el lado positivo (high-side switching) y lógica inversa.",
            videoUrl: "https://www.youtube.com/watch?v=_eB8cFNkCaM",
            imageUrl: "assets/transistores/pnp_bc557_ai.png",
            specs: {
                "Funcionamiento": "Transistor BJT PNP. Conduce cuando la Base está más negativa que el Emisor. Complementario del BC547.",
                "Encapsulado": "TO-92",
                "Corriente Colector Máx.": "100 mA (IC)",
                "Voltaje E-C Máx.": "45 V (VECO)",
                "Ganancia hFE": "110 - 800",
                "Datasheet": "https://www.onsemi.com/pdf/datasheet/bc556b-d.pdf"
            },
            usageSteps: [
                "Con el lado plano hacia usted (TO-92): pines son Colector - Base - Emisor (de izquierda a derecha).",
                "El Emisor se conecta al voltaje positivo (VCC); la carga entre Colector y GND.",
                "Para activarlo, lleve la Base a un potencial MENOR que el Emisor (aprox. 0.7V menos).",
                "Use una resistencia de base de 10kΩ a 47kΩ para limitar la corriente.",
                "Ideal para etapas de driver de señales positivas en lógica TTL o con microcontroladores."
            ],
            type: "Transistor BJT PNP"
        },
        {
            name: "MOSFET N-Channel IRF520",
            ref: "IRF520",
            category: "Transistores",
            mainCategory: "Circuitos Integrados",
            desc: "MOSFET de potencia canal-N controlado por voltaje. Perfecto para conmutar cargas de alta corriente con señales lógicas de 5V o 3.3V.",
            videoUrl: "https://www.youtube.com/watch?v=o4_NeqlJgOs",
            imageUrl: "assets/transistores/mosfet_premium.png",
            specs: {
                "Funcionamiento": "Se activa con voltaje Gate-Source (VGS). No consume corriente de control. Ideal para switching de alta eficiencia.",
                "Encapsulado": "TO-220",
                "Corriente de Drenaje Máx.": "9.2 A (ID)",
                "Voltaje Drain-Source Máx.": "100 V (VDSS)",
                "RDS(on) Máx.": "0.27 Ω",
                "Datasheet": "https://www.infineon.com/dgdl/irf520pbf.pdf?fileId=5546d462533600a4015355e329b1197e"
            },
            usageSteps: [
                "Pines (TO-220, de izquierda a derecha mirando la etiqueta): Gate - Drain - Source.",
                "Conecte Source a GND; la carga entre VCC y Drain.",
                "Aplicar 5V-10V al Gate activa completamente el canal (saturación).",
                "Añada una resistencia de 100Ω-470Ω en serie con el Gate para evitar oscilaciones.",
                "Asegure el disipador de calor con pasta térmica si la carga supera 1A continuo.",
                "Use un diodo de rueda libre en paralelo con la carga inductiva (relé, motor)."
            ],
            type: "MOSFET de Potencia N-Channel"
        },
        {
            name: "MOSFET P-Channel IRF9540",
            ref: "IRF9540",
            category: "Transistores",
            mainCategory: "Circuitos Integrados",
            desc: "MOSFET de potencia canal-P. Complementario del IRF540, úselo para control de carga en el lado positivo (high-side) en puentes H o fuentes conmutadas.",
            videoUrl: "https://www.youtube.com/watch?v=GrvvkYTW_0k",
            imageUrl: "assets/transistores/mosfet_p_irf9540_ai.png",
            specs: {
                "Funcionamiento": "Conduce cuando VGS es negativo (Gate más bajo que Source). Source se conecta a VCC.",
                "Encapsulado": "TO-220",
                "Corriente de Drenaje Máx.": "-19 A (ID)",
                "Voltaje Source-Drain Máx.": "100 V",
                "VGS Umbral": "-2V a -4V",
                "Datasheet": "https://www.vishay.com/docs/91257/irf9540.pdf"
            },
            usageSteps: [
                "Source se conecta a VCC; la carga entre Drain y GND.",
                "Para activarlo desde un microcontrolador a 3.3V, use un transistor NPN de nivel lógico de driver.",
                "VGS debe ser suficientemente negativo (Ej: Gate a GND si Source está a 5V).",
                "Use siempre diodo de rueda libre para cargas inductivas.",
                "Consulte el datasheet para verificar VGS(th) exacto del lote."
            ],
            type: "MOSFET de Potencia P-Channel"
        },
        {
            name: "Transistor Darlington TIP120",
            ref: "TIP120",
            category: "Transistores",
            mainCategory: "Circuitos Integrados",
            desc: "Par Darlington NPN de alta ganancia para control de motores DC, solenoides y cargas de media potencia directamente desde microcontroladores.",
            videoUrl: "https://www.youtube.com/watch?v=sRVvUkK0U80",
            imageUrl: "assets/transistores/tip120_ai.png",
            specs: {
                "Funcionamiento": "Combina dos transistores BJT en cascada. Ganancia hFE total superior a 1000. VBE de activación ~1.4V.",
                "Encapsulado": "TO-220",
                "Corriente Colector Máx.": "5 A (IC)",
                "Voltaje C-E Máx.": "60 V (VCEO)",
                "Diodo de protección": "Integrado (Diodo de rueda libre interno)",
                "Datasheet": "https://www.onsemi.com/pdf/datasheet/tip120-d.pdf"
            },
            usageSteps: [
                "Pines (TO-220 mirando la etiqueta): Base - Colector - Emisor.",
                "Con una señal de 5V y ~1mA en la Base, puede conmutar hasta 5A en el Colector.",
                "Conecte el Emisor a GND y la carga entre VCC y el Colector.",
                "El diodo interno protege contra corrientes inversas de motores; aun así, añada uno externo para cargas grandes.",
                "Instale en disipador de aluminio si la corriente supera 1.5A continuos."
            ],
            type: "Transistor Darlington NPN"
        },
        {
            name: "Diodo Rectificador 1N4007",
            ref: "1N4007",
            category: "Diodos",
            mainCategory: "Circuitos Integrados",
            desc: "El diodo rectificador de propósito general más común. Soporta hasta 1000V de voltaje inverso. Fundamental en fuentes de alimentación.",
            videoUrl: "https://www.youtube.com/watch?v=fXv0j0D2p6A",
            imageUrl: "assets/diodos/diodo_1n4007_ai.png",
            specs: {
                "Funcionamiento": "Permite el paso de corriente únicamente del Ánodo (+) al Cátodo (-). Bloquea el flujo inverso como una válvula.",
                "Corriente Promedio": "1 A (IFAV)",
                "Voltaje Inverso Máx.": "1000 V (VRRM)",
                "Caída de Voltaje Directa": "~1.1 V (VF a 1A)",
                "Datasheet": "https://www.diodes.com/assets/Datasheets/ds28002.pdf"
            },
            usageSteps: [
                "Identifique el Cátodo (-) por la banda plateada o gris impresa en su cuerpo.",
                "Conéctelo en el circuito con el Ánodo hacia el positivo de la fuente AC.",
                "Use cuatro unidades en configuración de puente (Puente de Graetz) para rectificar AC completa.",
                "Añada un capacitor electrolítico a la salida para suavizar el rizado DC.",
                "No exceda la corriente de 1A. Para corrientes mayores, use el 1N5408 (3A) o similares."
            ],
            type: "Diodo Rectificador General"
        },
        {
            name: "Diodo Zener 1N4733A",
            ref: "1N4733A",
            category: "Diodos",
            mainCategory: "Circuitos Integrados",
            desc: "Diodo Zener de regulación de voltaje. Mantiene exactamente 5.1V en su terminal en polarización inversa. Esencial para referencias de tensión.",
            videoUrl: "https://www.youtube.com/watch?v=6PmVLNq9cZQ",
            imageUrl: "assets/diodos/diodo_zener_1n4733a_ai.png",
            specs: {
                "Funcionamiento": "En polarización inversa, entra en avalancha a su voltaje Zener (VZ) regulando el voltaje. No se destruye si se limita la corriente.",
                "Voltaje Zener (VZ)": "5.1 V",
                "Tolerancia VZ": "±5%",
                "Potencia Máxima": "1 W (PZ)",
                "Corriente de Prueba (IZT)": "49 mA",
                "Datasheet": "https://www.onsemi.com/pdf/datasheet/1n4728a-d.pdf"
            },
            usageSteps: [
                "Siempre use el Zener en polarización INVERSA: Cátodo (banda) al positivo.",
                "Calcule la resistencia serie: RS = (VIN - VZ) / IZ_max. Ejemplo: RS = (12V-5.1V) / 20mA = 345Ω → use 330Ω.",
                "El voltaje de salida regulado aparece entre Cátodo y GND.",
                "No supere la potencia máxima (VZ × IZ < 1W en este modelo).",
                "Para mayor precisión de referencia, use un circuito integrado regulador como el TL431."
            ],
            type: "Diodo Zener Regulador"
        },
        {
            name: "Diodo Schottky 1N5819",
            ref: "1N5819",
            category: "Diodos",
            mainCategory: "Circuitos Integrados",
            desc: "Diodo Schottky de conmutación ultrarrápida. Su baja caída de voltaje (~0.3V) lo hace ideal para fuentes conmutadas y protección de polaridad.",
            videoUrl: "https://www.youtube.com/watch?v=TFvZ9MaqO6c",
            imageUrl: "assets/diodos/schottky_1n5819_ai.svg",
            specs: {
                "Funcionamiento": "Usa unión metal-semiconductor. Sin carga almacenada → recuperación ultrarrápida. Menor disipación de calor.",
                "Corriente Promedio": "1 A (IFAV)",
                "Voltaje Inverso Máx.": "40 V (VRRM)",
                "Caída de Voltaje Directa": "~0.3 V (VF típico)",
                "Frecuencia de Trabajo": "Hasta MHz",
                "Datasheet": "https://www.onsemi.com/pdf/datasheet/1n5817-d.pdf"
            },
            usageSteps: [
                "Identifique el Cátodo por la banda gris (igual que un diodo convencional).",
                "Úselo para proteger circuitos de polaridad inversa: instale en serie con el positivo de alimentación.",
                "En fuentes conmutadas (Buck/Boost), colóquelo como diodo de rueda libre por su recuperación rápida.",
                "La baja caída de tensión (~0.3V vs ~0.7V del 1N4007) reduce pérdidas de calor.",
                "Tenga en cuenta que su corriente de fuga inversa es mayor que los diodos convencionales."
            ],
            type: "Diodo Schottky"
        },

        {
            name: "Diodo Puente KBL410",
            ref: "KBL410",
            category: "Diodos",
            mainCategory: "Circuitos Integrados",
            desc: "Puente rectificador monolítico de 4 diodos en un solo encapsulado. Simplifica el diseño de fuentes de alimentación AC/DC.",
            videoUrl: "https://www.youtube.com/watch?v=9csKNnm3UWE",
            imageUrl: "assets/diodos/puente_kbl410_ai.svg",
            specs: {
                "Funcionamiento": "Rectifica la señal AC completa internamente. Los 4 diodos están preconectados en configuración Puente de Graetz.",
                "Corriente Promedio": "4 A (IFAV)",
                "Voltaje Inverso Máx.": "1000 V (VRRM)",
                "Pines": "AC~, AC~, DC+, DC-",
                "Datasheet": "https://www.diodes.com/assets/Datasheets/KBL005GP_KBL01GP_KBL02GP_KBL04GP_KBL06GP_KBL08GP_KBL10GP.pdf"
            },
            usageSteps: [
                "Los pines '~' reciben la entrada de corriente alterna (transformador).",
                "El pin '+' entrega la salida DC positiva; el pin '-' es el GND.",
                "Conecte un capacitor electrolítico grande (1000µF - 4700µF) entre + y - para filtrar el rizado.",
                "Use pasta térmica y fije a disipador si la corriente supera 2A.",
                "Verifique que el voltaje pico de la señal AC (VRMS × 1.41) sea menor que VRRM del puente."
            ],
            type: "Puente Rectificador"
        },
        {
            name: "Bobina Toroidal 100µH",
            ref: "IND-TOR-100U",
            category: "Bobinas",
            mainCategory: "Circuitos Integrados",
            desc: "Inductor toroidal de núcleo de ferrita. Su geometría circular minimiza la radiación electromagnética y la interferencia. Estándar en fuentes conmutadas.",
            videoUrl: "https://www.youtube.com/watch?v=NgwX_vun3O4",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/79/Small_Toroidal_Inductors.jpg",
            specs: {
                "Funcionamiento": "Almacena energía en campo magnético. Se opone a cambios bruscos de corriente. La inductancia se mide en Henrios (H).",
                "Inductancia": "100 µH",
                "Corriente de Saturación": "Varía según diseño (ver datasheet).",
                "Resistencia DC (DCR)": "Baja (< quelques Ω)",
                "Aplicación": "Filtros EMI, convertidores DC-DC Buck/Boost",
                "Datasheet": "https://www.bourns.com/docs/Product-Datasheets/SRR1260.pdf"
            },
            usageSteps: [
                "Identifique las terminales por continuidad con el multímetro en modo Ω.",
                "Ubique el toroide lejos de conductores metálicos paralelos para no alterar su inductancia.",
                "En fuentes conmutadas, seleccione la inductancia según la frecuencia de conmutación y el rizado de corriente deseado.",
                "Fíjelo mecánicamente con brida plástica o pegamento epoxi no metálico.",
                "Mida la inductancia con un LCR meter para verificar el valor antes de instalar."
            ],
            type: "Inductor Toroidal"
        },
        {
            name: "Bobina de Núcleo de Aire",
            ref: "IND-AIR",
            category: "Bobinas",
            mainCategory: "Circuitos Integrados",
            desc: "Inductor artesanal devanado en espiral sin núcleo magnético. Tiene baja inductancia pero excelente respuesta en alta frecuencia y sin saturación.",
            videoUrl: "https://www.youtube.com/watch?v=2K1PXYpRwvk",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Air_core_inductor.jpg",
            specs: {
                "Funcionamiento": "Sin núcleo, no se satura. Lineal en todo el rango de corriente. Ideal para RF donde los núcleos añaden pérdidas.",
                "Rango de Inductancia": "Nanohenrios a Microhenrios (nH - µH)",
                "Factor de Calidad (Q)": "Alto (poco pérdidas en RF)",
                "Aplicación": "Circuitos de radio, filtros LC, osciladores de alta frecuencia",
                "Cálculo": "Use la fórmula de Wheeler: L(µH) = (r²·n²) / (9r + 10l)"
            },
            usageSteps: [
                "Enrolle el alambre esmaltado (magnet wire) en un cilindro del diámetro deseado.",
                "Retire el esmalte de ambas puntas con lija fina o mechero antes de soldar.",
                "Mantenga los espiras equidistantes para uniformidad de inductancia.",
                "Aleje de piezas metálicas que puedan actuar como núcleo no intencional.",
                "Mida la inductancia con un LCR meter y ajuste separando o comprimiendo espiras."
            ],
            type: "Inductor de Núcleo de Aire"
        },
        {
            name: "Bobina SMD 4.7µH",
            ref: "IND-SMD-4U7",
            category: "Bobinas",
            mainCategory: "Circuitos Integrados",
            desc: "Inductor para montaje superficial (SMD). Compacto, diseñado para circuitos impresos modernos de alta densidad y aplicaciones de potencia en miniatura.",
            videoUrl: "https://www.youtube.com/watch?v=pKvhBHCkNBQ",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b2/SMD_inductors_on_match.jpg",
            specs: {
                "Funcionamiento": "Mismo principio que un inductor PTH pero en paquete compacto para PCB. Se suelda directamente sobre la superficie.",
                "Inductancia": "4.7 µH",
                "Corriente de Saturación": "1 A - 3 A (típico para potencia)",
                "Encapsulado": "4x4mm / 6x6mm",
                "Aplicación": "Reguladores de tensión DC-DC (LM2596, TPS54x)",
                "Datasheet": "https://www.bourns.com/docs/Product-Datasheets/SRR4018.pdf"
            },
            usageSteps: [
                "Aplique pasta de soldadura a las pads de la PCB.",
                "Posicione el inductor SMD con la orientación correcta (verificar marcado).",
                "Use punta fina o aire caliente; temperatura 250°C-300°C.",
                "Verifique continuidad y que el valor leído con LCR meter corresponde al marcado.",
                "Mantenga separación de al menos 1mm de otros componentes magnéticos."
            ],
            type: "Inductor SMD de Potencia"
        },

        {
            name: "Potenciómetro Lineal",
            ref: "POT-10K",
            category: "Resistencias",
            mainCategory: "Componentes Pasivos",
            desc: "Resistencia variable de tres terminales. El terminal central (cursor) permite variar la resistencia manualmente girando el eje.",
            videoUrl: "https://www.youtube.com/watch?v=F3_8T_m3qRA",
            imageUrl: "https://m.media-amazon.com/images/I/51r2XG5XF9L._AC_SL1000_.jpg",
            specs: {
                "Valor": "10 kΩ (típico)",
                "Tipo": "Lineal (B10K)",
                "Pines": "1-3 Extremos, 2 Cursor",
                "Potencia": "0.5 W"
            },
            usageSteps: [
                "Conecte los terminales extremos a VCC y GND.",
                "Mida el voltaje de salida en el terminal central (pata 2).",
                "Use como divisor de voltaje para controlar volumen o brillo.",
                "En protoboard, asegúrese de que las patas queden firmes para evitar lecturas ruidosas."
            ],
            type: "Resistencia Variable"
        },
        {
            name: "Pulsador Táctil (Push Button)",
            ref: "BTN-6MM",
            category: "Interruptores",
            mainCategory: "Componentes Pasivos",
            desc: "Interruptor momentáneo que cierra el circuito al ser presionado. Ideal para entradas digitales en microcontroladores.",
            videoUrl: "https://www.youtube.com/watch?v=fS_2G1vE7cM",
            imageUrl: "https://m.media-amazon.com/images/I/61N+zP0H1bL._AC_SL1000_.jpg",
            specs: {
                "Configuración": "Normalmente Abierto (SPST-NO)",
                "Dimensiones": "6mm x 6mm",
                "Voltaje Max": "12 VDC",
                "Vida Útil": "100.000 ciclos"
            },
            usageSteps: [
                "Identifique los pares de pines que están conectados internamente.",
                "Use una resistencia Pull-up o Pull-down externa (10k) para evitar pines flotantes.",
                "En Arduino, use 'INPUT_PULLUP' para simplificar la conexión.",
                "Implemente un 'debounce' por software para evitar lecturas falsas al presionar."
            ],
            type: "Interruptor Momentáneo"
        },
        {
            name: "Timer NE555",
            ref: "NE555",
            category: "Circuitos Integrados",
            mainCategory: "Circuitos Integrados",
            desc: "El circuito integrado más vendido en la historia. Genera pulsos, retardos precisos y frecuencias de oscilación configurables con pocos componentes externos.",
            videoUrl: "https://www.youtube.com/watch?v=kY6v_A3o8vU",
            imageUrl: "https://m.media-amazon.com/images/I/61tS7H2pQQL._AC_SL1000_.jpg",
            specs: {
                "Funcionamiento": "Comparadores internos, flip-flop SR y transistor de descarga. Opera en modo Monoestable (un pulso) o Astable (oscilador).",
                "Voltaje de Alimentación": "4.5V - 15V (NE555) / 2V - 6V (LMC555 CMOS)",
                "Corriente de Salida": "Hasta 200 mA (sink/source)",
                "Frecuencia Máxima": "~500 kHz",
                "Datasheet": "https://www.ti.com/lit/ds/symlink/ne555.pdf"
            },
            usageSteps: [
                "Pin 1 = GND, Pin 8 = VCC (ponga desacople de 100nF entre VCC y GND).",
                "MODO ASTABLE (oscilador): conecte R1 entre VCC y Discharge(7), R2 entre Discharge(7) y Threshold(6)=Trigger(2), C entre Trigger(2) y GND. Frecuencia = 1.44 / ((R1 + 2·R2) × C).",
                "MODO MONOESTABLE: Trigger(2) a VCC con pull-up. Pulse a GND para disparar. Tiempo = 1.1 × R × C.",
                "El pin Control(5) puede modularse con señal externa para PWM o VCO.",
                "Añada un diodo entre pins 7 y 8 en modo astable para ciclos de trabajo menores al 50%."
            ],
            type: "Timer / Oscilador IC"
        },
        {
            name: "Amplificador Operacional LM358",
            ref: "LM358",
            category: "Circuitos Integrados",
            mainCategory: "Circuitos Integrados",
            desc: "Amplificador Operacional (Op-Amp) dual de propósito general. Opera con una sola fuente de alimentación, ideal para comparadores, amplificadores y filtros activos.",
            videoUrl: "https://www.youtube.com/watch?v=tyqRZ-IrFQ0",
            imageUrl: "https://m.media-amazon.com/images/I/51OAGV7iBqL._AC_SL1000_.jpg",
            specs: {
                "Funcionamiento": "Amplifica la diferencia entre las entradas (+) y (-). Ganancia abierta muy alta (~100 dB). Se configura con retroalimentación.",
                "Voltaje de Alimentación": "3V a 32V (Single) / ±1.5V a ±16V (Dual)",
                "Canales": "2 Op-Amps independientes en un DIP-8",
                "Slew Rate": "0.6 V/µs",
                "Ancho de Banda": "1 MHz (GBW)",
                "Datasheet": "https://www.ti.com/lit/ds/symlink/lm358.pdf"
            },
            usageSteps: [
                "Pin 8 = VCC, Pin 4 = GND. Op-Amp A: pines 2(-), 3(+), 1(out). Op-Amp B: pines 6(-), 5(+), 7(out).",
                "COMPARADOR: conecte la referencia a (+) y la señal a (-). La salida irá a máximo si señal < referencia.",
                "AMPLIFICADOR NO INVERSOR: Vout = Vin × (1 + Rf/R1). Conecte Rf entre Salida y (-); R1 entre (-) y GND.",
                "Agregue condensador de desacople de 100nF cerca de los pines de alimentación.",
                "En modo single-supply, el rango de entrada va desde GND hasta VCC-1.5V típicamente."
            ],
            type: "Amplificador Operacional Dual"
        },
        {
            name: "Amplificador Operacional Cuádruple LM324N",
            ref: "LM324N",
            category: "Amplificadores Operacionales",
            mainCategory: "Circuitos Integrados",
            desc: "Circuito integrado que contiene cuatro amplificadores operacionales independientes de propósito general. Ideal para aplicaciones con fuente de alimentación simple.",
            videoUrl: "https://www.youtube.com/watch?v=tyqRZ-IrFQ0",
            imageUrl: "assets/circuitos/lm324n_ai.png",
            specs: {
                "Funcionamiento": "Amplifica la diferencia entre las entradas (+) y (-). Contiene cuatro operacionales en un solo chip.",
                "Voltaje de Alimentación": "3V a 32V (Single) / ±1.5V a ±16V (Dual)",
                "Canales": "4 Op-Amps independientes en un DIP-14",
                "Slew Rate": "0.5 V/µs",
                "Ancho de Banda": "1.2 MHz (GBW)",
                "Datasheet": "https://www.ti.com/lit/ds/symlink/lm324.pdf"
            },
            usageSteps: [
                "Pin 4 = VCC, Pin 11 = GND. Op-Amp 1: pines 2(-), 3(+), 1(out).",
                "Op-Amp 2: 6(-), 5(+), 7(out). Op-Amp 3: 9(-), 10(+), 8(out). Op-Amp 4: 13(-), 12(+), 14(out).",
                "Se puede usar como filtro activo, comparador, oscilador o amplificador de instrumentación.",
                "Coloca un capacitor de desacople de 100nF cerca de VCC y GND para reducir el ruido.",
                "En modo single-supply, ten en cuenta que la salida no llega perfectamente a VCC."
            ],
            type: "Amplificador Operacional Cuádruple"
        },
        {
            name: "Regulador de Voltaje LM7805",
            ref: "LM7805",
            category: "Circuitos Integrados",
            mainCategory: "Circuitos Integrados",
            desc: "Regulador de voltaje lineal fijo de 5V. El componente estándar para suministrar 5V estables a partir de cualquier fuente DC de 7V a 35V.",
            videoUrl: "https://www.youtube.com/watch?v=bDJdZnwEYqI",
            imageUrl: "https://m.media-amazon.com/images/I/61ixHLNdGFL._AC_SL1001_.jpg",
            specs: {
                "Funcionamiento": "Regula la tensión de salida disipando el exceso de voltaje en calor. Requiere disipador de calor para corrientes altas.",
                "Voltaje de Salida": "5 V (fijo)",
                "Corriente Máxima": "1 A (con disipador)",
                "Voltaje de Entrada Mín.": "7 V (diferencial > 2V)",
                "Protección Interna": "Cortocircuito y sobre-temperatura",
                "Datasheet": "https://www.ti.com/lit/ds/symlink/lm7805.pdf"
            },
            usageSteps: [
                "Pines (TO-220 mirando la etiqueta): Entrada - GND - Salida.",
                "Añada condensador de 0.33µF en la entrada y 0.1µF en la salida, lo más cerca posible al IC.",
                "La diferencia entre Vin y Vout × Iout = calor disipado. Ej: (9V-5V) × 1A = 4W → necesita disipador.",
                "Para mayor corriente, use transistor de paso (pass transistor) externo o reemplace por LM338.",
                "Si necesita voltaje ajustable, use el LM317 con divisor resistivo (R1=240Ω, R2 variable)."
            ],
            type: "Regulador Lineal Fijo 5V"
        },
        {
            name: "Driver de Motor L293D",
            ref: "L293D",
            category: "Circuitos Integrados",
            mainCategory: "Circuitos Integrados",
            desc: "Driver de doble puente H para controlar la dirección y velocidad de 2 motores DC o 1 motor paso a paso con señales lógicas desde un microcontrolador.",
            videoUrl: "https://www.youtube.com/watch?v=fPLEncYrl4Q",
            imageUrl: "https://m.media-amazon.com/images/I/61YGMHduwTL._AC_SL1000_.jpg",
            specs: {
                "Funcionamiento": "Cuatro drivers de medio-puente con diodos de protección integrados. Acepta lógica TTL/CMOS. Controla dirección con IN1/IN2 y velocidad con EN1 (PWM).",
                "Voltaje Lógico (Vcc1)": "5 V",
                "Voltaje Motor (Vcc2)": "4.5 V a 36 V",
                "Corriente por Canal": "600 mA continuo / 1.2 A pico",
                "Nº de Motores": "2 motores DC / 1 motor paso a paso",
                "Datasheet": "https://www.ti.com/lit/ds/symlink/l293.pdf"
            },
            usageSteps: [
                "Pines de Alimentación: Pin 16 = Vcc1 (5V lógica), Pin 8 = Vcc2 (voltaje del motor), Pins 4,5,12,13 = GND.",
                "Motor A: IN1(2), IN2(7), EN1(1). Motor B: IN3(10), IN4(15), EN2(9). Salidas: OUT1(3), OUT2(6), OUT3(11), OUT4(14).",
                "Para girar motor A hacia adelante: EN1=HIGH, IN1=HIGH, IN2=LOW.",
                "Para frenar: EN1=HIGH, IN1=IN2=LOW (freno activo) o EN1=LOW (libre).",
                "Aplique señal PWM al pin EN para controlar la velocidad. Frecuencia recomendada: 1kHz-20kHz.",
                "El CI se calienta con cargas altas: instale disipador de calor o use módulos basados en L298N para más corriente."
            ],
            type: "Driver Doble Puente H"
        },
        {
            name: "Microcontrolador ATmega328P",
            ref: "ATMEGA328P",
            category: "Circuitos Integrados",
            mainCategory: "Circuitos Integrados",
            desc: "El cerebro del Arduino UNO. Microcontrolador AVR de 8 bits con 32KB Flash, 2KB SRAM, y periféricos como UART, SPI, I2C, ADC y PWM.",
            videoUrl: "https://www.youtube.com/watch?v=k6pKP8eB6pQ",
            imageUrl: "https://m.media-amazon.com/images/I/61kMxN3HHFL._AC_SL1000_.jpg",
            specs: {
                "Funcionamiento": "CPU RISC de 8 bits a 16 MHz. Ejecuta la mayoría de instrucciones en 1 ciclo de reloj. Programable con Arduino IDE.",
                "Memoria Flash": "32 KB (de los que 0.5KB son para el bootloader)",
                "SRAM": "2 KB",
                "EEPROM": "1 KB",
                "Pines I/O": "23 pines GPIO (14 digitales, 6 con PWM, 6 ADC de 10-bit)",
                "Datasheet": "https://ww1.microchip.com/downloads/en/DeviceDoc/Atmel-7810-Automotive-Microcontrollers-ATmega328P_Datasheet.pdf"
            },
            usageSteps: [
                "Use el Arduino UNO/Nano para prototipo. Para producción, programe el ATmega328P-PU directamente con USBasp o con la placa Arduino como ISP.",
                "Añada cristal de 16 MHz con dos condensadores de 22pF a los pines XTAL1/XTAL2.",
                "Conecte 100nF entre cada pin VCC/AVCC y GND para desacople.",
                "Para reseteo manual, añada un pulsador entre el pin RESET y GND con pull-up de 10kΩ a VCC.",
                "Al programar sin bootloader, use la herramienta 'Quemar Bootloader' del Arduino IDE y configure los fusibles correctamente."
            ],
            type: "Microcontrolador AVR 8-bit"
        },
        {
            name: "Relé Electromecánico 5V",
            ref: "SRD-05VDC-SL-C",
            category: "Relés",
            mainCategory: "Circuitos Integrados",
            desc: "Interruptor electromecánico controlado por voltaje. Permite a circuitos de bajo voltaje (como microcontroladores) conmutar cargas de alto voltaje (hasta 250V AC).",
            videoUrl: "https://www.youtube.com/watch?v=Knd4zDqYfW0",
            imageUrl: "assets/reles/sr5vdc_ai.png",
            specs: {
                "Voltaje de Control (Bobina)": "5V DC",
                "Capacidad Máxima de Carga": "10A 250VAC / 10A 30VDC",
                "Contactos": "Normalmente Abierto (NO) y Normalmente Cerrado (NC)",
                "Principio": "Electromecánico (usa un electroimán interno para accionar los contactos)"
            },
            usageSteps: [
                "Conecte el pin de señal (IN) al pin digital del microcontrolador.",
                "Suministre 5V y GND a los pines VCC y GND del módulo para energizar la bobina.",
                "Conecte la carga de alto voltaje al borne COM (Común) y al de activación (NO o NC).",
                "Precaución: Trabajar con voltajes AC (110V/220V) es peligroso, hágalo con el circuito desconectado."
            ],
            type: "Relé Electromecánico"
        },
        {
            name: "Relé de Estado Sólido (SSR)",
            ref: "SSR-40DA",
            category: "Relés",
            mainCategory: "Circuitos Integrados",
            desc: "Relé sin partes móviles. Utiliza semiconductores ópticos y triacs para conmutar corriente alterna. Ofrece vida útil casi ilimitada y libre de chispas.",
            videoUrl: "https://www.youtube.com/watch?v=KzV_uB48XTo",
            imageUrl: "assets/reles/ssr_ai.png",
            specs: {
                "Voltaje de Control (Input)": "3 - 32V DC",
                "Voltaje de Carga (Output)": "24 - 380V AC",
                "Corriente Máxima admisible": "40A (con disipador de aluminio adecuado)",
                "Aislamiento": "Optoacoplado internamente, protege los circuitos de control"
            },
            usageSteps: [
                "Conecte la señal de control DC (ej. de 5V o 12V) a los terminales 3(+) y 4(-).",
                "Conecte en serie la carga AC de alta potencia a los terminales 1 y 2.",
                "Para corrientes superiores a 5A continuos, atornille el relé a un disipador de aluminio con pasta térmica.",
                "Por su alta velocidad, es excelente para controlar sistemas mediante modulación (PWM lento)."
            ],
            type: "Relé de Estado Sólido"
        },
        {
            name: "Interruptor Reed (Reed Switch)",
            ref: "GPS-14A",
            category: "Relés",
            mainCategory: "Circuitos Integrados",
            desc: "Interruptor magnético sellado en un tubo de vidrio. Se activa por la proximidad de un campo magnético externo (imán). Es el componente base para sensores de puertas y relés reed.",
            videoUrl: "https://www.youtube.com/watch?v=T-2HByfndA0",
            imageUrl: "assets/reles/reed_switch_glass.png",
            specs: {
                "Tipo de Contacto": "Normalmente Abierto (SPST-NO)",
                "Voltaje Máximo": "100V DC",
                "Corriente de Conmutación": "0.5A",
                "Material": "Tubo de vidrio con gas inerte y contactos de rodio/rutenio"
            },
            usageSteps: [
                "Acerque un imán al cuerpo de vidrio para cerrar el contacto interno.",
                "Suelde los terminales con cuidado; el vidrio es frágil y puede romperse por calor excesivo o tensión mecánica.",
                "Ideal para usar como sensor de fin de carrera o detector de apertura sin contacto físico.",
                "No lo use para conmutar directamente cargas inductivas grandes sin un diodo de protección."
            ],
            type: "Interruptor Magnético"
        },
        {
            name: "Relé Reed (SIP-1A05)",
            ref: "SIP-1A05",
            category: "Relés",
            mainCategory: "Circuitos Integrados",
            desc: "Relé Reed en encapsulado SIP. Combina la velocidad de un interruptor reed con una bobina de control integrada. Muy silencioso y eficiente.",
            videoUrl: "https://www.youtube.com/watch?v=Knd4zDqYfW0",
            imageUrl: "assets/reles/reed_relay_sip.png",
            specs: {
                "Voltaje Bobina": "5V DC",
                "Resistencia Bobina": "500 Ω",
                "Configuración": "1 Form A (SPST-NO)",
                "Velocidad": "0.5ms (Conmutación ultra rápida)"
            },
            usageSteps: [
                "Identifique los pines de la bobina (extremos) y los del contacto (internos).",
                "Alimente la bobina con 5V directamente si el consumo es bajo (<10mA).",
                "Úselo en aplicaciones de alta velocidad o donde el ruido mecánico de un relé común sea molesto.",
                "Ideal para multímetros automáticos y equipos de prueba."
            ],
            type: "Relé de Lengüeta (Encapsulado)"
        },
        {
            name: "Potenciómetro Lineal B20K",
            ref: "WH148-B20K",
            category: "Potenciómetros",
            mainCategory: "Circuitos Integrados",
            desc: "Resistencia variable de tres terminales. Actúa como un divisor de voltaje ajustable, permitiendo regular la intensidad de señales, volumen o potencia en circuitos electrónicos.",
            videoUrl: "https://www.youtube.com/watch?v=Cq5kYaWtNPA",
            imageUrl: "assets/circuitos/potenciometro_b20k.png",
            specs: {
                "Valor de Resistencia": "20K Ω (Ohmios)",
                "Curva de Respuesta": "Lineal (Tipo B)",
                "Potencia Máxima": "0.125 W",
                "Ángulo de Rotación": "300° ± 5°"
            },
            usageSteps: [
                "Conecte los terminales extremos a VCC y GND.",
                "Use el terminal central (wiper) para obtener el voltaje variable (salida).",
                "Para usarlo como reóstato (resistencia variable de 2 pines), conecte el central y uno de los extremos.",
                "Al soldar, evite calentar los terminales por más de 3 segundos para no dañar la pista de carbón interna."
            ],
            type: "Resistencia Variable"
        },
        {
            name: "Termistor NTC 10K (Sensor de Temperatura)",
            ref: "NTC-MF52-103",
            category: "Sensores y Transductores",
            mainCategory: "Circuitos Integrados",
            desc: "Resistencia sensible a la temperatura con coeficiente térmico negativo (NTC). Su resistencia disminuye a medida que aumenta la temperatura. Ideal para medir variaciones térmicas.",
            videoUrl: "https://www.youtube.com/watch?v=8Wry8lwgGtA",
            imageUrl: "assets/sensores/ntc.svg",
            specs: {
                "Tipo": "Coeficiente de Temperatura Negativo (NTC)",
                "Resistencia Nominal": "10kΩ a 25°C",
                "Constante (Valor B)": "3950K",
                "Precisión": "±1% o ±5%"
            },
            usageSteps: [
                "Conecta el termistor en configuración de divisor de voltaje junto con una resistencia fija (comúnmente de 10k).",
                "Conecta el punto medio del divisor a un pin analógico de Arduino (ej. A0).",
                "Utiliza la ecuación de Steinhart-Hart en tu código para convertir el valor analógico leído en grados Celsius.",
                "Ten cuidado de no superar el voltaje o la corriente máxima para evitar errores por autocalentamiento."
            ],
            type: "Sensor Analógico"
        },
        {
            name: "Fotorresistencia (LDR 5mm)",
            ref: "GL5516 / LDR",
            category: "Sensores y Transductores",
            mainCategory: "Circuitos Integrados",
            desc: "Sensor de luz (Light Dependent Resistor). Componente electrónico cuya resistencia disminuye de forma logarítmica con el aumento de la intensidad de luz que incide sobre él.",
            videoUrl: "https://www.youtube.com/watch?v=D65Gn-2NONU",
            imageUrl: "assets/sensores/ldr.svg",
            specs: {
                "Resistencia en la Oscuridad": "> 1 MΩ",
                "Resistencia a Plena Luz": "10kΩ - 20kΩ (aprox)",
                "Pico Espectral": "540 nm (Luz visible)",
                "Voltaje Máximo": "150V DC"
            },
            usageSteps: [
                "Conecta la LDR en serie con una resistencia fija (ej. 10k) formando un divisor de tensión.",
                "Conecta uno de los extremos a 5V, el otro a GND y el empalme central a un pin analógico.",
                "En Arduino, utiliza la función analogRead() para detectar cambios numéricos según la luz.",
                "Mapea los valores obtenidos (0-1023) a niveles de luminosidad o úsalos para activar un relé cuando oscurece."
            ],
            type: "Sensor Óptico"
        },
        {
            name: "Módulo Ultrasónico HC-SR04",
            ref: "HC-SR04",
            category: "Sensores y Transductores",
            mainCategory: "Circuitos Integrados",
            desc: "Sensor transductor acústico que utiliza ondas de sonido de alta frecuencia para determinar la distancia a un obstáculo. Fundamental en robótica para evasión.",
            videoUrl: "https://www.youtube.com/watch?v=mlw3APOUt8U",
            imageUrl: "assets/sensores/hcsr04.svg",
            specs: {
                "Voltaje de Operación": "5V DC",
                "Corriente Estática": "< 2mA",
                "Rango de Medición": "2cm a 400cm",
                "Precisión": "3mm"
            },
            usageSteps: [
                "Conecta VCC a 5V y GND a tierra del Arduino.",
                "Conecta el pin TRIG a un pin digital (para emitir la señal) y ECHO a otro digital (para recibir el rebote).",
                "Envía un pulso ALTO por 10 microsegundos al pin TRIG.",
                "Usa pulseIn() en el pin ECHO para medir el tiempo de respuesta y convertir ese tiempo en distancia (Velocidad del Sonido)."
            ],
            type: "Sensor de Medición"
        },
        {
            name: "Sensor de Temperatura y Humedad DHT11",
            ref: "DHT11",
            category: "Sensores y Transductores",
            mainCategory: "Circuitos Integrados",
            desc: "Sensor digital compuesto que calibra y emite datos tanto de humedad relativa como de temperatura ambiental en una sola lectura a través de un bus de datos único.",
            videoUrl: "https://www.youtube.com/watch?v=9Ndak-JaSdg",
            imageUrl: "assets/sensores/dht11.svg",
            specs: {
                "Rango de Humedad": "20-90% RH (±5% RH)",
                "Rango de Temperatura": "0-50 °C (±2 °C)",
                "Protocolo": "Digital / One-Wire nativo",
                "Voltaje de Operación": "3.3V a 5V"
            },
            usageSteps: [
                "Descarga e instala la librería DHT (ej. proporcionada por Adafruit) en el IDE de Arduino.",
                "Conecta VCC a 5V, GND a tierra y el pin DATA a un pin digital de Arduino.",
                "Incluye un resistor Pull-up de 10k entre VCC y DATA si usas el componente base (los módulos ya lo traen).",
                "Usa sentencias como dht.readTemperature() y dht.readHumidity() para obtener datos inmediatos."
            ],
            type: "Sensor Digital"
        },
        {
            name: "Zumbador Piezoeléctrico (Buzzer)",
            ref: "Buzzer Pasivo/Activo",
            category: "Sensores y Transductores",
            mainCategory: "Circuitos Integrados",
            desc: "Transductor electroacústico que convierte una señal eléctrica de oscilación en sonido audible. Se usa ampliamente para generar pitidos, alarmas y melodías.",
            videoUrl: "https://www.youtube.com/watch?v=dc6_9VMarjI",
            imageUrl: "assets/sensores/buzzer.svg",
            specs: {
                "Voltaje de Operación": "3.3V a 5V (típicamente)",
                "Frecuencia Resonante (Pasivo)": "Controlable (Ej: 2kHz - 4kHz)",
                "Tipo de Sonido": "Bip / Tono (Activo) o Frecuencias (Pasivo)",
                "Consumo Promedio": "~30mA"
            },
            usageSteps: [
                "Identifica si es activo (tiene un oscilador interno y pita al recibir 5V) o pasivo (requiere una onda cuadrada como PWM).",
                "Conecta el pin positivo a un pin de Arduino y el negativo a GND.",
                "Para el pasivo: Usa la función tone() indicando el pin y la frecuencia deseada en Hertzios (ej: tone(8, 1000)).",
                "Si es activo clásico, basta escribir un HIGH seguido de un delay y un LOW para generar tonos intermitentes."
            ],
            type: "Transductor Acústico"
        }
    ];

    // --- Lógica de Favoritos ---
    window.getFavorites = function() {
        try {
            return JSON.parse(localStorage.getItem('electro_favorites') || '[]');
        } catch(e) { return []; }
    };
    window.isFavorite = function(ref) {
        return window.getFavorites().includes(ref);
    };
    window.toggleFavorite = function(ref, event) {
        if(event) event.stopPropagation();
        const favs = window.getFavorites();
        const idx = favs.indexOf(ref);
        if(idx === -1) {
            favs.push(ref);
            showToast('⭐ Añadido a Favoritos');
        } else {
            favs.splice(idx, 1);
            showToast('🗑️ Eliminado de Favoritos');
        }
        localStorage.setItem('electro_favorites', JSON.stringify(favs));
        
        // Actualizar UI
        document.querySelectorAll(`.btn-fav-star[data-ref="${ref}"]`).forEach(btn => {
            btn.classList.toggle('active', idx === -1);
            btn.innerHTML = (idx === -1) ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
        });

        if(window.location.hash === '#favoritos') {
            window.renderFavorites();
        }
    };
    window.renderFavorites = function() {
        const grid = document.getElementById('favorites-grid');
        const msg = document.querySelector('.no-favorites-msg');
        if(!grid) return;
        const favs = window.getFavorites();
        
        // Limpiar todas las cards previas (excepto el mensaje)
        Array.from(grid.children).forEach(child => {
            if(!child.classList.contains('no-favorites-msg')) child.remove();
        });

        if(favs.length === 0) {
            msg.style.display = 'block';
            return;
        }
        msg.style.display = 'none';

        const favItems = equipmentData.filter(item => favs.includes(item.ref));
        favItems.forEach(item => {
            const card = document.createElement('div');
            card.className = 'result-card glass neon-border';
            card.innerHTML = `
                <button class="btn-fav-star active" title="Quitar de Favoritos" data-ref="${item.ref}" onclick="window.toggleFavorite('${item.ref}', event)">
                    <i class="fas fa-star"></i>
                </button>
                ${item.imageUrl ? `
                <div class="result-image-container">
                    <img src="${item.imageUrl}" alt="${item.name}" onerror="this.parentElement.style.display='none'">
                </div>` : ''}
                <div class="result-info">
                    <span class="category-badge">${item.category}</span>
                    <h4>${item.name}</h4>
                    <span class="ref-tag">MODELO/REF: ${item.ref}</span>
                </div>
                <div class="card-footer">
                    <button class="btn-details" onclick="showDetails('${item.ref}')">
                        <i class="fas fa-eye"></i> Detalles
                    </button>
                </div>
            `;
            grid.appendChild(card);
        });
    };

    const normalize = (text) => text ? text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function performSearch() {
        const query = normalize(mainSearch.value.trim());
        const searchUI = document.getElementById('search-ui-results');
        if (query.length < 2) { searchUI.style.display = 'none'; return; }
        const filtered = equipmentData.filter(item =>
            normalize(item.name).includes(query) ||
            normalize(item.ref).includes(query) ||
            normalize(item.category).includes(query)
        );
        displayResults(filtered);
    }

    function displayResults(results) {
        const searchUI = document.getElementById('search-ui-results');
        const resultsGrid = document.getElementById('results-grid');
        resultsGrid.innerHTML = '';
        searchUI.style.display = 'block';
        if (results.length === 0) {
            resultsGrid.innerHTML = '<p class="no-results">No se encontraron dispositivos.</p>';
            return;
        }
        results.forEach(item => {
            const card = document.createElement('div');
            card.className = 'result-card glass neon-border';
            card.innerHTML = `
                <button class="btn-fav-star ${window.isFavorite(item.ref) ? 'active' : ''}" title="Añadir a Favoritos" data-ref="${item.ref}" onclick="window.toggleFavorite('${item.ref}', event)">
                    <i class="${window.isFavorite(item.ref) ? 'fas' : 'far'} fa-star"></i>
                </button>
                ${item.imageUrl ? `
                <div class="result-image-container">
                    <img src="${item.imageUrl}" alt="${item.name}" onerror="this.parentElement.style.display='none'">
                </div>` : ''}
                <div class="result-info">
                    <span class="category-badge">${item.category}</span>
                    <h4>${item.name}</h4>
                    <span class="ref-tag">MODELO/REF: ${item.ref}</span>
                </div>
                <div class="card-footer">
                    <button class="btn-details" onclick="showDetails('${item.ref}')">
                        <i class="fas fa-eye"></i> Detalles
                    </button>
                </div>
            `;
            resultsGrid.appendChild(card);
        });
    }

    window.showDetails = function (ref) {
        const item = equipmentData.find(e => e.ref === ref);
        if (!item) return;
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content glass" id="modal-print-area">
                <button class="close-modal">&times;</button>

                <!-- Botones UX: Compartir y PDF -->
                <div class="modal-ux-actions">
                    <button class="modal-ux-btn btn-fav-star ${window.isFavorite(item.ref) ? 'active' : ''}" style="position:static; margin-right:auto; margin-bottom: 5px; width:auto; border-radius:12px; height: 38px" data-ref="${item.ref}" onclick="window.toggleFavorite('${item.ref}', event)" title="${window.isFavorite(item.ref) ? 'Quitar de Favoritos' : 'Añadir a Favoritos'}">
                        <i class="${window.isFavorite(item.ref) ? 'fas' : 'far'} fa-star"></i>
                    </button>
                    <button class="modal-ux-btn" id="btn-share-component" title="Copiar información">
                        <i class="fas fa-share-alt"></i> Compartir
                    </button>
                    <button class="modal-ux-btn modal-ux-btn--pdf" id="btn-export-pdf" title="Exportar a PDF">
                        <i class="fas fa-file-pdf"></i> Exportar PDF
                    </button>
                </div>

                <div class="modal-body">
                    <div class="specs-section">
                        <h2>${item.name}</h2>
                        <div class="specs-grid">
                            ${Object.entries(item.specs).map(([key, val]) => {
            const strVal = val.toString();
            const isImageUrl = strVal.match(/\.(jpg|jpeg|png|gif|svg|webp)(\?.*)?$/i) !== null || strVal.startsWith('data:image/');
            const isPdfUrl = strVal.startsWith('http') && !isImageUrl;
            let displayVal;
            if (isImageUrl) {
                displayVal = `<div class="spec-img-container">
                                            <img src="${strVal}" alt="${key}" class="spec-datasheet-img"
                                                 onerror="this.parentElement.style.display='none'">
                                        </div>`;
            } else if (isPdfUrl) {
                displayVal = `<a href="${strVal}" target="_blank" class="spec-link">Ver PDF <i class="fas fa-external-link-alt"></i></a>`;
            } else {
                displayVal = strVal;
            }
            return `
                                <div class="spec-item ${isImageUrl ? 'spec-item-full' : ''}">
                                    <span class="spec-label">${key}</span>
                                    <span class="spec-value">${displayVal}</span>
                                </div>`;
        }).join('')}
                        </div>
                        ${item.videoUrl ? `<a href="${item.videoUrl}" target="_blank" class="btn-video"><i class="fab fa-youtube"></i> VER VIDEO TUTORIAL</a>` : ''}
                    </div>
                    <div class="usage-section">
                        <h3><i class="fas fa-tools"></i> Guía / Instrucciones</h3>
                        <ul class="usage-list">${item.usageSteps.map(step => `<li>${step}</li>`).join('')}</ul>
                        ${item.imageUrl ? `
                        <div class="equipment-image-container">
                            <img src="${item.imageUrl}" alt="${item.name}" class="equipment-image"
                                 onerror="this.parentElement.style.display='none'">
                        </div>` : ''}
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('active'), 10);
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.onclick = () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 400);
        };
        modal.onclick = (e) => { if (e.target === modal) closeBtn.onclick(); };

        // ---- Botón Compartir ----
        const shareBtn = modal.querySelector('#btn-share-component');
        shareBtn.addEventListener('click', () => {
            const specsText = Object.entries(item.specs)
                .filter(([, v]) => !v.toString().match(/\.(jpg|png|svg|gif|webp)/i) && !v.toString().startsWith('data:image'))
                .map(([k, v]) => `• ${k}: ${v}`)
                .join('\n');
            const text = `⚡ ${item.name} (${item.ref})\nCategoría: ${item.category}\n\n${item.desc}\n\nEspecificaciones:\n${specsText}\n\n🔗 Busca más en ElectroIdentify`;
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(() => showToast('✅ Información copiada al portapapeles'));
            } else {
                const ta = document.createElement('textarea');
                ta.value = text;
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                ta.remove();
                showToast('✅ Información copiada al portapapeles');
            }
        });

        // ---- Botón Exportar PDF ----
        const pdfBtn = modal.querySelector('#btn-export-pdf');
        pdfBtn.addEventListener('click', () => {
            // Añadir clase de impresión al body para activar estilos @media print
            document.body.classList.add('printing-modal');
            window.print();
            document.body.classList.remove('printing-modal');
        });
    };

    // Inicialización dinámica de subcategorías
    function setupCategories() {
        const subGrid = document.getElementById('subcategory-grid');
        const mainCards = document.querySelectorAll('.main-category-card');

        mainCards.forEach(card => {
            card.addEventListener('click', () => {
                const mainCategory = card.dataset.mainCategory || card.querySelector('h3').textContent;

                // Si estamos en la página de inicio (sin hash), abrir en nueva pestaña
                if (!window.location.hash || window.location.hash === '' || window.location.hash === '#') {
                    const isAparatos = mainCategory.toLowerCase().includes('aparatos');
                    const targetHash = isAparatos ? '#aparatos' : '#circuitos';
                    const baseUrl = window.location.href.split('#')[0];
                    window.open(baseUrl + targetHash, '_blank');
                } else {
                    // Si ya estamos en una pestaña de categoría, navegar en la misma ventana
                    renderSubcategories(mainCategory);
                    showPage(subcategoryPage);
                }
            });
        });
    }

    function renderSubcategories(mainCategory) {
        const subGrid = document.getElementById('subcategory-grid');
        const subTitle = document.getElementById('subcategory-title');
        const subSubtitle = document.getElementById('subcategory-subtitle');

        if (subTitle) subTitle.textContent = mainCategory;
        if (subSubtitle) subSubtitle.textContent = `Selecciona una subcategoría de ${mainCategory.toLowerCase()} para explorar.`;

        // Obtener subcategorías únicas para esta categoría principal
        const subs = [...new Set(equipmentData
            .filter(item => item.mainCategory === mainCategory)
            .map(item => item.category))];

        subGrid.innerHTML = '';
        subs.forEach(sub => {
            const count = equipmentData.filter(i => i.category === sub && i.mainCategory === mainCategory).length;
            const card = document.createElement('div');
            card.className = 'equipment-card glass neon-border';
            card.innerHTML = `
                <div class="card-icon">
                    <i class="${getIconForSub(sub)}"></i>
                </div>
                <h3>${sub}</h3>
                <p>${count} Dispositivos</p>
                <div class="card-glow"></div>
            `;
            card.addEventListener('click', () => {
                const prefix = mainCategory.includes('Aparatos') ? '#aparatos' : '#circuitos';
                window.location.hash = `${prefix}/${encodeURIComponent(sub)}`;
            });
            subGrid.appendChild(card);
        });
    }

    function getIconForSub(sub) {
        const icons = {
            "Osciloscopios": "fas fa-wave-square",
            "Multímetros Digitales": "fas fa-bolt",
            "Fuentes de Poder": "fas fa-plug",
            "Generadores de Señales": "fas fa-signal",
            "Estaciones de Soldadura": "fas fa-fire",
            "Analizadores Lógicos": "fas fa-microchip",
            "Resistencias": "fas fa-grip-lines",
            "Capacitores": "fas fa-battery-half",
            "Transistores": "fas fa-project-diagram",
            "Diodos": "fas fa-arrow-right",
            "Bobinas": "fas fa-redo",
            "Circuitos Integrados": "fas fa-memory",
            "Relés": "fas fa-toggle-on",
            "Potenciómetros": "fas fa-sliders-h",
            "Sensores y Transductores": "fas fa-satellite-dish"
        };
        return icons[sub] || "fas fa-microchip";
    }

    function openCategory(category, mainCategory, pushHash = true) {
        if (pushHash) {
            const prefix = mainCategory.includes('Aparatos') ? '#aparatos' : '#circuitos';
            window.location.hash = `${prefix}/${encodeURIComponent(category)}`;
            return; // handleRouting se encargará del resto
        }
        const filtered = equipmentData.filter(item =>
            normalize(item.category) === normalize(category) &&
            item.mainCategory === mainCategory
        );

        const catalogTitle = document.getElementById('catalog-title');
        const catalogSubtitle = document.getElementById('catalog-subtitle');
        if (catalogTitle) catalogTitle.textContent = category;
        if (catalogSubtitle) catalogSubtitle.textContent = `${filtered.length} elementos encontrados.`;

        catalogGrid.innerHTML = '';
        filtered.forEach(item => {
            const card = document.createElement('div');
            card.className = 'result-card glass neon-border animate';
            card.innerHTML = `
                ${item.imageUrl ? `
                <div class="result-image-container">
                    <img src="${item.imageUrl}" alt="${item.name}" onerror="this.parentElement.style.display='none'">
                </div>` : ''}
                <div class="result-info">
                    <span class="category-badge">${item.category}</span>
                    <h4>${item.name}</h4>
                    <span class="ref-tag">REF: ${item.ref}</span>
                    <p class="desc-preview">${item.desc}</p>
                </div>
                <div class="card-footer">
                    <button class="btn-details" onclick="showDetails('${item.ref}')">
                        <i class="fas fa-eye"></i> Ver Detalles
                    </button>
                </div>
            `;
            catalogGrid.appendChild(card);
        });
        showPage(catalogPage);
    }

    if (backToHomeSub) {
        backToHomeSub.addEventListener('click', () => {
            window.location.hash = '';
        });
    }

    if (backToHome) {
        backToHome.addEventListener('click', () => {
            window.location.hash = '';
        });
    }

    if (backToSub) {
        backToSub.addEventListener('click', () => {
            const currentHash = window.location.hash;
            if (currentHash.includes('/')) {
                window.location.hash = currentHash.split('/')[0];
            } else {
                window.location.hash = '';
            }
        });
    }

    setupCategories();
    mainSearch.addEventListener('input', debounce(performSearch, 300));
    window.addEventListener('scroll', () => {
        const headerEl = document.getElementById('header');
        if (headerEl) headerEl.classList.toggle('scrolled', window.scrollY > 50);
    });

    // --- Lógica de Cámara Móvil ---
    const mobileCameraSection = document.getElementById('mobile-camera-section');
    const startCameraBtn = document.getElementById('start-camera');
    const capturePhotoBtn = document.getElementById('capture-photo');
    const videoFeed = document.getElementById('video-feed');
    const captureCanvas = document.getElementById('capture-canvas');
    const scanLine = document.querySelector('.scan-line');
    const cameraOverlay = document.getElementById('camera-status-overlay');
    const cameraStatusText = document.getElementById('camera-status-text');
    let videoStream = null;
    let net = null; // Modelo de IA MobileNet

    // Verificación de Contexto Seguro (HTTPS)
    if (window.location.protocol === 'file:' || window.location.protocol === 'http:') {
        console.warn("Contexto no seguro. La cámara podría no funcionar.");
        // Opcional: mostrar un mensaje sutil al usuario más tarde si intenta abrir la cámara
    }

    // Verificación de Librerías Externas
    function checkLibraries() {
        if (typeof Tesseract === 'undefined') {
            console.error("Tesseract.js no cargó.");
            alert("Error: No se pudo cargar el motor de lectura (Tesseract). Verifica tu conexión a internet.");
        }
        if (typeof tf === 'undefined' || typeof mobilenet === 'undefined') {
            console.error("TensorFlow/MobileNet no cargó.");
            console.warn("La IA de forma no estará disponible, se usará solo texto.");
        }
    }
    setTimeout(checkLibraries, 2000); // Dar tiempo a los CDNs

    // Cargar modelo de IA al inicio
    async function loadAIModel() {
        console.log("Cargando cerebro de IA...");
        try {
            if (typeof mobilenet !== 'undefined') {
                net = await mobilenet.load();
                console.log("IA lista para reconocer objetos.");
            }
        } catch (err) {
            console.error("Error cargando IA:", err);
        }
    }
    loadAIModel();

    // Detección de móvil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (window.innerWidth <= 768);

    if (isMobile && mobileCameraSection) {
        mobileCameraSection.style.display = 'flex';
    }

    if (startCameraBtn) {
        startCameraBtn.addEventListener('click', async () => {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                alert("Tu navegador no soporta el acceso a la cámara o no estás en una conexión segura (HTTPS).");
                return;
            }
            try {
                videoStream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'environment' },
                    audio: false
                });
                videoFeed.srcObject = videoStream;
                await videoFeed.play(); // Forzar reproducción
                startCameraBtn.style.display = 'none';
                capturePhotoBtn.style.display = 'flex';
                if (scanLine) scanLine.style.display = 'block';
            } catch (err) {
                console.error("Error al acceder a la cámara:", err);
                alert("No se pudo acceder a la cámara o permisos denegados.");
            }
        });
    }

    if (capturePhotoBtn) {
        capturePhotoBtn.addEventListener('click', async () => {
            if (!videoStream) return;

            // Congelar video y mostrar feedback
            videoFeed.pause();
            if (scanLine) {
                scanLine.style.animationIterationCount = 'infinite';
                scanLine.style.background = 'var(--accent)';
            }

            // Dibujar en canvas para procesar
            const context = captureCanvas.getContext('2d');
            captureCanvas.width = videoFeed.videoWidth;
            captureCanvas.height = videoFeed.videoHeight;
            context.drawImage(videoFeed, 0, 0);

            try {
                // Mostrar overlay de análisis
                if (cameraOverlay) {
                    cameraOverlay.classList.remove('hidden');
                    if (cameraStatusText) cameraStatusText.innerText = "Analizando...";
                }

                // 1. Identificación por IA (Forma)
                let aiCategory = "";
                if (net) {
                    const predictions = await net.classify(captureCanvas);
                    console.log("IA predice:", predictions);
                    const topLabel = predictions[0].className.toLowerCase();

                    if (topLabel.includes('meter') || topLabel.includes('multimeter')) aiCategory = "Multímetros Digitales";
                    else if (topLabel.includes('oscilloscope')) aiCategory = "Osciloscopios";
                    else if (topLabel.includes('power supply')) aiCategory = "Fuentes de Poder";
                    else if (topLabel.includes('microchip') || topLabel.includes('chip') || topLabel.includes('cpu') || topLabel.includes('circuit')) aiCategory = "Circuitos Integrados";
                    else if (topLabel.includes('resistor') || topLabel.includes('potentiometer')) aiCategory = "Resistencias";
                    else if (topLabel.includes('capacitor')) aiCategory = "Capacitores";
                    else if (topLabel.includes('transistor')) aiCategory = "Transistores";
                    else if (topLabel.includes('diode')) aiCategory = "Diodos";
                    else if (topLabel.includes('switch') || topLabel.includes('button')) aiCategory = "Interruptores";
                    else if (topLabel.includes('generator')) aiCategory = "Generadores de Señales";
                    else if (topLabel.includes('coil') || topLabel.includes('inductor') || topLabel.includes('transformer')) aiCategory = "Bobinas";
                }

                // 2. Identificación por OCR (Texto)
                const { data: { text } } = await Tesseract.recognize(captureCanvas, 'eng+spa');
                console.log("OCR detecta:", text);

                // 3. Motor de Búsqueda Híbrido Protegido y Sensible
                const searchTerms = text.replace(/[^a-zA-Z0-9\s]/g, ' ').toLowerCase().split(/\s+/).filter(t => t.length >= 2);
                let bestMatch = null;
                let highestScore = 0;

                equipmentData.forEach(item => {
                    let score = 0;
                    const itemName = item.name.toLowerCase();
                    const itemRef = item.ref.toLowerCase();
                    const itemCat = item.category;

                    // Bono por categoría detectada por IA (Muy alto para filtrar ruido)
                    if (aiCategory && itemCat === aiCategory) score += 15;

                    searchTerms.forEach(term => {
                        // Coincidencia exacta o parcial en nombre
                        if (itemName.includes(term)) score += 3;

                        // Coincidencia fuerte en referencia (Crucial para chips)
                        if (itemRef.includes(term) || term.includes(itemRef)) {
                            score += 10;
                            // Si es coincidencia casi exacta en referencia, bono máximo
                            if (term === itemRef || term.length > 3 && itemRef.includes(term)) score += 5;
                        }
                    });

                    if (score > highestScore) {
                        highestScore = score;
                        bestMatch = item;
                    }
                });

                if (bestMatch && highestScore >= 2) {
                    showDetails(bestMatch.ref);
                } else {
                    // Mostrar sugerencia de búsqueda externa si la interna falla o es incierta
                    showExternalSearchOptions(aiCategory, searchTerms);
                }

            } catch (err) {
                console.error("Error en identificación:", err);
                alert("Error al analizar la imagen.");
            } finally {
                if (cameraOverlay) cameraOverlay.classList.add('hidden');
                resetCamera();
            }
        });
    }

    function showExternalSearchOptions(aiCategory, searchTerms) {
        const resultsGrid = document.getElementById('results-grid');
        const searchUI = document.getElementById('search-ui-results');
        if (!resultsGrid || !searchUI) return;

        searchUI.style.display = 'block';
        const query = searchTerms.join(' ') || aiCategory || "componente electrónico";
        const youtubeQuery = encodeURIComponent(`${query} tutorial español`);
        const googleQuery = encodeURIComponent(`${query} datasheet pdf`);

        resultsGrid.innerHTML = `
            <div class="external-search-card glass neon-border">
                <div class="ai-badge">IA: Búsqueda Externa</div>
                <h3>¿No es lo que buscabas?</h3>
                <p>La IA detectó: <strong>${aiCategory || 'Componente'}</strong>. Prueba con estos enlaces directos:</p>
                <div class="external-links-grid">
                    <a href="https://www.youtube.com/results?search_query=${youtubeQuery}" target="_blank" class="btn-external yt">
                        <i class="fab fa-youtube"></i> Ver Video Tutoriales
                    </a>
                    <a href="https://www.google.com/search?q=${googleQuery}" target="_blank" class="btn-external google">
                        <i class="fab fa-google"></i> Buscar Especificaciones
                    </a>
                </div>
                <button class="btn-details" onclick="document.getElementById('search-ui-results').style.display='none'">
                    Volver a intentar
                </button>
            </div>
        `;
    }

    // Soporte para carga de archivos con IA + OCR
    const photoUpload = document.getElementById('photo-upload');
    if (photoUpload) {
        photoUpload.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = async (event) => {
                const img = new Image();
                img.onload = async () => {
                    captureCanvas.width = img.width;
                    captureCanvas.height = img.height;
                    const ctx = captureCanvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);

                    try {
                        let aiCategory = "";
                        if (net) {
                            const predictions = await net.classify(captureCanvas);
                            const topLabel = predictions[0].className.toLowerCase();
                            if (topLabel.includes('meter') || topLabel.includes('multimeter')) aiCategory = "Multímetros Digitales";
                            if (topLabel.includes('oscilloscope')) aiCategory = "Osciloscopios";
                        }

                        const { data: { text } } = await Tesseract.recognize(captureCanvas, 'eng+spa');
                        const searchTerms = text.toLowerCase().split(/\s+/).filter(t => t.length > 2);

                        let bestMatch = null;
                        let highestScore = 0;

                        equipmentData.forEach(item => {
                            let score = 0;
                            if (aiCategory && item.category === aiCategory) score += 10;
                            searchTerms.forEach(term => {
                                if (item.name.toLowerCase().includes(term)) score += 3;
                                if (item.ref.toLowerCase().includes(term)) score += 7;
                            });
                            if (score > highestScore) {
                                highestScore = score;
                                bestMatch = item;
                            }
                        });

                        if (bestMatch && highestScore > 5) {
                            showDetails(bestMatch.ref);
                        } else {
                            alert("No pudimos identificar este componente. Intenta con una foto más clara.");
                        }
                    } catch (err) {
                        alert("Error al procesar la imagen.");
                    }
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });
    }

    function resetCamera() {
        if (videoStream) {
            videoStream.getTracks().forEach(track => track.stop());
            videoStream = null;
        }
        videoFeed.srcObject = null;
        startCameraBtn.style.display = 'block';
        capturePhotoBtn.style.display = 'none';
        scanLine.style.display = 'none';
        scanLine.style.animationIterationCount = 'infinite';
    }

    // Detener cámara si se cambia de pestaña
    tabBtns.forEach(btn => btn.addEventListener('click', (e) => {
        if (btn.dataset.tab !== 'photo') resetCamera();

        if (btn.dataset.tab === 'photo') {
            // Si estamos en el inicio y hacemos clic en foto, abrir pestaña nueva
            if (!window.location.hash || window.location.hash === '#') {
                e.preventDefault();
                window.open(window.location.pathname + '#camera', '_blank');
                return;
            }
        }

        if (!btn.dataset.tab) return; // Ignorar botones sin data-tab (como Calculadoras)
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const isPhoto = btn.dataset.tab === 'photo';
        searchByText.style.display = isPhoto ? 'none' : 'block';
        searchByPhoto.style.display = isPhoto ? 'block' : 'none';
    }));
    // Inicializar el ruteo después de que todo esté cargado
    // --- Lógica de Calculadoras Avanzadas ---
    const ledVs = document.getElementById('led-vs');
    const ledVl = document.getElementById('led-vl');
    const ledI = document.getElementById('led-i');
    const ledResult = document.getElementById('led-result');

    function updateLED() {
        if (!ledVs || !ledVl || !ledI || !ledResult) return;
        const vs = parseFloat(ledVs.value);
        const vl = parseFloat(ledVl.value);
        const i = parseFloat(ledI.value) / 1000;
        if (vs > 0 && vl > 0 && i > 0) {
            if (vs <= vl) {
                ledResult.innerHTML = `<span style="color:#ff4d4d">Error: Vs debe ser > Vl</span>`;
                return;
            }
            const r = (vs - vl) / i;
            const p = (vs - vl) * i;
            let pSug = "1/4W";
            if (p > 1) pSug = "2W+";
            else if (p > 0.5) pSug = "1W";
            else if (p > 0.25) pSug = "1/2W";
            else if (p > 0.125) pSug = "1/4W";
            else pSug = "1/8W";

            ledResult.innerHTML = `R: <strong>${Math.round(r)} Ω</strong> | Potencia: <strong>${p.toFixed(3)}W</strong><br><small>Sugerencia: Usar resistencia de ${pSug}</small>`;
        }
    }

    [ledVs, ledVl, ledI].forEach(input => input && input.addEventListener('input', updateLED));

    const t555R1 = document.getElementById('t555-r1');
    const t555R2 = document.getElementById('t555-r2');
    const t555C = document.getElementById('t555-c');
    const t555Result = document.getElementById('t555-result');

    function update555() {
        if (!t555R1 || !t555R2 || !t555C || !t555Result) return;
        const r1 = parseFloat(t555R1.value);
        const r2 = parseFloat(t555R2.value);
        const c = parseFloat(t555C.value) / 1000000;
        if (r1 > 0 && r2 > 0 && c > 0) {
            const freq = 1.44 / ((r1 + 2 * r2) * c);
            const dc = ((r1 + r2) / (r1 + 2 * r2)) * 100;
            t555Result.innerHTML = `Frecuencia: <strong>${freq > 1000 ? (freq / 1000).toFixed(2) + ' kHz' : freq.toFixed(2) + ' Hz'}</strong><br>Duty Cycle: <strong>${dc.toFixed(1)}%</strong>`;
        }
    }

    [t555R1, t555R2, t555C].forEach(input => input && input.addEventListener('input', update555));

    const divVin = document.getElementById('div-vin');
    const divR1 = document.getElementById('div-r1');
    const divR2 = document.getElementById('div-r2');
    const divResult = document.getElementById('div-result');

    function updateDivider() {
        if (!divVin || !divR1 || !divR2 || !divResult) return;
        const vin = parseFloat(divVin.value);
        const r1 = parseFloat(divR1.value);
        const r2 = parseFloat(divR2.value);
        if (vin >= 0 && r1 > 0 && r2 > 0) {
            const vout = vin * (r2 / (r1 + r2));
            divResult.innerHTML = `Vout: <strong>${vout.toFixed(2)} V</strong>`;
        }
    }

    [divVin, divR1, divR2].forEach(input => input && input.addEventListener('input', updateDivider));

    // --- Lógica del Visor de Pinouts ---
    // (pinTabs y pinoutViewer declarados arriba)

    const pinoutData = {
        ne555: {
            pins: [
                { num: 1, label: "GND", side: "left" },
                { num: 2, label: "TRIG", side: "left" },
                { num: 3, label: "OUT", side: "left" },
                { num: 4, label: "RESET", side: "left" },
                { num: 8, label: "VCC", side: "right" },
                { num: 7, label: "DISCH", side: "right" },
                { num: 6, label: "THRESH", side: "right" },
                { num: 5, label: "CTRL", side: "right" }
            ]
        },
        lm741: {
            pins: [
                { num: 1, label: "OFF-N1", side: "left" },
                { num: 2, label: "INV-IN", side: "left" },
                { num: 3, label: "N-INV", side: "left" },
                { num: 4, label: "V-", side: "left" },
                { num: 8, label: "V+", side: "right" },
                { num: 7, label: "OUT", side: "right" },
                { num: 6, label: "OFF-N2", side: "right" },
                { num: 5, label: "NC", side: "right" }
            ]
        },
        lm324n: {
            pins: [
                { num: 1, label: "OUT 1", side: "left" },
                { num: 2, label: "IN 1-", side: "left" },
                { num: 3, label: "IN 1+", side: "left" },
                { num: 4, label: "V+", side: "left" },
                { num: 5, label: "IN 2+", side: "left" },
                { num: 6, label: "IN 2-", side: "left" },
                { num: 7, label: "OUT 2", side: "left" },
                { num: 14, label: "OUT 4", side: "right" },
                { num: 13, label: "IN 4-", side: "right" },
                { num: 12, label: "IN 4+", side: "right" },
                { num: 11, label: "V- (GND)", side: "right" },
                { num: 10, label: "IN 3+", side: "right" },
                { num: 9, label: "IN 3-", side: "right" },
                { num: 8, label: "OUT 3", side: "right" }
            ]
        },
        lm3914n: {
            pins: [
                { num: 1, label: "LED 1", side: "left" },
                { num: 2, label: "V-", side: "left" },
                { num: 3, label: "V+", side: "left" },
                { num: 4, label: "RLO", side: "left" },
                { num: 5, label: "SIG", side: "left" },
                { num: 6, label: "RHI", side: "left" },
                { num: 7, label: "REF OUT", side: "left" },
                { num: 8, label: "REF ADJ", side: "left" },
                { num: 9, label: "MODE", side: "left" },
                { num: 18, label: "LED 2", side: "right" },
                { num: 17, label: "LED 3", side: "right" },
                { num: 16, label: "LED 4", side: "right" },
                { num: 15, label: "LED 5", side: "right" },
                { num: 14, label: "LED 6", side: "right" },
                { num: 13, label: "LED 7", side: "right" },
                { num: 12, label: "LED 8", side: "right" },
                { num: 11, label: "LED 9", side: "right" },
                { num: 10, label: "LED 10", side: "right" }
            ]
        },
        atmega328: {
            pins: [
                { num: 1, label: "PC6/RST", side: "left" },
                { num: 2, label: "PD0/RX", side: "left" },
                { num: 3, label: "PD1/TX", side: "left" },
                { num: 4, label: "PD2/INT0", side: "left" },
                { num: 5, label: "PD3/PWM", side: "left" },
                { num: 6, label: "PD4", side: "left" },
                { num: 7, label: "VCC", side: "left" },
                { num: 8, label: "GND", side: "left" },
                { num: 9, label: "PB6/XTAL", side: "left" },
                { num: 10, label: "PB7/XTAL", side: "left" },
                { num: 11, label: "PD5/PWM", side: "left" },
                { num: 12, label: "PD6/PWM", side: "left" },
                { num: 13, label: "PD7", side: "left" },
                { num: 14, label: "PB0", side: "left" },
                { num: 28, label: "PC5/SCL", side: "right" },
                { num: 27, label: "PC4/SDA", side: "right" },
                { num: 26, label: "PC3", side: "right" },
                { num: 25, label: "PC2", side: "right" },
                { num: 24, label: "PC1", side: "right" },
                { num: 23, label: "PC0", side: "right" },
                { num: 22, label: "GND", side: "right" },
                { num: 21, label: "AREF", side: "right" },
                { num: 20, label: "AVCC", side: "right" },
                { num: 19, label: "PB5/SCK", side: "right" },
                { num: 18, label: "PB4/MISO", side: "right" },
                { num: 17, label: "PB3/MOSI", side: "right" },
                { num: 16, label: "PB2/SS", side: "right" },
                { num: 15, label: "PB1/PWM", side: "right" }
            ],
            type: "atmega"
        },
        esp32: {
            pins: [
                { num: 1, label: "EN / RST", side: "left" },
                { num: 2, label: "VP (G36)", side: "left" },
                { num: 3, label: "VN (G39)", side: "left" },
                { num: 4, label: "D34", side: "left" },
                { num: 5, label: "D35", side: "left" },
                { num: 6, label: "D32", side: "left" },
                { num: 7, label: "D33", side: "left" },
                { num: 8, label: "D25", side: "left" },
                { num: 9, label: "D26", side: "left" },
                { num: 10, label: "D27", side: "left" },
                { num: 11, label: "D14", side: "left" },
                { num: 12, label: "D12", side: "left" },
                { num: 13, label: "D13", side: "left" },
                { num: 14, label: "GND", side: "left" },
                { num: 15, label: "VIN (5V)", side: "left" },
                { num: 30, label: "D23/MSI", side: "right" },
                { num: 29, label: "D22/SCL", side: "right" },
                { num: 28, label: "TX0", side: "right" },
                { num: 27, label: "RX0", side: "right" },
                { num: 26, label: "D21/SDA", side: "right" },
                { num: 25, label: "D19/MSO", side: "right" },
                { num: 24, label: "D18/SCK", side: "right" },
                { num: 23, label: "D5", side: "right" },
                { num: 22, label: "TX2", side: "right" },
                { num: 21, label: "RX2", side: "right" },
                { num: 20, label: "D4", side: "right" },
                { num: 19, label: "D0", side: "right" },
                { num: 18, label: "D2", side: "right" },
                { num: 17, label: "D15", side: "right" },
                { num: 16, label: "3V3", side: "right" }
            ],
            type: "atmega"
        }
    };

    function renderChip(chipId) {
        if (!pinoutViewer) return;
        const data = pinoutData[chipId];
        if (!data) return;

        const leftPins = data.pins.filter(p => p.side === 'left');
        const rightPins = data.pins.filter(p => p.side === 'right');
        rightPins.reverse(); // Standard view: pins go up on the right

        let chipHtml = `
            <div class="chip-dip ${data.type || ''}">
                <div class="chip-notch"></div>
                <div class="chip-label-main">${chipId.toUpperCase()}</div>
                <div class="chip-body-content">
                    ${leftPins.map((lp, idx) => {
                        const rp = rightPins[rightPins.length - 1 - idx];
                        return `
                            <div class="pin-row">
                                <div class="pin-left">
                                    <div class="pin-leg"></div>
                                    <span class="pin-label">${lp.label}</span>
                                    <span class="pin-num">${lp.num}</span>
                                </div>
                                ${rp ? `
                                <div class="pin-right">
                                    <span class="pin-num">${rp.num}</span>
                                    <span class="pin-label">${rp.label}</span>
                                    <div class="pin-leg"></div>
                                </div>
                                ` : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
        pinoutViewer.innerHTML = chipHtml;
    }

    pinTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            pinTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderChip(tab.dataset.chip);
        });
    });

    // Cargar primer chip por defecto
    if (pinTabs.length > 0) renderChip('ne555');

    handleRouting();
});

/* ===================================================
   ANTIGRAVITY AI CHAT ASSISTANT
   Motor de Asistencia Inteligente para Electrónica
   =================================================== */
(function () {
    'use strict';

    /* ---- Base de conocimiento del asistente ---- */
    const AI_KNOWLEDGE = {
        greetings: ['hola', 'buen', 'hey', 'saludos', 'hi', 'hello', 'buenas'],
        help: ['ayuda', 'help', 'qué puedes', 'que puedes', 'cómo funciona', 'como funciona', 'qué haces', 'que haces'],
        ohm: ['ohm', 'voltaje', 'corriente', 'resistencia', 'ley de ohm', 'kirchhoff', 'voltios', 'amperios', 'ohmios'],
        components: ['componente', 'componentes', 'catálogo', 'catalogo', 'qué tienes', 'que tienes', 'lista', 'inventario'],
        sensors: ['sensor', 'sensores', 'temperatura', 'termistor', 'ntc', 'ldr', 'luz', 'ultrasonico', 'ultrasonido', 'hcsr04', 'dht11', 'humedad'],
        calculators: ['calculadora', 'calcular', 'calcul', 'ohm', 'divisor', 'led', '555', 'colores', 'timer'],
        oscilloscope: ['osciloscopio', 'osciloscopo', 'rigol', 'siglent', 'keysight'],
        multimeter: ['multimetro', 'multímetro', 'tester', 'medir', 'medicion'],
        transistor: ['transistor', 'bjt', 'mosfet', 'npn', 'pnp', '2n2222', 'bc547', 'irfz'],
        diode: ['diodo', 'diodos', 'rectificador', 'zener', '1n4007', 'led'],
        capacitor: ['capacitor', 'condensador', 'capacitores', 'capacitancia', 'faradios'],
        resistor: ['resistencia', 'resistencias', 'ohm', 'código de colores', 'banda'],
    };

    const EMOJI_MAP = {
        'Osciloscopios': '📺',
        'Multímetros Digitales': '🔋',
        'Fuentes de Poder': '⚡',
        'Generadores de Señal': '📡',
        'Analizadores de Espectro': '📊',
        'Resistencias': '🎨',
        'Capacitores': '⚙️',
        'Transistores': '💡',
        'Diodos': '🔺',
        'Circuitos Integrados': '🖥️',
        'Inductores y Bobinas': '🌀',
        'Sensores y Transductores': '🌡️',
        'Microcontroladores y SBC': '🤖',
        'Módulos de Comunicación': '📶',
        'Fuentes Conmutadas': '🔌',
        'Módulos de Potencia': '⚡',
    };

    /* ---- Utilidades ---- */
    function normalize(str) {
        return str.toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s]/g, ' ');
    }

    function containsAny(text, words) {
        const norm = normalize(text);
        return words.some(w => norm.includes(normalize(w)));
    }

    /* ---- Motor de búsqueda en equipmentData ---- */
    function searchCatalog(query) {
        const catalog = window.equipmentData;
        if (!catalog || !catalog.length) return [];
        const q = normalize(query);
        const terms = q.split(' ').filter(t => t.length > 2);
        const scored = [];

        equipmentData.forEach((item, idx) => {
            let score = 0;
            const searchable = normalize(
                `${item.name} ${item.ref} ${item.category} ${item.mainCategory} ${item.desc} ${item.type || ''}`
            );
            terms.forEach(term => {
                if (searchable.includes(term)) score += term.length > 5 ? 3 : 1;
            });
            if (normalize(item.name).includes(q)) score += 5;
            if (normalize(item.ref).includes(q)) score += 4;
            if (score > 0) scored.push({ item, score });
        });

        return scored.sort((a, b) => b.score - a.score).slice(0, 3);
    }

    /* ---- Generador de respuestas ---- */
    function generateResponse(query) {
        const q = normalize(query);

        // Saludo
        if (containsAny(q, AI_KNOWLEDGE.greetings)) {
            return {
                text: '¡Hola! 👋 Soy <strong>Antigravity AI</strong>, tu asistente de electrónica. Puedo ayudarte a:\n\n• 🔍 Encontrar componentes en el catálogo\n• ⚡ Explicar la <strong>Ley de Ohm</strong>\n• 🛠️ Orientarte sobre el uso de instrumentos\n• 🧮 Referirte a las calculadoras\n\n¿Qué necesitas?',
                results: []
            };
        }

        // Ayuda
        if (containsAny(q, AI_KNOWLEDGE.help)) {
            return {
                text: 'Puedo hacer varias cosas por ti:\n\n🔍 <strong>Buscar componentes:</strong> Dime el nombre o referencia y te muestro los detalles.\n\n⚡ <strong>Ley de Ohm:</strong> Pregúntame sobre V, I y R.\n\n🧮 <strong>Calculadoras:</strong> Tenemos Ley de Ohm, Código de Colores, LED, Timer 555 y Divisor de Voltaje.\n\n📦 <strong>Catálogo:</strong> Aparatos electrónicos y circuitos integrados.',
                results: []
            };
        }

        // Ley de Ohm
        if (containsAny(q, AI_KNOWLEDGE.ohm)) {
            return {
                text: '⚡ <strong>Ley de Ohm: V = I × R</strong>\n\n• <strong>V</strong> = Voltaje (Voltios)\n• <strong>I</strong> = Corriente (Amperios)\n• <strong>R</strong> = Resistencia (Ohmios)\n\nPuedes calcular cualquiera de las tres variables con nuestra <a href="#" onclick="window.location.hash=\'#calculadora\'; document.getElementById(\'ai-chat-fab\').click(); return false;">Calculadora de Ley de Ohm →</a>',
                results: []
            };
        }

        // Catálogo general
        if (containsAny(q, AI_KNOWLEDGE.components)) {
            return {
                text: '📦 Nuestro catálogo incluye:\n\n<strong>Aparatos Electrónicos:</strong>\n• Osciloscopios, Multímetros, Fuentes de poder, Generadores de señal\n\n<strong>Circuitos Integrados:</strong>\n• Resistencias, Capacitores, Transistores, Diodos, Sensores y más.\n\n¿Sobre cuál te interesa saber más?',
                results: []
            };
        }

        // Calculadoras
        if (containsAny(q, AI_KNOWLEDGE.calculators)) {
            return {
                text: '🧮 Tenemos estas <strong>Calculadoras de Ingeniería</strong>:\n\n• ⚡ Ley de Ohm\n• 🎨 Código de Colores de Resistencias\n• 💡 Resistencia para LEDs\n• ⏱ Timer 555 (Astable)\n• ➗ Divisor de Voltaje\n\n<a href="#" onclick="window.location.hash=\'#calculadora\'; document.getElementById(\'ai-chat-fab\').click(); return false;">Ir a las Calculadoras →</a>',
                results: []
            };
        }

        // Búsqueda en el catálogo
        const found = searchCatalog(query);
        if (found.length > 0) {
            const plural = found.length > 1 ? `Encontré <strong>${found.length} resultados</strong>` : 'Encontré <strong>1 resultado</strong>';
            return {
                text: `🔍 ${plural} para "<em>${query}</em>". Haz clic para ver los detalles:`,
                results: found
            };
        }

        // Respuesta por defecto
        return {
            text: `🤔 No encontré nada específico sobre "<em>${query}</em>". Intenta con términos como:\n\n• Nombre del componente (ej: <em>multímetro</em>, <em>transistor</em>)\n• Referencia técnica (ej: <em>BC547</em>, <em>NE555</em>)\n• Tipo de instrumento (ej: <em>osciloscopio</em>)\n\n¿Puedo ayudarte con algo más?`,
            results: []
        };
    }

    /* ---- Lógica de la UI ---- */
    const fab = document.getElementById('ai-chat-fab');
    const container = document.getElementById('ai-chat-container');
    const closeBtn = document.getElementById('ai-chat-close');
    const messagesEl = document.getElementById('ai-chat-messages');
    const inputEl = document.getElementById('ai-chat-input');
    const sendBtn = document.getElementById('ai-chat-send');
    const suggestions = document.querySelectorAll('.ai-suggestion-chip');
    const suggestionsBar = document.getElementById('ai-quick-suggestions');

    if (!fab || !container) return; // Salir si los elementos no existen

    let isOpen = false;
    let hasGreeted = false;
    let isTyping = false;

    function toggleChat() {
        isOpen = !isOpen;
        fab.classList.toggle('is-open', isOpen);
        container.classList.toggle('is-visible', isOpen);
        container.setAttribute('aria-hidden', String(!isOpen));

        if (isOpen && !hasGreeted) {
            hasGreeted = true;
            setTimeout(() => {
                addBotMessage({
                    text: '¡Hola! 👋 Soy <strong>Antigravity AI</strong>, tu asistente de electrónica. ¿En qué te puedo ayudar hoy?',
                    results: []
                });
            }, 400);
        }

        if (isOpen) inputEl.focus();
    }

    function addMessage(html, isUser = false) {
        const msgEl = document.createElement('div');
        msgEl.className = `ai-message ${isUser ? 'user-message' : ''}`;

        if (!isUser) {
            msgEl.innerHTML = `
                <div class="ai-msg-avatar"><i class="fas fa-robot"></i></div>
                <div class="ai-msg-bubble">${html}</div>
            `;
        } else {
            msgEl.innerHTML = `<div class="ai-msg-bubble">${html}</div>`;
        }

        messagesEl.appendChild(msgEl);
        scrollToBottom();
        return msgEl;
    }

    function addBotMessage(response) {
        // Procesar saltos de línea
        const htmlText = response.text.replace(/\n/g, '<br>');
        const msgEl = addMessage(htmlText, false);

        // Añadir cards de resultados si las hay
        if (response.results && response.results.length > 0) {
            const bubble = msgEl.querySelector('.ai-msg-bubble');
            response.results.forEach(({ item }) => {
                const emoji = EMOJI_MAP[item.category] || '🔩';
                const card = document.createElement('div');
                card.className = 'ai-result-card';
                card.innerHTML = `
                    <div class="ai-result-card-icon">${emoji}</div>
                    <div class="ai-result-card-info">
                        <strong>${item.name}</strong>
                        <span>${item.ref} · ${item.category}</span>
                    </div>
                    <i class="fas fa-arrow-right ai-result-card-arrow"></i>
                `;
                card.addEventListener('click', () => {
                    // Cerrar el chat y abrir el modal del componente
                    if (isOpen) toggleChat();
                    if (typeof window.showDetails === 'function') {
                        setTimeout(() => window.showDetails(item.ref), 200);
                    }
                });
                bubble.appendChild(card);
            });
        }

        scrollToBottom();
    }

    function showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'ai-typing-indicator';
        indicator.id = 'ai-typing-indicator';
        indicator.innerHTML = `
            <div class="ai-msg-avatar"><i class="fas fa-robot"></i></div>
            <div class="ai-typing-dots">
                <span></span><span></span><span></span>
            </div>
        `;
        messagesEl.appendChild(indicator);
        scrollToBottom();
    }

    function hideTypingIndicator() {
        const indicator = document.getElementById('ai-typing-indicator');
        if (indicator) indicator.remove();
    }

    function scrollToBottom() {
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function handleUserMessage(query) {
        if (!query.trim() || isTyping) return;
        isTyping = true;

        // Ocultar sugerencias tras primer mensaje
        if (suggestionsBar) suggestionsBar.style.display = 'none';

        // Añadir mensaje del usuario
        addMessage(query, true);
        inputEl.value = '';

        // Mostrar indicador de escritura
        showTypingIndicator();

        // Simular tiempo de respuesta
        const delay = 700 + Math.random() * 500;
        setTimeout(() => {
            hideTypingIndicator();
            const response = generateResponse(query);
            addBotMessage(response);
            isTyping = false;
        }, delay);
    }

    /* ---- Event Listeners ---- */
    fab.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    sendBtn.addEventListener('click', () => handleUserMessage(inputEl.value));

    inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleUserMessage(inputEl.value);
    });

    suggestions.forEach(chip => {
        chip.addEventListener('click', () => {
            handleUserMessage(chip.dataset.query);
        });
    });

})();

/* =============================================
   SECCIÓN EDUCATIVA / ACADEMIA
   ============================================= */
(function initAcademia() {

    // ---- Datos: Mini-Tutoriales ----
    const tutorialesData = [
        {
            icon: 'fa-bolt',
            title: '¿Qué es la Ley de Ohm?',
            category: 'Fundamentos',
            difficulty: 'basico',
            intro: 'La Ley de Ohm es la relación fundamental entre voltaje, corriente y resistencia. Si conoces dos de los tres valores, puedes calcular el tercero.',
            steps: [
                'Voltaje (V): Es la "presión" que empuja los electrones. Se mide en Voltios (V).',
                'Corriente (I): Es el flujo de electrones. Se mide en Amperios (A).',
                'Resistencia (R): Es el obstáculo al paso de corriente. Se mide en Ohmios (Ω).',
                'Fórmula principal: V = I × R. Despejando: I = V / R y R = V / I.',
                'Ejemplo: Con 9V y una resistencia de 470Ω → I = 9 / 470 ≈ 19.1 mA.'
            ],
            tip: '💡 Úsala siempre antes de conectar un LED: calcula la resistencia limitadora para no quemarlo.'
        },
        {
            icon: 'fa-palette',
            title: 'Código de Colores de Resistencias',
            category: 'Componentes',
            difficulty: 'basico',
            intro: 'Las resistencias tienen bandas de colores para identificar su valor. Aprender este código te ahorrará tener que medir cada resistencia con el multímetro.',
            steps: [
                'Ubica la banda de tolerancia (oro = ±5%, plata = ±10%). Debe quedar a la derecha.',
                'Lee las 4 bandas de izquierda a derecha: banda 1, banda 2, multiplicador, tolerancia.',
                'Cada color equivale a un número: Negro=0, Marrón=1, Rojo=2, Naranja=3, Amarillo=4, Verde=5, Azul=6, Violeta=7, Gris=8, Blanco=9.',
                'Multiplica (Bandas 1 y 2) × (Multiplicador de Banda 3). Ejemplo: Rojo-Rojo-Naranja-Oro = 22 × 1000 = 22kΩ ±5%.',
                'Usa la Calculadora de Código de Colores de ElectroIdentify para verificar.'
            ],
            tip: '💡 Truco mnemotécnico: "Negro-Marrón-Rojo-Naranja-Amarillo-Verde-Azul-Violeta-Gris-Blanco" = "No Me Río Nunca Al Veces Bajo Violentamente Gritando Bobadas".'
        },
        {
            icon: 'fa-microchip',
            title: 'Cómo usar un Protoboard',
            category: 'Laboratorio',
            difficulty: 'basico',
            intro: 'El protoboard (tablero de pruebas) permite construir circuitos temporales sin soldar. Es la herramienta más usada por estudiantes y makers.',
            steps: [
                'Las filas centrales (a-e y f-j) están conectadas horizontalmente por columnas de 5 agujeros.',
                'Las rieles laterales (marcadas + y -) están conectadas verticalmente. Úsalas para VCC y GND.',
                'Nunca pongas dos patas del mismo componente en la misma columna conectada (se cortocircuitan).',
                'Conecta el rail "+" a la salida positiva de tu fuente y el rail "−" a tierra (GND).',
                'Los cables jumper macho-macho facilitan las conexiones. Usa colores: rojo para +, negro para GND.'
            ],
            tip: '💡 Antes de encender, revisa dos veces que VCC y GND no estén conectados directamente. Un cortocircuito puede dañar tu fuente o microcontrolador.'
        },
        {
            icon: 'fa-lightbulb',
            title: 'Cómo conectar un LED correctamente',
            category: 'Componentes',
            difficulty: 'basico',
            intro: 'El LED (Light Emitting Diode) es el componente más visual de la electrónica. Necesita una resistencia limitadora para no quemarse.',
            steps: [
                'Identifica el ánodo (+): la pata más larga, o el lado sin el borde plano en la cápsula.',
                'Identifica el cátodo (−): la pata más corta, o el lado con el borde plano.',
                'Calcula la resistencia: R = (Vfuente - Vled) / Iled. Para un LED rojo con 5V: R = (5 - 2) / 0.02 = 150Ω.',
                'Usa la resistencia más cercana disponible (en este caso 150Ω o 220Ω).',
                'Conecta: VCC → Resistencia → Ánodo LED → Cátodo LED → GND. ¡Listo!'
            ],
            tip: '💡 La mayoría de LEDs de uso general trabajan a 20mA y caen entre 1.8V (rojo) y 3.4V (azul/blanco). Úsalo en la calculadora de LED para mayor precisión.'
        },
        {
            icon: 'fa-wave-square',
            title: 'Usar el Osciloscopio por primera vez',
            category: 'Instrumentación',
            difficulty: 'medio',
            intro: 'El osciloscopio es el ojo del ingeniero: muestra gráficamente cómo varía una señal eléctrica en el tiempo. Aprender los controles básicos desbloquea su poder.',
            steps: [
                'Conecta la sonda al canal CH1. Verifica que el interruptor de la sonda esté en 10x.',
                'Toca la punta de la sonda al terminal "Cal" del equipo (señal de calibración interna 1kHz, 1Vpp).',
                'Presiona el botón "Auto" o "Autoset" para que el equipo detecte y encuadre la señal automáticamente.',
                'Controles clave: "Volt/Div" ajusta la escala vertical, "Time/Div" ajusta la escala horizontal, "Trigger" estabiliza la imagen.',
                'Lee Vpp (voltaje pico a pico) en la pantalla y calcula la frecuencia: f = 1 / período.'
            ],
            tip: '💡 Si la señal se mueve y no se puede leer, ajusta el nivel de Trigger hasta que quede estática. Eso significa que el triggering está sincronizado correctamente.'
        },
        {
            icon: 'fa-ruler-combined',
            title: 'Medir con el Multímetro',
            category: 'Instrumentación',
            difficulty: 'basico',
            intro: 'El multímetro es la navaja suiza del laboratorio. Puede medir voltaje, corriente, resistencia, continuidad y más. Saber usarlo bien es esencial.',
            steps: [
                'Para medir VOLTAJE DC: Coloca el selector en V— (o VDC). Conecta las puntas en paralelo con el elemento.',
                'Para medir RESISTENCIA: Apaga el circuito. Selector en Ω. Conecta las puntas a los extremos de la resistencia.',
                'Para medir CONTINUIDAD: Selector en ))) (pitido). Si hay continuidad, el multímetro emite un sonido.',
                'Para medir CORRIENTE: Coloca el selector en A. Conecta las puntas en SERIE (no en paralelo). ¡Cuidado con los fusibles!',
                'Siempre empieza en el rango más alto para no dañar el instrumento; baja hasta el rango adecuado.'
            ],
            tip: '💡 Nunca midas resistencia en un circuito energizado. Y nunca midas corriente en paralelo: puedes quemar el fusible del multímetro.'
        },
        {
            icon: 'fa-memory',
            title: 'Introducción a los Transistores BJT',
            category: 'Componentes',
            difficulty: 'medio',
            intro: 'El transistor BJT (Bipolar Junction Transistor) actúa como interruptor o amplificador. Es el corazón de toda la electrónica moderna.',
            steps: [
                'Terminales: Base (B), Colector (C) y Emisor (E). En NPN: Corriente fluye de C a E cuando la base está activada.',
                'Como interruptor: Aplica ~0.7V a la base (con resistencia limitadora). El transistor satura y conduce de C a E.',
                'Como amplificador: Opera en zona activa. La corriente de base (Ib) controla la corriente de colector: Ic = β × Ib.',
                'El hFE (β, ganancia) varía de 20 a 500 según el modelo. Para el popular BC547, β ≈ 110-800.',
                'Identifica los pines: para el 2N2222 en cápsula TO-92: la pata central es la Base cuando el lado plano da hacia ti.'
            ],
            tip: '💡 Para encender un relay o LED de alta potencia mediante un microcontrolador (3.3V / 5V), un transistor NPN como el BC547 o 2N2222 es tu mejor aliado.'
        },
        {
            icon: 'fa-shield-alt',
            title: 'Protección contra Polaridad Inversa',
            category: 'Buenas Prácticas',
            difficulty: 'medio',
            intro: 'Conectar la alimentación al revés puede destruir tu circuito en milisegundos. Existen técnicas simples para protegerse.',
            steps: [
                'Diodo en serie: Coloca un diodo 1N4007 en el rail de alimentación. Si se invierte la polaridad, el diodo bloquea la corriente.',
                'Precio: una caída de voltaje de ~0.7V. Para 12V es aceptable; para 3.3V puede ser problemático.',
                'Diodo Schottky (1N5819): Mismo principio pero con caída de solo ~0.3V. Mejor para circuitos de baja tensión.',
                'MOSFET de canal P: La solución profesional. Sin caída de voltaje apreciable y con protección perfecta.',
                'También considera fusibles en la entrada para proteger contra sobrecorriente.'
            ],
            tip: '💡 Añade siempre un capacitor de desacople (100nF cerámico + 10µF electrolítico) cerca de cada circuito integrado para filtrar ruido de la alimentación.'
        }
    ];

    // ---- Datos: Glosario ----
    const glosarioData = [
        { term: 'Corriente Alterna (AC)', tag: 'Magnitud', def: 'Tipo de corriente eléctrica cuya amplitud y sentido varía con el tiempo de forma periódica (sinusoidal). Es la que llega a los tomacorrientes del hogar (110V o 220V, 60Hz).' },
        { term: 'Corriente Continua (DC)', tag: 'Magnitud', def: 'Corriente eléctrica que fluye en un solo sentido y con amplitud constante. Las baterías, paneles solares y fuentes reguladas entregan DC.' },
        { term: 'Voltaje (V)', tag: 'Magnitud', def: 'Diferencia de potencial eléctrico entre dos puntos. Es la "presión" que impulsa la corriente. Se mide en Voltios (V).' },
        { term: 'Corriente (I)', tag: 'Magnitud', def: 'Flujo de carga eléctrica (electrones) por un conductor. Se mide en Amperios (A). 1 A = 1 Coulomb por segundo.' },
        { term: 'Resistencia (R)', tag: 'Magnitud', def: 'Oposición al paso de corriente eléctrica. Se mide en Ohmios (Ω). Cuanto mayor es la resistencia, menos corriente circula con el mismo voltaje.' },
        { term: 'Potencia (P)', tag: 'Magnitud', def: 'Energía consumida o entregada por unidad de tiempo. P = V × I. Se mide en Vatios (W). Un LED típico consume 0.06W.' },
        { term: 'Capacitancia (C)', tag: 'Magnitud', def: 'Capacidad de un componente para almacenar carga eléctrica. Se mide en Faradios (F). Los capacitores comerciales van de pF hasta miles de µF.' },
        { term: 'Inductancia (L)', tag: 'Magnitud', def: 'Propiedad de un conductor o bobina que se opone a los cambios de corriente. Se mide en Henrios (H). Es el complemento del capacitor en filtros de frecuencia.' },
        { term: 'Impedancia (Z)', tag: 'Magnitud', def: 'Resistencia total que un circuito ofrece al paso de corriente AC. Combina resistencia, capacitancia e inductancia. Se mide en Ohmios (Ω).' },
        { term: 'Frecuencia (f)', tag: 'Magnitud', def: 'Número de ciclos completos que una señal periódica realiza por segundo. Se mide en Hertz (Hz). La electricidad en Colombia es a 60Hz.' },
        { term: 'Resistor', tag: 'Componente', def: 'Componente pasivo que limita el flujo de corriente. Su valor se identifica por bandas de colores o código numérico (SMD). Es el componente más común en electrónica.' },
        { term: 'Capacitor', tag: 'Componente', def: 'Componente que almacena energía en un campo eléctrico. Se usa para filtrado, desacople de alimentación, temporización y acoplamiento de señales AC.' },
        { term: 'Inductor (Bobina)', tag: 'Componente', def: 'Componente que almacena energía en un campo magnético. Se usa en fuentes conmutadas, filtros de frecuencia y transformadores.' },
        { term: 'Diodo', tag: 'Componente', def: 'Dispositivo semiconductor que permite el flujo de corriente en un solo sentido (del ánodo al cátodo). Se usa para rectificación, protección y señalización (LED).' },
        { term: 'LED', tag: 'Componente', def: 'Light Emitting Diode. Diodo que emite luz al conducir. Requiere una resistencia limitadora. Existe en colores visibles, IR y UV.' },
        { term: 'Transistor BJT', tag: 'Componente', def: 'Componente de tres terminales (Base, Colector, Emisor) que actúa como interruptor o amplificador controlado por corriente. Tipos: NPN y PNP.' },
        { term: 'MOSFET', tag: 'Componente', def: 'Transistor de efecto de campo controlado por voltaje. Más eficiente que el BJT para conmutación. Terminales: Gate, Drain, Source. Tipo N y tipo P.' },
        { term: 'Circuito Integrado (IC)', tag: 'Componente', def: 'Chip que contiene millones de transistores y componentes en un encapsulado miniaturizado. Ejemplo: microcontroladores, amplificadores operacionales.' },
        { term: 'Relé', tag: 'Componente', def: 'Interruptor electromecánico controlado por una bobina electromagnética. Permite controlar circuitos de alta potencia con señales de baja corriente (GPIO de Arduino, etc).' },
        { term: 'Cristal Oscilador', tag: 'Componente', def: 'Componente piezoeléctrico que genera una señal de frecuencia muy precisa. Se usa como fuente de reloj en microcontroladores (ej: 16 MHz para Arduino UNO).' },
        { term: 'Amplificador Operacional (Op-Amp)', tag: 'CI', def: 'Circuito integrado de alta ganancia con dos entradas (+ y −) y una salida. Se usa en amplificadores, comparadores, filtros activos y osciladores. Ejemplo: LM741, LM324N.' },
        { term: 'PWM', tag: 'Señal', def: 'Pulse Width Modulation. Técnica de modulación donde se varía el ancho del pulso (duty cycle) de una señal cuadrada para controlar potencia, brillo de LEDs, velocidad de motores, etc.' },
        { term: 'Tierra (GND)', tag: 'Concepto', def: 'Punto de referencia de potencial cero (0V) en un circuito. Todos los voltajes se miden respecto a este punto. Es el eslabón común de toda la electrónica.' },
        { term: 'Pull-Up / Pull-Down', tag: 'Concepto', def: 'Resistencias conectadas a VCC (pull-up) o GND (pull-down) para definir un estado lógico definido en una entrada digital cuando no está siendo activamente manejada.' },
        { term: 'Flyback', tag: 'Concepto', def: 'Pico de voltaje inverso generado por la bobina de un relé o motor cuando se desactiva. Puede destruir transistores. Se protege con un diodo en antiparalelo (diodo flyback).' },
        { term: 'Duty Cycle', tag: 'Señal', def: 'Porcentaje del tiempo que una señal PWM permanece en alto. 50% duty cycle = señal alta durante la mitad del período. Controla la potencia entregada a la carga.' },
        { term: 'I2C', tag: 'Protocolo', def: 'Bus serie síncrono de 2 hilos (SDA, SCL). Permite conectar múltiples dispositivos con solo 2 pines. Cada dispositivo tiene una dirección única. Velocidad típica: 100kHz-400kHz.' },
        { term: 'SPI', tag: 'Protocolo', def: 'Serial Peripheral Interface. Bus de 4 hilos (MOSI, MISO, SCK, CS) de alta velocidad para comunicación entre microcontroladores y periféricos como pantallas, SD, sensores.' },
        { term: 'UART', tag: 'Protocolo', def: 'Universal Asynchronous Receiver-Transmitter. Protocolo serie asíncrono de 2 hilos (TX, RX). El más sencillo. Usado en comunicación con GPS, módulos Bluetooth, depuración.' },
        { term: 'SMD', tag: 'Tecnología', def: 'Surface Mount Device. Componente de montaje superficial sin patas través de PCB. Más pequeño y eficiente que THT. Requiere soldadura con pasta y/o estación de calor.' },
        { term: 'THT', tag: 'Tecnología', def: 'Through-Hole Technology. Componentes con patas que se insertan en agujeros de la PCB. Más fácil de soldar a mano. Usados en protoboard y electrónica de aprendizaje.' },
        { term: 'PCB', tag: 'Concepto', def: 'Printed Circuit Board. Tarjeta de circuito impreso donde los componentes se montan y conectan mediante pistas conductoras de cobre. Es el sustrato de cualquier producto electrónico.' }
    ];

    // ---- Datos: Fórmulas ----
    const formulasData = [
        {
            icon: 'fa-bolt',
            title: 'Ley de Ohm',
            formulas: ['V = I × R', 'I = V / R', 'R = V / I'],
            vars: [
                { sym: 'V', desc: 'Voltaje (Voltios, V)' },
                { sym: 'I', desc: 'Corriente (Amperios, A)' },
                { sym: 'R', desc: 'Resistencia (Ohmios, Ω)' }
            ]
        },
        {
            icon: 'fa-fire',
            title: 'Potencia Eléctrica',
            formulas: ['P = V × I', 'P = I² × R', 'P = V² / R'],
            vars: [
                { sym: 'P', desc: 'Potencia (Vatios, W)' },
                { sym: 'V', desc: 'Voltaje (Voltios, V)' },
                { sym: 'I', desc: 'Corriente (Amperios, A)' }
            ]
        },
        {
            icon: 'fa-lightbulb',
            title: 'Resistencia para LED',
            formulas: ['R = (Vs − Vled) / Iled'],
            vars: [
                { sym: 'Vs',   desc: 'Voltaje de la fuente (V)' },
                { sym: 'Vled', desc: 'Caída de voltaje del LED (V)' },
                { sym: 'Iled', desc: 'Corriente del LED (A) — típico 0.02A' }
            ]
        },
        {
            icon: 'fa-divide',
            title: 'Divisor de Voltaje',
            formulas: ['Vout = Vin × R2 / (R1 + R2)'],
            vars: [
                { sym: 'Vin',  desc: 'Voltaje de entrada (V)' },
                { sym: 'R1',   desc: 'Resistencia superior (Ω)' },
                { sym: 'R2',   desc: 'Resistencia inferior (Ω)' },
                { sym: 'Vout', desc: 'Voltaje de salida (V)' }
            ]
        },
        {
            icon: 'fa-clock',
            title: 'Timer 555 (Astable)',
            formulas: ['f = 1.44 / ((R1 + 2×R2) × C)', 'DC = (R1 + R2) / (R1 + 2×R2)'],
            vars: [
                { sym: 'f',  desc: 'Frecuencia de oscilación (Hz)' },
                { sym: 'DC', desc: 'Duty Cycle (0 a 1)' },
                { sym: 'C',  desc: 'Capacitancia (Faradios, F)' }
            ]
        },
        {
            icon: 'fa-filter',
            title: 'Filtro RC (Frecuencia de Corte)',
            formulas: ['fc = 1 / (2π × R × C)'],
            vars: [
                { sym: 'fc', desc: 'Frecuencia de corte (Hz)' },
                { sym: 'R',  desc: 'Resistencia (Ω)' },
                { sym: 'C',  desc: 'Capacitancia (Faradios, F)' }
            ]
        },
        {
            icon: 'fa-memory',
            title: 'Resistencias en Paralelo',
            formulas: ['1/Req = 1/R1 + 1/R2 + 1/Rn', 'Req(2) = (R1×R2)/(R1+R2)'],
            vars: [
                { sym: 'Req', desc: 'Resistencia equivalente (Ω)' },
                { sym: 'Rn',  desc: 'Cada resistencia del grupo' }
            ]
        },
        {
            icon: 'fa-link',
            title: 'Resistencias en Serie',
            formulas: ['Req = R1 + R2 + R3 + ... + Rn'],
            vars: [
                { sym: 'Req', desc: 'Resistencia equivalente (Ω)' },
                { sym: 'Rn',  desc: 'Cada resistencia individual' }
            ]
        },
        {
            icon: 'fa-layer-group',
            title: 'Carga del Capacitor (RC)',
            formulas: ['V(t) = Vs × (1 − e^(−t/τ))', 'τ = R × C'],
            vars: [
                { sym: 'τ',    desc: 'Constante de tiempo (segundos)' },
                { sym: 'Vs',   desc: 'Voltaje de la fuente (V)' },
                { sym: 'V(t)', desc: 'Voltaje en el tiempo t (V)' }
            ]
        },
        {
            icon: 'fa-wave-square',
            title: 'Período y Frecuencia',
            formulas: ['T = 1 / f', 'f = 1 / T'],
            vars: [
                { sym: 'T', desc: 'Período (segundos, s)' },
                { sym: 'f', desc: 'Frecuencia (Hertz, Hz)' }
            ]
        }
    ];

    // ---- Referencias al DOM ----
    const academiaPage   = document.getElementById('academia-page');
    const backBtn        = document.getElementById('back-to-home-from-academia');
    const tabBtns        = document.querySelectorAll('.academia-tab-btn');
    const tutGrid        = document.getElementById('tutorials-grid');
    const glosGrid       = document.getElementById('glosario-grid');
    const glosSearch     = document.getElementById('glosario-search');
    const glosNoResults  = document.getElementById('glosario-no-results');
    const formulasGrid   = document.getElementById('formulas-grid');

    if (!academiaPage) return; // Salir si el HTML no está listo

    // ---- Routing ----
    const originalShowPage = window._academiaShowPageInjected;

    // Extender el routing global para incluir #academia
    const origHandleRouting = window.handleRoutingRef;

    // Enganchamos al evento hashchange
    window.addEventListener('hashchange', () => {
        if (window.location.hash === '#academia') {
            showAllPages('hidden');
            academiaPage.classList.remove('hidden-page');
            window.scrollTo(0, 0);
        }
    });

    // Verificar si se cargó con #academia
    if (window.location.hash === '#academia') {
        document.querySelectorAll('.hidden-page').forEach(p => p.classList.add('hidden-page'));
        academiaPage.classList.remove('hidden-page');
    }

    function showAllPages(action) {
        ['landing-page','subcategory-page','catalog-page','calculators-page','converter-page','academia-page'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.add('hidden-page');
        });
    }

    // Botón volver al inicio
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.location.hash = '';
            academiaPage.classList.add('hidden-page');
            document.getElementById('landing-page').classList.remove('hidden-page');
            window.scrollTo(0, 0);
        });
    }

    // Link en el menú desplegable
    const linkAcademia = document.getElementById('link-academia');
    if (linkAcademia) {
        linkAcademia.addEventListener('click', (e) => {
            e.preventDefault();
            const dropdown = document.getElementById('dropdown-menu');
            if (dropdown) dropdown.classList.add('hidden-dropdown');
            ['landing-page','subcategory-page','catalog-page','calculators-page','converter-page'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.classList.add('hidden-page');
            });
            academiaPage.classList.remove('hidden-page');
            window.scrollTo(0, 0);
            history.pushState(null, '', '#academia');
        });
    }

    // ---- Navegación de pestañas internas ----
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const section = btn.dataset.section;
            document.querySelectorAll('.academia-section').forEach(s => s.classList.add('hidden-section'));
            const target = document.getElementById('section-' + section);
            if (target) target.classList.remove('hidden-section');
        });
    });

    // ---- Renderizar Mini-Tutoriales ----
    function renderTutoriales() {
        if (!tutGrid) return;
        tutGrid.innerHTML = '';
        tutorialesData.forEach((tut, idx) => {
            const diffClass = `diff-${tut.difficulty}`;
            const diffLabel = tut.difficulty === 'basico' ? 'Básico' : tut.difficulty === 'medio' ? 'Intermedio' : 'Avanzado';

            const card = document.createElement('div');
            card.className = 'tutorial-card neon-border';
            card.innerHTML = `
                <div class="tutorial-card-header" data-idx="${idx}">
                    <div class="tutorial-card-icon"><i class="fas ${tut.icon}"></i></div>
                    <div class="tutorial-card-meta">
                        <h3>${tut.title} <span class="difficulty-badge ${diffClass}">${diffLabel}</span></h3>
                        <span>${tut.category}</span>
                    </div>
                    <i class="fas fa-chevron-down tutorial-toggle-icon"></i>
                </div>
                <div class="tutorial-card-body">
                    <p>${tut.intro}</p>
                    <ol class="tutorial-steps">
                        ${tut.steps.map(s => `<li>${s}</li>`).join('')}
                    </ol>
                    <div class="tutorial-tip"><i class="fas fa-lightbulb"></i><span>${tut.tip}</span></div>
                </div>
            `;

            // Toggle acordeón
            card.querySelector('.tutorial-card-header').addEventListener('click', () => {
                card.classList.toggle('open');
            });

            tutGrid.appendChild(card);
        });
    }

    // ---- Renderizar Glosario ----
    function renderGlosario(filter = '') {
        if (!glosGrid) return;
        glosGrid.innerHTML = '';
        const filtered = glosarioData.filter(g =>
            g.term.toLowerCase().includes(filter.toLowerCase()) ||
            g.def.toLowerCase().includes(filter.toLowerCase()) ||
            g.tag.toLowerCase().includes(filter.toLowerCase())
        );

        if (filtered.length === 0) {
            if (glosNoResults) glosNoResults.style.display = 'block';
            return;
        }
        if (glosNoResults) glosNoResults.style.display = 'none';

        filtered.forEach(g => {
            const card = document.createElement('div');
            card.className = 'glosario-card';
            card.innerHTML = `
                <div class="glosario-term">
                    <h4>${g.term}</h4>
                    <span class="gtag">${g.tag}</span>
                </div>
                <p>${g.def}</p>
            `;
            glosGrid.appendChild(card);
        });
    }

    if (glosSearch) {
        glosSearch.addEventListener('input', () => renderGlosario(glosSearch.value));
    }

    // ---- Renderizar Fórmulas ----
    function renderFormulas() {
        if (!formulasGrid) return;
        formulasGrid.innerHTML = '';
        formulasData.forEach(f => {
            const card = document.createElement('div');
            card.className = 'formula-card';
            card.innerHTML = `
                <div class="formula-card-title">
                    <i class="fas ${f.icon}"></i>
                    <h3>${f.title}</h3>
                </div>
                ${f.formulas.map(eq => `<div class="formula-box"><code>${eq}</code></div>`).join('')}
                <ul class="formula-vars">
                    ${f.vars.map(v => `<li><strong>${v.sym}</strong>${v.desc}</li>`).join('')}
                </ul>
            `;
            formulasGrid.appendChild(card);
        });
    }

    // ---- Inicializar todos los datos ----
    renderTutoriales();
    renderGlosario();
    renderFormulas();

})();

/* =============================================
   UTILIDADES GLOBALES UX
   ============================================= */

// ---- Toast de Notificación ----
function showToast(message, duration = 3000) {
    // Remover toast existente si hay uno
    const existing = document.getElementById('ux-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'ux-toast';
    toast.className = 'ux-toast';
    toast.innerHTML = `<span>${message}</span>`;
    document.body.appendChild(toast);

    // Animar entrada
    requestAnimationFrame(() => {
        requestAnimationFrame(() => toast.classList.add('ux-toast--visible'));
    });

    // Auto-eliminar
    setTimeout(() => {
        toast.classList.remove('ux-toast--visible');
        setTimeout(() => toast.remove(), 400);
    }, duration);
}

/* =============================================
   TIP DEL DÍA
   ============================================= */
(function initTipDelDia() {

    const tips = [
        { icon: '⚡', text: 'Siempre calcula la resistencia limitadora antes de conectar un LED. R = (Vs − Vled) / Iled. Sin ella, el LED se quema en segundos.', tag: 'Componentes' },
        { icon: '🔌', text: 'Añade un capacitor de 100nF cerámico cerca de cada pin VCC de un circuito integrado. Esto filtra el ruido de alta frecuencia y previene reinicios inesperados.', tag: 'Buenas Prácticas' },
        { icon: '🎨', text: 'Truco código de colores: "No Me Río Nunca Al Veces Bajo Violentamente Gritando Bobadas" = Negro, Marrón, Rojo, Naranja, Amarillo, Verde, Azul, Violeta, Gris, Blanco (0-9).', tag: 'Memorización' },
        { icon: '🔋', text: 'Nunca midas resistencia en un circuito energizado. Los 0.6V que el multímetro inyecta en modo Ω pueden dañar semiconductores sensibles.', tag: 'Seguridad' },
        { icon: '🌡️', text: 'La temperatura de un soldado de calidad es de 300°C–350°C. Más caliente no es más rápido: daña el flux y los componentes. El tiempo máximo en cada punto: 3 segundos.', tag: 'Soldadura' },
        { icon: '📊', text: 'Si el osciloscopio muestra una señal inestable, ajusta el nivel de TRIGGER. La señal se estabilizará cuando el trigger coincida con el flanco de la señal.', tag: 'Instrumentación' },
        { icon: '🔄', text: 'Un diodo flyback (1N4007 en antiparalelo) es obligatorio al controlar un relé o motor con un transistor. Sin él, el pico de voltaje inverso destruye el transistor.', tag: 'Protección' },
        { icon: '🔢', text: 'Código de 3 dígitos en capacitores cerámicos: los dos primeros son cifras, el tercero es el número de ceros en picofaradios. 104 = 10×10⁴ pF = 100nF.', tag: 'Identificación' },
        { icon: '📐', text: 'La frecuencia de corte de un filtro RC es: fc = 1 / (2π·R·C). Por encima de esta frecuencia el pasa-bajos atenúa la señal a −3dB (70.7% de la amplitud original).', tag: 'Fórmulas' },
        { icon: '🛡️', text: 'Para proteger un circuito de polaridad invertida, usa un diodo Schottky 1N5819 en serie con la alimentación. Tiene una caída de solo ~0.3V frente al 0.7V del 1N4007.', tag: 'Protección' },
        { icon: '⏱️', text: 'El NE555 en modo monoestable genera un pulso de T = 1.1 × R × C segundos. Con R=100kΩ y C=10µF obtienes T ≈ 1.1 segundos.', tag: 'Circuitos' },
        { icon: '🔍', text: 'Para identificar si un transistor BJT está bien, mide con el multímetro en modo diodo: Base→Colector y Base→Emisor deben marcar ~0.6V (NPN). Si marca cero o infinito, está dañado.', tag: 'Diagnóstico' },
        { icon: '📡', text: 'I²C usa sólo 2 cables (SDA y SCL) para conectar hasta 127 dispositivos. Cada uno tiene una dirección única de 7 bits. Recuerda añadir resistencias pull-up de 4.7kΩ.', tag: 'Comunicación' },
        { icon: '🧲', text: 'Aleja los inductores y transformadores de los capacitores electrolíticos. El campo magnético puede calentar el electrolito y reducir la vida útil del capacitor.', tag: 'Diseño' },
        { icon: '💡', text: 'Un LED blanco o azul cae típicamente 3.0V–3.4V. Un LED rojo o infrarrojo cae 1.8V–2.2V. Esto afecta directamente el cálculo de la resistencia limitadora.', tag: 'Componentes' }
    ];

    // Elegir tip del día usando la fecha como semilla (cambia cada día)
    function getTipOfDay() {
        const now = new Date();
        const dayIndex = Math.floor(now.getTime() / 86400000); // días desde epoch
        return tips[dayIndex % tips.length];
    }

    function injectTipCard() {
        // Solo inyectar en la landing page
        const target = document.querySelector('.container.catalog-container') ||
                       document.querySelector('#landing-page .container') ||
                       document.querySelector('#landing-page section.container');
        if (!target) return;

        const tip = getTipOfDay();

        const tipCard = document.createElement('div');
        tipCard.className = 'tip-del-dia-card';
        tipCard.id = 'tip-del-dia';
        tipCard.innerHTML = `
            <div class="tip-header">
                <div class="tip-badge">
                    <i class="fas fa-lightbulb"></i>
                    <span>Tip del Día</span>
                </div>
                <span class="tip-tag">${tip.tag}</span>
                <button class="tip-close-btn" id="tip-close" aria-label="Cerrar tip">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="tip-body">
                <span class="tip-emoji">${tip.icon}</span>
                <p class="tip-text">${tip.text}</p>
            </div>
            <div class="tip-footer">
                <button class="tip-next-btn" id="tip-next">
                    <i class="fas fa-random"></i> Otro consejo
                </button>
            </div>
        `;

        // Insertar al inicio del container
        target.insertBefore(tipCard, target.firstChild);

        // Comprobar si el usuario ya cerró el tip hoy
        const closedDate = localStorage.getItem('tipClosedDate');
        const today = new Date().toDateString();
        if (closedDate === today) {
            tipCard.style.display = 'none';
        }

        // Botón cerrar
        document.getElementById('tip-close').addEventListener('click', () => {
            tipCard.classList.add('tip-hiding');
            setTimeout(() => { tipCard.style.display = 'none'; tipCard.classList.remove('tip-hiding'); }, 400);
            localStorage.setItem('tipClosedDate', today);
        });

        // Botón "Otro consejo" (tip aleatorio)
        let currentIdx = tips.indexOf(tip);
        document.getElementById('tip-next').addEventListener('click', () => {
            currentIdx = (currentIdx + 1) % tips.length;
            const nextTip = tips[currentIdx];
            const emoji = tipCard.querySelector('.tip-emoji');
            const text = tipCard.querySelector('.tip-text');
            const tag = tipCard.querySelector('.tip-tag');

            tipCard.classList.add('tip-changing');
            setTimeout(() => {
                emoji.textContent = nextTip.icon;
                text.textContent = nextTip.text;
                tag.textContent = nextTip.tag;
                tipCard.classList.remove('tip-changing');
            }, 200);
        });
    }

    // Inyectar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectTipCard);
    } else {
        // Pequeño delay para que el DOM esté completamente renderizado
        setTimeout(injectTipCard, 100);
    }

})();



document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const searchByText = document.getElementById('search-by-text');
    const searchByPhoto = document.getElementById('search-by-photo');
    const mainSearch = document.getElementById('main-search');
    const searchTrigger = document.getElementById('search-trigger');

    const equipmentData = [
        {
            name: "Osciloscopio Digital Rigol",
            ref: "DS1054Z",
            category: "Osciloscopios",
            mainCategory: "Aparatos Electrónicos",
            desc: "Excelente para laboratorios educativos y aficionados. Muy popular por su hacking potencial.",
            videoUrl: "https://www.youtube.com/watch?v=-fYAJQ9uCUg",
            imageUrl: "https://assets.testequity.com/te1/product-images/large/DS1054Z_01_1024.jpg",
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
            imageUrl: "https://m.media-amazon.com/images/I/71LzqF-nrnL._SL1000_.jpg",
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
            imageUrl: "https://assets.testequity.com/te1/Images/Web%20Images/Fluke/87V-Contents_500px_01_0525.jpg",
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
            imageUrl: "https://i.ebayimg.com/images/g/vVQAAOSwihpkRPqg/s-l400.jpg",
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
            imageUrl: "https://ae01.alicdn.com/kf/Sf1303fcb182f47848361c7771e7ccda0p.jpg",
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
            name: "Estación de Soldadura Digital Hakko",
            ref: "FX-888D",
            category: "Estaciones de Soldadura",
            mainCategory: "Aparatos Electrónicos",
            desc: "El estándar de la industria para laboratorios y talleres profesionales. Control térmico preciso y puntas intercambiables.",
            videoUrl: "https://www.youtube.com/watch?v=-P4GZfNqYMw",
            imageUrl: "https://cdn-shop.adafruit.com/970x728/1204-03.jpg",
            specs: {
                "Potencia": "70 W",
                "Rango de Temperatura": "120°C - 480°C",
                "Tiempo de Calentamiento": "20 seg a 350°C",
                "Función": "Bloqueo de temperatura por contraseña"
            },
            usageSteps: [
                "Encienda la estación y espere 20 segundos a que alcance la temperatura.",
                "Ajuste la temperatura con los botones (+/-) o la perilla según modelo.",
                "Limpie la punta en la esponja húmeda antes de soldar.",
                "Al terminar, aplique estaño fresco a la punta y guárdela protegida."
            ],
            type: "Estación de Soldadura Digital"
        },
        {
            name: "Estación de Soldadura Weller",
            ref: "WE1010",
            category: "Estaciones de Soldadura",
            mainCategory: "Aparatos Electrónicos",
            desc: "Estación de 70W con excelente precisión, pantalla digital y puntas RT de calentamiento rápido.",
            videoUrl: "https://www.youtube.com/watch?v=Z0EvvE2ELbY",
            imageUrl: "https://assets.testequity.com/te1/Images/Web%20Images/Weller/Weller_WE1010NA_Soldering-Station-Kit_01_0126_W.jpg",
            specs: {
                "Potencia": "70 W",
                "Rango de Temperatura": "100°C - 450°C",
                "Tiempo de Calentamiento": "<10 seg a 350°C",
                "Compatibilidad": "Puntas Serie RT / Series WT"
            },
            usageSteps: [
                "Conecte el soldador al módulo base y encienda con el botón ON.",
                "Use las flechas para ajustar la temperatura objetivo.",
                "Espere que el LED cambie a verde: la punta está lista para soldar.",
                "Active el modo Sleep si se ausenta más de 5 minutos para proteger las puntas."
            ],
            type: "Estación de Soldadura Digital"
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
            desc: "Componente pasivo que introduce una resistencia eléctrica específica en el circuito.",
            videoUrl: "https://www.youtube.com/watch?v=Gc1S86D-d9Y",
            imageUrl: "https://m.media-amazon.com/images/I/51+u0fH8MBL.jpg",
            specs: {
                "Funcionamiento": "Limita el flujo de corriente eléctrica convirtiendo energía eléctrica en calor mediante el efecto Joule.",
                "Tolerancia": "±5% típica",
                "Potencia": "1/4W, 1/2W típicos",
                "Datasheet": "Genérico"
            },
            usageSteps: [
                "Identifique el valor óhmico usando el código de colores.",
                "Corte o doble las terminales según la necesidad.",
                "Suelde el componente asegurando buen contacto.",
                "Verifique la resistencia con un multímetro."
            ],
            type: "Componente Pasivo"
        },
        {
            name: "Potenciómetro Lineal",
            ref: "POT-B10K",
            category: "Resistencias",
            mainCategory: "Circuitos Integrados",
            desc: "Resistencia variable accionada manualmente por un eje giratorio.",
            videoUrl: "https://www.youtube.com/watch?v=0_uW_OaT3_I",
            imageUrl: "https://m.media-amazon.com/images/I/61r5f7p+FKL._AC_SL1000_.jpg",
            specs: {
                "Funcionamiento": "Divisor de voltaje ajustable mediante un contacto deslizante.",
                "Resistencia Max": "10kΩ",
                "Pines": "3 (Terminales extremos y cursor)",
                "Datasheet": "https://www.mouser.com/ds/2/44/PTV09A-1-1102927.pdf"
            },
            usageSteps: [
                "El pin central es el cursor (wiper).",
                "Conecte extremos a fuente y tierra.",
                "Gire el eje para variar el voltaje.",
                "Asegure físicamente al chasis."
            ],
            type: "Resistencia Variable"
        },
        {
            name: "Capacitor Electrolítico",
            ref: "CAP-ELEC",
            category: "Capacitores",
            mainCategory: "Circuitos Integrados",
            desc: "Almacena energía eléctrica. Componente polarizado.",
            videoUrl: "https://www.youtube.com/watch?v=f0pS8fO2S8E",
            imageUrl: "https://m.media-amazon.com/images/I/61J2m0C6-OL._AC_SL1500_.jpg",
            specs: {
                "Funcionamiento": "Almacena carga eléctrica mediante campo electrostático.",
                "Voltaje Max": "Depende del modelo (ej: 25V)",
                "Polaridad": "Fundamental (Pata corta = Negativo)",
                "Datasheet": "https://www.rubycon.co.jp/wp-content/uploads/catalog/aluminum-catalog/YXF.pdf"
            },
            usageSteps: [
                "Identifique el polo negativo (banda gris).",
                "Respete la polaridad en la instalación.",
                "Evite el sobrecalentamiento al soldar.",
                "No exceda el voltaje nominal."
            ],
            type: "Componente Pasivo Polarizado"
        },
        {
            name: "Capacitor Cerámico",
            ref: "CAP-CER",
            category: "Capacitores",
            mainCategory: "Circuitos Integrados",
            desc: "Capacitor no polarizado para señales de alta frecuencia.",
            videoUrl: "https://www.youtube.com/watch?v=uD5o8G2YgX4",
            imageUrl: "https://m.media-amazon.com/images/I/51A1i2-e6-L._AC_SL1000_.jpg",
            specs: {
                "Funcionamiento": "Almacena carga sin polaridad fija.",
                "Voltaje": "50V típicos",
                "Datasheet": "https://www.tdk-electronics.tdk.com/inf/20/20/db/mlcc/MLCC_General_Purpose.pdf"
            },
            usageSteps: [
                "Identifique el valor por el código impreso.",
                "Inserte en cualquier orientación.",
                "Ubique cerca de los pines de alimentación.",
                "Suelde con puntos limpios."
            ],
            type: "Componente Pasivo No Polarizado"
        },
        {
            name: "Transistor NPN 2N2222",
            ref: "2N2222",
            category: "Transistores",
            mainCategory: "Circuitos Integrados",
            desc: "Transistor para amplificación y conmutación rápida.",
            videoUrl: "https://www.youtube.com/watch?v=8REH0_N6U2k",
            imageUrl: "https://m.media-amazon.com/images/I/41D7h4y8FSL._AC_.jpg",
            specs: {
                "Funcionamiento": "Controla corriente grande entre colector y emisor con pequeña corriente en base.",
                "Encapsulado": "TO-92",
                "Datasheet": "https://www.onsemi.com/pdf/datasheet/p2n2222a-d.pdf"
            },
            usageSteps: [
                "Identifique Emisor, Base y Colector.",
                "Use resistencia de base siempre.",
                "Conecte carga entre positivo y colector.",
                "Verifique disipación de calor."
            ],
            type: "Semiconductor BJT"
        },
        {
            name: "Diodo Rectificador 1N4007",
            ref: "1N4007",
            category: "Diodos",
            mainCategory: "Circuitos Integrados",
            desc: "Permite paso de corriente en un solo sentido.",
            videoUrl: "https://www.youtube.com/watch?v=fXv0j0D2p6A",
            imageUrl: "https://m.media-amazon.com/images/I/41t7JgC5RSL._AC_.jpg",
            specs: {
                "Funcionamiento": "Bloquea flujo inverso comportándose como válvula.",
                "Voltaje Inverso": "1000V Max",
                "Datasheet": "https://www.diodes.com/assets/Datasheets/ds28002.pdf"
            },
            usageSteps: [
                "La banda plateada indica el Cátodo (-).",
                "Conecte en serie para protección.",
                "Use en puentes rectificadores.",
                "No exceda la corriente de 1A."
            ],
            type: "Diodo"
        },
        {
            name: "Inductor (Bobina)",
            ref: "IND-AIR",
            category: "Bobinas",
            mainCategory: "Circuitos Integrados",
            desc: "Almacena energía en campo magnético.",
            videoUrl: "https://www.youtube.com/watch?v=NgwX_vun3O4",
            imageUrl: "https://m.media-amazon.com/images/I/61jC8Vq2SML._AC_SL1100_.jpg",
            specs: {
                "Funcionamiento": "Se opone a cambios bruscos de corriente.",
                "Tipo": "Núcleo de Aire",
                "Datasheet": "Genérico"
            },
            usageSteps: [
                "Retire esmalte de puntas para soldar.",
                "Aleje de otros metales.",
                "Fije mecánicamente.",
                "Use en circuitos resonantes."
            ],
            type: "Inductor"
        },
        {
            name: "Timer NE555",
            ref: "NE555",
            category: "Circuitos Integrados",
            mainCategory: "Circuitos Integrados",
            desc: "IC para pulsos, retardos y oscilaciones.",
            videoUrl: "https://www.youtube.com/watch?v=kY6v_A3o8vU",
            imageUrl: "https://m.media-amazon.com/images/I/61tS7H2pQQL._AC_SL1000_.jpg",
            specs: {
                "Funcionamiento": "Genera estados lógicos temporales precisos.",
                "Voltaje": "4.5V - 15V",
                "Datasheet": "https://www.ti.com/lit/ds/symlink/ne555.pdf"
            },
            usageSteps: [
                "Pin 1 es GND (punto/muesca).",
                "Pin 8 es VCC.",
                "Use RC externo para tiempos.",
                "Pin 3 es la salida."
            ],
            type: "Integrated Circuit"
        }
    ];

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
            <div class="modal-content glass">
                <button class="close-modal">&times;</button>
                <div class="modal-body">
                    <div class="specs-section">
                        <h2>${item.name}</h2>
                        <div class="specs-grid">
                            ${Object.entries(item.specs).map(([key, val]) => `
                                <div class="spec-item">
                                    <span class="spec-label">${key}</span>
                                    <span class="spec-value">${val.toString().startsWith('http') ? `<a href="${val}" target="_blank" class="spec-link">Ver PDF <i class="fas fa-external-link-alt"></i></a>` : val}</span>
                                </div>
                            `).join('')}
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
    };

    const landingPage = document.getElementById('landing-page');
    const subcategoryPage = document.getElementById('subcategory-page');
    const catalogPage = document.getElementById('catalog-page');
    const catalogGrid = document.getElementById('catalog-grid');
    const backToHome = document.getElementById('back-to-home');
    const backToHomeSub = document.getElementById('back-to-home-from-sub');

    function transition(from, to) {
        from.style.opacity = '0';
        setTimeout(() => {
            from.classList.add('hidden-page');
            to.classList.remove('hidden-page');
            setTimeout(() => to.style.opacity = '1', 50);
        }, 450);
    }

    // Inicialización dinámica de subcategorías
    function setupCategories() {
        const subGrid = document.getElementById('subcategory-grid');
        const mainCards = document.querySelectorAll('.main-category-card');

        mainCards.forEach(card => {
            card.addEventListener('click', () => {
                const mainCategory = card.querySelector('h3').textContent;
                renderSubcategories(mainCategory);
                transition(landingPage, subcategoryPage);
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
            card.addEventListener('click', () => openCategory(sub, mainCategory));
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
            "Circuitos Integrados": "fas fa-memory"
        };
        return icons[sub] || "fas fa-microchip";
    }

    function openCategory(category, mainCategory) {
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
        transition(subcategoryPage, catalogPage);
    }

    if (backToHomeSub) {
        backToHomeSub.addEventListener('click', () => transition(subcategoryPage, landingPage));
    }

    if (backToHome) {
        backToHome.addEventListener('click', () => transition(catalogPage, subcategoryPage));
    }

    setupCategories();
    mainSearch.addEventListener('input', debounce(performSearch, 300));
    window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 50));

    tabBtns.forEach(btn => btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const isPhoto = btn.dataset.tab === 'photo';
        searchByText.style.display = isPhoto ? 'none' : 'block';
        searchByPhoto.style.display = isPhoto ? 'block' : 'none';
    }));
});

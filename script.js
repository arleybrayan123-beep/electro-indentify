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
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/transistor_2n2222_leg.jpg/320px-transistor_2n2222_leg.jpg",
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
            imageUrl: "https://m.media-amazon.com/images/I/41QRd6fXoOL._AC_.jpg",
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
            imageUrl: "https://m.media-amazon.com/images/I/51o4yI2RJUL._AC_SL1001_.jpg",
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
            imageUrl: "https://m.media-amazon.com/images/I/41dLGY6TP3L._AC_.jpg",
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
            imageUrl: "https://m.media-amazon.com/images/I/51wJRruvjRL._AC_SL1000_.jpg",
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
            imageUrl: "https://m.media-amazon.com/images/I/41t7JgC5RSL._AC_.jpg",
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
            imageUrl: "https://m.media-amazon.com/images/I/41PtVFw6ZML._AC_.jpg",
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
            imageUrl: "https://m.media-amazon.com/images/I/41d3FBBXVNL._AC_.jpg",
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
            name: "LED Rojo 5mm",
            ref: "LED-5MM-RED",
            category: "Diodos",
            mainCategory: "Circuitos Integrados",
            desc: "Diodo emisor de luz (LED) de 5mm estándar. Indicador visual de bajo consumo. Requiere siempre resistencia limitadora de corriente.",
            videoUrl: "https://www.youtube.com/watch?v=Fo7auUHGMGo",
            imageUrl: "https://m.media-amazon.com/images/I/61N9RFPdmHL._AC_SL1000_.jpg",
            specs: {
                "Funcionamiento": "Emite fotones cuando la corriente fluye en polarización directa. La pata más larga es el Ánodo (+).",
                "Corriente de Trabajo": "10 mA - 20 mA (IF típico)",
                "Caída de Voltaje Directa": "~2.0 V (Rojo) / ~3.0 V (Azul/Blanco)",
                "Ángulo de Visión": "60° típico",
                "Datasheet": "https://www.vishay.com/docs/83171/tlur640.pdf"
            },
            usageSteps: [
                "Identifique el Ánodo (+): pata más LARGA o lado sin bisel en el encapsulado.",
                "Calcule la resistencia limitadora: R = (VCC - VLED) / IF. Ejemplo: (5V - 2V) / 0.01A = 300Ω → use 330Ω.",
                "Nunca conecte un LED directamente a la fuente sin resistencia limitadora.",
                "Para controlar con Arduino/MCU, use el pin digital con la resistencia en serie.",
                "Voltaje de alimentación mínimo: VLED + 0.5V para asegurar conducción."
            ],
            type: "LED Indicador"
        },
        {
            name: "Diodo Puente KBL410",
            ref: "KBL410",
            category: "Diodos",
            mainCategory: "Circuitos Integrados",
            desc: "Puente rectificador monolítico de 4 diodos en un solo encapsulado. Simplifica el diseño de fuentes de alimentación AC/DC.",
            videoUrl: "https://www.youtube.com/watch?v=9csKNnm3UWE",
            imageUrl: "https://m.media-amazon.com/images/I/51UQikhCKNL._AC_.jpg",
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
            imageUrl: "https://m.media-amazon.com/images/I/61jC8Vq2SML._AC_SL1100_.jpg",
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
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Aircore.jpg/320px-Aircore.jpg",
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
            imageUrl: "https://m.media-amazon.com/images/I/71R5PeRwVhL._AC_SL1500_.jpg",
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
            name: "Choke de Modo Común SY10-102",
            ref: "IND-CMC",
            category: "Bobinas",
            mainCategory: "Circuitos Integrados",
            desc: "Bobina de modo común (Common Mode Choke). Filtra ruido electromagnético en líneas de potencia y comunicaciones sin afectar la señal diferencial.",
            videoUrl: "https://www.youtube.com/watch?v=5E6JC1CLHY0",
            imageUrl: "https://m.media-amazon.com/images/I/51MuA+b-EGL._AC_SL1000_.jpg",
            specs: {
                "Funcionamiento": "Presenta alta impedancia al ruido EMI de modo común, pero baja impedancia a la señal diferencial útil.",
                "Inductancia": "10 mH (por bobinado)",
                "Corriente Nominal": "1 A",
                "Resistencia DC": "< 1 Ω",
                "Aplicación": "Filtros EMI en entradas de fuentes, líneas USB, RS485",
                "Datasheet": "https://www.tdk-electronics.tdk.com/inf/20/20/db/fe/ACM.pdf"
            },
            usageSteps: [
                "Instale en serie con el par de cables (Line y Neutral o D+ y D-).",
                "Asegúrese de conectar correctamente el devanado 1 a la línea 1 y el devanado 2 a la línea 2.",
                "No invierta las terminales o el efecto de filtrado se cancela.",
                "En motores o fuentes ruidosas, ubíquelo lo más cerca posible de la entrada.",
                "Consulte el datasheet para verificar la curva de impedancia vs frecuencia del ruido a filtrar."
            ],
            type: "Choke de Modo Común"
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

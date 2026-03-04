document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const searchByText = document.getElementById('search-by-text');
    const searchByPhoto = document.getElementById('search-by-photo');
    const mainSearch = document.getElementById('main-search');
    const searchTrigger = document.getElementById('search-trigger');

    // Data - Equipos Electrónicos (Base de Datos Expandida)
    const equipmentData = [
        {
            name: "Osciloscopio Digital Rigol",
            ref: "DS1054Z",
            category: "Medición",
            desc: "Excelente para laboratorios educativos y aficionados. Muy popular por su hacking potencial.",
            specs: {
                "Ancho de Banda": "50 MHz",
                "Canales": "4 análogos",
                "Velocidad de Muestreo": "1 GSa/s",
                "Memoria": "12 Mpts (24 Mpts opc.)",
                "Pantalla": "7 pulgadas WVGA (800x480)"
            },
            usage: [
                "Conecte la sonda al terminal de prueba de compensación (0.5Vpp, 1kHz).",
                "Presione 'Auto' para ajustar la escala automáticamente.",
                "Use los mandos 'Vertical' para amplitud y 'Horizontal' para tiempo.",
                "Ajuste el 'Trigger' (disparo) para estabilizar la forma de onda."
            ],
            type: "Digital Storage Oscilloscope (DSO)"
        },
        {
            name: "Osciloscopio Tektronix",
            ref: "TBS1052B",
            category: "Medición",
            desc: "Instrumento robusto y preciso para entornos industriales y educativos.",
            specs: {
                "Ancho de Banda": "50 MHz",
                "Canales": "2 análogos",
                "Velocidad de Muestreo": "1 GSa/s",
                "Contador": "Frecuencímetro de doble canal",
                "Garantía": "5 años de fábrica"
            },
            usage: [
                "Realice la compensación de sondas antes de cualquier medición crítica.",
                "Seleccione el canal CH1 o CH2 activo.",
                "Configure el acoplamiento (AC/DC) según la componente de la señal.",
                "Use 'Single' para capturar eventos transitorios únicos."
            ],
            type: "Digital Storage Oscilloscope (DSO)"
        },
        {
            name: "Osciloscopio Siglent",
            ref: "SDS1202X-E",
            category: "Medición",
            desc: "Tecnología Super Phosphor (SPO) de alta velocidad.",
            specs: {
                "Ancho de Banda": "200 MHz",
                "Canales": "2 análogos",
                "Velocidad de Muestreo": "1 GSa/s",
                "Tasa de Captura": "100,000 wfm/s (normal) / 400,000 wfm/s (segmentada)",
                "Decodificación": "I2C, SPI, UART, CAN, LIN"
            },
            usage: [
                "Configure 'Peak Detect' para ver picos de ruido rápidos.",
                "Use el modo 'History' para retroceder en el tiempo y ver señales pasadas.",
                "Active la decodificación de protocolos en el menú 'Decode'.",
                "Use 'Segmented Memory' para capturar ráfagas de datos."
            ],
            type: "Super Phosphor Oscilloscope (SPO)"
        },
        {
            name: "Osciloscopio Portátil Hantek",
            ref: "2D42",
            category: "Medición",
            desc: "Instrumento multifunción para servicio técnico de campo.",
            specs: {
                "Ancho de Banda": "40 MHz",
                "Canales": "2 análogos",
                "DMM": "Multímetro Digital True RMS",
                "Generador": "Generador de formas de onda arbitrarias",
                "Autonomía": "Batería recargable (hasta 6h)"
            },
            usage: [
                "Use el modo 'Auto Test' para diagnósticos rápidos.",
                "Conmute entre Osciloscopio y Multímetro con una sola tecla.",
                "Utilice el generador para inyectar señales en la entrada de amplificadores.",
                "Recargue el equipo por USB tipo C."
            ],
            type: "Handheld DSO / DMM"
        },
        {
            name: "Multímetro Digital Fluke",
            ref: "117",
            category: "Medición",
            desc: "Diseñado para electricistas profesionales con tecnología VoltAlert.",
            specs: { "Precisión DC": "0.5%", "Cuentas": "6000", "Seguridad": "CAT III 600 V" },
            usage: ["Gire el selector a la magnitud deseada.", "Use 'Auto-V' para detectar AC o DC automáticamente.", "Presione el botón de luz para entornos oscuros."],
            type: "Digital Multimeter"
        },
        { name: "Fuente de Poder DC", ref: "GPP-4323", category: "Alimentación", desc: "4 canales aislados para experimentos complejos.", specs: { "Voltaje": "0-32V", "Corriente": "0-3A" }, usage: ["Establezca límites de corriente."], type: "DC Power Supply" },
        { name: "Generador de Funciones", ref: "FY6900", category: "Pruebas", desc: "DDS de doble canal de alta resolución.", specs: { "Frecuencia": "60MHz", "Canales": "2" }, usage: ["Seleccione tipo de onda."], type: "DDS Generator" },
        { name: "Analizador Lógico", ref: "Logic Pro", category: "Digital", desc: "Analiza hasta 16 canales digitales simultáneamente.", specs: { "Velocidad": "500MS/s", "Conexión": "USB 3.0" }, usage: ["Conecte al puerto USB."], type: "Logic Analyzer" }
    ];

    // Normalización de texto
    const normalize = (text) => {
        return text ? text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";
    };

    // Search Logic
    function performSearch() {
        const query = normalize(mainSearch.value.trim());
        const searchUI = document.getElementById('search-ui-results');

        if (query.length < 2) {
            searchUI.style.display = 'none';
            return;
        }

        const filtered = equipmentData.filter(item =>
            normalize(item.name).includes(query) ||
            normalize(item.ref).includes(query) ||
            normalize(item.desc).includes(query) ||
            (item.type && normalize(item.type).includes(query))
        );

        displayResults(filtered);
    }

    function displayResults(results) {
        const searchUI = document.getElementById('search-ui-results');
        const resultsGrid = document.getElementById('results-grid');

        resultsGrid.innerHTML = '';
        searchUI.style.display = 'block';

        if (results.length === 0) {
            resultsGrid.innerHTML = '<p class="no-results">No se encontraron dispositivos que coincidan.</p>';
            return;
        }

        results.forEach(item => {
            const card = document.createElement('div');
            card.className = 'result-card glass';
            card.innerHTML = `
                <div class="result-info">
                    <span class="category">${item.category}</span>
                    <h4>${item.name}</h4>
                    <p class="ref">Ref: ${item.ref}</p>
                    <p class="desc">${item.desc}</p>
                </div>
                <button class="view-more" onclick="showDetails('${item.ref}')">Ver ficha técnica</button>
            `;
            resultsGrid.appendChild(card);
        });
    }

    // Modal para Detalles
    window.showDetails = function (ref) {
        const item = equipmentData.find(e => e.ref === ref);
        if (!item) return;

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content glass">
                <button class="close-modal">&times;</button>
                <div class="modal-header">
                    <span class="category">${item.category}</span>
                    <h2>${item.name}</h2>
                    <p class="model-type">${item.type || 'Instrumento de Ingeniería'}</p>
                </div>
                <div class="modal-body">
                    <div class="specs-section">
                        <h3><i class="fas fa-list"></i> Ficha Técnica</h3>
                        <div class="specs-grid">
                            ${item.specs ? Object.entries(item.specs).map(([key, val]) => `
                                <div class="spec-item">
                                    <span class="spec-label">${key}</span>
                                    <span class="spec-value">${val}</span>
                                </div>
                            `).join('') : '<p>Consultar manual para más detalles.</p>'}
                        </div>
                    </div>
                    <div class="usage-section">
                        <h3><i class="fas fa-tools"></i> Funcionamiento</h3>
                        <ul>
                            ${item.usage ? item.usage.map(step => `<li>${step}</li>`).join('') : '<li>Referirse a la guía oficial de usuario.</li>'}
                        </ul>
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

    // Event Listeners
    mainSearch.addEventListener('input', performSearch);
    searchTrigger.addEventListener('click', (e) => { e.preventDefault(); performSearch(); });

    // Header Scroll Effect
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Tab Switching Logic
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const tab = btn.dataset.tab;
            if (tab === 'photo') {
                searchByText.style.display = 'none';
                searchByPhoto.style.display = 'block';
                document.getElementById('search-ui-results').style.display = 'none';
            } else {
                searchByText.style.display = 'block';
                searchByPhoto.style.display = 'none';
                mainSearch.placeholder = tab === 'ref' ? 'Ej: SDS1202X-E, FLUKE-117...' : 'Ej: Osciloscopio Digital, Multímetro Fluke...';
            }
        });
    });

    // Simulated Photo Upload
    const photoUpload = document.getElementById('photo-upload');
    photoUpload.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            const fileName = e.target.files[0].name;
            const label = document.querySelector('.photo-input-label span');
            label.innerText = `Analizando: ${fileName}...`;
            setTimeout(() => {
                label.innerText = '¡Osciloscopio Rigol detectado!';
                label.style.color = 'var(--accent)';
                mainSearch.value = "DS1054Z";
                performSearch();
            }, 2000);
        }
    });
});

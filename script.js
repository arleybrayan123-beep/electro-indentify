document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const searchByText = document.getElementById('search-by-text');
    const searchByPhoto = document.getElementById('search-by-photo');
    const mainSearch = document.getElementById('main-search');
    const searchTrigger = document.getElementById('search-trigger');

    // Data - Equipos Electrónicos
    const equipmentData = [
        { name: "Osciloscopio Digital", ref: "SDS1202X-E", desc: "Instrumento de medición para visualizar señales eléctricas.", category: "Medición" },
        { name: "Multímetro Digital", ref: "Fluke 117", desc: "Mide voltaje, corriente y resistencia con alta precisión.", category: "Medición" },
        { name: "Fuente de Poder DC", ref: "GPP-4323", desc: "Suministra energía constante a circuitos electrónicos.", category: "Alimentación" },
        { name: "Generador de Funciones", ref: "FY6900", desc: "Genera ondas senoidales, cuadradas y triangulares.", category: "Pruebas" },
        { name: "Estación de Soldadura", ref: "Hakko FX-888D", desc: "Herramienta para soldar componentes electrónicos.", category: "Montaje" },
        { name: "Analizador Lógico", ref: "Saleae Logic Pro", desc: "Captura y analiza protocolos de comunicación digital.", category: "Digital" },
        { name: "Capacímetro", ref: "CM-7115A", desc: "Mide la capacitancia de condensadores.", category: "Componentes" },
        { name: "Frecuencímetro", ref: "SF-401", desc: "Mide la frecuencia de señales repetitivas.", category: "Medición" },
        { name: "Sonda de Osciloscopio", ref: "P6100", desc: "Punta de prueba para conectar señales al osciloscopio.", category: "Accesorios" },
        { name: "Protoboard", ref: "MB-102", desc: "Placa de pruebas para prototipado rápido sin soldadura.", category: "Prototipado" }
    ];

    // Search Logic
    function performSearch() {
        const query = mainSearch.value.trim().toLowerCase();
        const searchUI = document.getElementById('search-ui-results');

        if (query.length < 2) {
            searchUI.style.display = 'none';
            return;
        }

        const filtered = equipmentData.filter(item =>
            item.name.toLowerCase().includes(query) ||
            item.ref.toLowerCase().includes(query)
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
                <button class="view-more">Ver especificaciones</button>
            `;
            resultsGrid.appendChild(card);
        });
    }

    // Event Listeners for Search
    mainSearch.addEventListener('input', performSearch);
    searchTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        performSearch();
    });

    // Header Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
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

                if (tab === 'ref') {
                    mainSearch.placeholder = 'Ej: SDS1202X-E, FLUKE-117...';
                } else {
                    mainSearch.placeholder = 'Ej: Osciloscopio Digital, Multímetro Fluke...';
                }
            }
        });
    });

    // Simulated Photo Upload Sequence
    const photoUpload = document.getElementById('photo-upload');
    photoUpload.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            const fileName = e.target.files[0].name;
            const label = document.querySelector('.photo-input-label span');
            label.innerText = `Analizando: ${fileName}...`;

            setTimeout(() => {
                label.innerText = '¡Dispositivo identificado!';
                label.style.color = 'var(--accent)';

                // Simulate identification
                mainSearch.value = "Osciloscopio Digital";
                performSearch();
            }, 2000);
        }
    });
});

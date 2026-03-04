document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const searchByText = document.getElementById('search-by-text');
    const searchByPhoto = document.getElementById('search-by-photo');
    const mainSearch = document.getElementById('main-search');
    const searchTrigger = document.getElementById('search-trigger');

    // Search Trigger Logic
    searchTrigger.addEventListener('click', () => {
        const query = mainSearch.value.trim();
        if (query) {
            // Simulated search action
            const originalIcon = searchTrigger.innerHTML;
            searchTrigger.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

            setTimeout(() => {
                alert(`Buscando especificaciones para: ${query}`);
                searchTrigger.innerHTML = originalIcon;
            }, 1000);
        } else {
            mainSearch.focus();
        }
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
            // Remove active class from all
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add to current
            btn.classList.add('active');

            const tab = btn.dataset.tab;

            if (tab === 'photo') {
                searchByText.style.display = 'none';
                searchByPhoto.style.display = 'block';
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
            }, 2000);
        }
    });
});

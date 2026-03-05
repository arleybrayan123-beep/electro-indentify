/* JS RESTORED AND UPDATED FOR VIDEO TUTORIALS */
/* Version 9.9.9 */
document.addEventListener('DOMContentLoaded', () => {
    const equipmentData = [
        {
            name: "Osciloscopio Digital Rigol",
            ref: "DS1054Z",
            category: "Osciloscopios",
            desc: "Excelente para laboratorios educativos y aficionados. Muy popular por su hacking potencial.",
            videoUrl: "https://www.youtube.com/watch?v=-fYAJQ9uCUg",
            specs: { "Ancho de Banda": "50 MHz", "Canales": "4 análogos", "Velocidad de Muestreo": "1 GSa/s" },
            usageSteps: [
                "Conecte la sonda al terminal de entrada BNC del canal 1.",
                "Conecte la punta al terminal de prueba de compensación (0.5Vpp).",
                "Ajuste el mando 'Vertical' y 'Horizontal' para centrar la señal.",
                "Capture y analice los valores de Vpp y frecuencia en pantalla."
            ]
        },
        {
            name: "Osciloscopio Tektronix",
            ref: "TBS1052B",
            category: "Osciloscopios",
            desc: "Instrumento robusto y preciso para entornos industriales y educativos.",
            videoUrl: "https://www.youtube.com/watch?v=TCCdMGBlSko",
            specs: { "Ancho de Banda": "50 MHz", "Canales": "2 análogos", "Muestreo": "1 GSa/s" },
            usageSteps: [
                "Instale la sonda en el canal activo (CH1 o CH2).",
                "Presione 'PROBE CHECK' para compensar la sonda rápidamente.",
                "Use los mandos físicos para ajustar escala y posición.",
                "Observe la señal estable; use 'Single' para disparos únicos."
            ]
        }
    ];

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
                            ${Object.entries(item.specs).map(([k, v]) => `
                                <div class="spec-item"><span class="spec-label">${k}</span><span class="spec-value">${v}</span></div>
                            `).join('')}
                        </div>
                        ${item.videoUrl ? `
                        <div style="margin-top: 2rem;">
                            <a href="${item.videoUrl}" target="_blank" class="btn-details" style="display: block; text-align: center; text-decoration: none;">
                                <i class="fab fa-youtube"></i> VER VIDEO TUTORIAL
                            </a>
                        </div>
                        ` : ''}
                    </div>
                    <div class="usage-section" style="margin-top: 2rem;">
                        <h3>Guía Rápida</h3>
                        <ul class="usage-list">
                            ${item.usageSteps.map(s => `<li>${s}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('active'), 10);
        modal.querySelector('.close-modal').onclick = () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 400);
        };
    };
});

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
    }
};

function renderChip(chipId) {
    const data = pinoutData[chipId];
    if (!data) return;

    const leftPins = data.pins.filter(p => p.side === 'left');
    const rightPins = data.pins.filter(p => p.side === 'right');
    rightPins.reverse(); // Standard view: pins go up on the right

    let chipHtml = `
        <div class="chip-dip ${data.type || ''} animate">
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
    console.log(chipHtml);
}

renderChip('ne555');

const fs = require('fs');

let css = fs.readFileSync('index.css', 'utf-8');

// 1. root variables
css = css.replace(/:root\s*\{.*?\}(?=\s*\* \{)/s,
    `:root {
    --primary-bg: #ffffff;
    --secondary-bg: #f8fafc;
    --accent: #2563eb;
    --accent-glow: rgba(37, 99, 235, 0.3);
    --text-main: #0f172a;
    --text-muted: #64748b;
    --glass: rgba(255, 255, 255, 1);
    --glass-border: rgba(0, 0, 0, 0.1);
    --header-bg: #0f172a;
    --header-text: #ffffff;
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

`);

// 2. glass
css = css.replace(/\.glass\s*\{[\s\S]*?border-radius:\s*16px;[\s\S]*?\}/,
    `.glass {
    background: rgba(255, 255, 255, 1);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}`);

// 3. header
css = css.replace(/header\s*\{[\s\S]*?transition:\s*var\(--transition\);\s*\}/,
    `header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    padding: 1.5rem 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--header-bg);
    color: var(--header-text);
    transition: var(--transition);
}`);

css = css.replace(/header\.scrolled\s*\{[\s\S]*?padding:\s*1rem 5%;\s*\}/,
    `header.scrolled {
    background: rgba(15, 23, 42, 0.95);
    backdrop-filter: blur(10px);
    padding: 1rem 5%;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}`);

// 4. logo colors
css = css.replace(/\.logo\s*\{[\s\S]*?color:\s*var\(--text-main\);\s*\}/,
    `.logo {
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.5px;
    color: var(--header-text);
}`);

css = css.replace(/\.logo span\s*\{[\s\S]*?color:\s*var\(--accent\);\s*\}/,
    `.logo span {
    color: #38bdf8;
}`);

// 5. hero-bg
css = css.replace(/\.hero-bg img\s*\{[\s\S]*?opacity:\s*0\.4;\s*\}/,
    `.hero-bg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 1;
}`);

css = css.replace(/\.hero-bg::after\s*\{[\s\S]*?background:\s*linear-gradient[\s\S]*?\s*\}/,
    `.hero-bg::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(15,23,42,0.6), rgba(15,23,42,0.9) 70%, var(--primary-bg));
    z-index: 1;
}`);

css = css.replace(/\.hero-content\s*\{/,
    `.hero-content {
    position: relative;
    z-index: 10;`);

// h1
css = css.replace(/h1\s*\{[\s\S]*?background-clip:\s*text;[\s\S]*?-webkit-text-fill-color:\s*transparent;\s*\}/,
    `h1 {
    font-size: 4rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--text-main);
}

.hero-content h1 {
    background: #ffffff;
    color: #ffffff;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}`);

// subtitle
css = css.replace(/\.hero-subtitle\s*\{[\s\S]*?color:\s*var\(--text-muted\);\s*margin-bottom:\s*3rem;\s*\}/,
    `.hero-subtitle {
    font-size: 1.25rem;
    color: #e2e8f0;
    margin-bottom: 3rem;
}`);

// tab-btn
css = css.replace(/\.tab-btn\s*\{[\s\S]*?color:\s*var\(--text-muted\);/,
    `.tab-btn {
    background: none;
    border: none;
    color: var(--text-main);`);

// input
css = css.replace(/\.search-input-wrapper input\s*\{[\s\S]*?color:\s*#fff;/,
    `.search-input-wrapper input {
    width: 100%;
    height: 60px;
    padding: 0 4.5rem 0 1.5rem;
    background: rgba(255, 255, 255, 1);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    color: var(--text-main);`);

// cards
css = css.replace(/\.equipment-card,\s*\.result-card\s*\{[\s\S]*?box-shadow:.*?;\s*\}/,
    `.equipment-card,
.result-card {
    padding: 2.5rem;
    background: #ffffff;
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}`);

css = css.replace(/\.equipment-card:hover,\s*\.result-card:hover\s*\{[\s\S]*?box-shadow:.*?;\s*\}/,
    `.equipment-card:hover,
.result-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 30px rgba(37, 99, 235, 0.15);
}`);

// results
css = css.replace(/\.search-results-overlay\s*\{[\s\S]*?border:\s*1px solid var\(--glass-border\);/,
    `.search-results-overlay {
    margin-top: 2rem;
    width: 100%;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    max-height: 400px;
    overflow-y: auto;
    padding: 1rem;
    border-radius: 20px;
    background: #ffffff;
    border: 1px solid var(--glass-border);`);

css = css.replace(/\.result-info h4\s*\{[\s\S]*?color:\s*#fff;/,
    `.result-info h4 {
    font-size: 1.5rem;
    margin: 0.5rem 0;
    color: var(--text-main);`);

css = css.replace(/\.result-info \.desc-preview\s*\{[\s\S]*?color:\s*#a0a0a0;/,
    `.result-info .desc-preview {
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--text-muted);`);

// modal
css = css.replace(/\.modal-overlay\s*\{[\s\S]*?background:[\s\S]*?\s*display:\s*flex;/,
    `.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(15, 23, 42, 0.8);
    backdrop-filter: blur(5px);
    display: flex;`);

css = css.replace(/\.modal-content\s*\{[\s\S]*?background:\s*#0a0b10;\s*\}/,
    `.modal-content {
    width: 95%;
    max-width: 900px;
    max-height: 90vh;
    padding: 2.5rem;
    overflow-y: auto;
    position: relative;
    transform: translateY(20px);
    transition: transform 0.3s ease-out;
    border-radius: 30px;
    background: #ffffff;
}`);

css = css.replace(/\.spec-value\s*\{[\s\S]*?color:\s*#fff;/,
    `.spec-value {
    color: var(--text-main);`);

css = css.replace(/\.usage-list li\s*\{[\s\S]*?color:\s*#fff;/,
    `.usage-list li {
    padding-left: 2rem;
    position: relative;
    margin-bottom: 0.8rem;
    font-size: 1rem;
    color: var(--text-main);`);

css = css.replace(/\.equipment-image-container\s*\{[\s\S]*?background:\s*#0a0b10;/,
    `.equipment-image-container {
    margin-top: 1.2rem;
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid var(--glass-border);
    background: #f8fafc;`);

// catalog bg
css = css.replace(/\.catalog-bg\s*\{[\s\S]*?background:[\s\S]*?\s*z-index:\s*-2;\s*opacity:\s*0\.2;\s*\}/,
    `.catalog-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop') center/cover no-repeat;
    z-index: -2;
    opacity: 0.1;
}`);

css = css.replace(/\.catalog-overlay\s*\{[\s\S]*?z-index:\s*-1;\s*\}/,
    `.catalog-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.9), var(--primary-bg));
    z-index: -1;
}`);

// main category cards
css = css.replace(/\.main-category-card\s*\{[\s\S]*?box-shadow:.*?;[\s\S]*?\}/,
    `.main-category-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 4rem 2rem;
    background: #ffffff;
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}`);

css = css.replace(/\.main-category-card h3\s*\{[\s\S]*?color:\s*#fff;/,
    `.main-category-card h3 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: var(--text-main);`);

css = css.replace(/\.spec-img-container\s*\{[\s\S]*?background:\s*#0d0f17;/,
    `.spec-img-container {
    margin-top: 0.5rem;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--glass-border);
    background: #f8fafc;`);

fs.writeFileSync('index.css', css, 'utf-8');
console.log('CSS updated');

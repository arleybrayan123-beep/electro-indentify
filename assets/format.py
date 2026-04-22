import re

with open('index.css', 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Update root variables
css = re.sub(
r':root\s*\{.*?\}(?=\s*\* \{)',
r''':root {
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

''', css, flags=re.DOTALL)

# 2. Update .glass
css = re.sub(
r'\.glass\s*\{\s*background: rgba\(25, 27, 35, 0\.85\);\s*/\*.*?\*/\s*border: 1px solid var\(--glass-border\);\s*border-radius: 16px;\s*/\*.*?\*/\s*\}',
r'''.glass {
    background: rgba(255, 255, 255, 1);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}''', css, flags=re.DOTALL)

# 3. Update header
css = re.sub(
r'header\s*\{\s*position: fixed.*?transition: var\(--transition\);\s*\}',
r'''header {
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
}''', css, flags=re.DOTALL)

css = re.sub(
r'header\.scrolled\s*\{\s*background: rgba\(10, 11, 16, 0\.8\);\s*backdrop-filter: blur\(10px\);\s*padding: 1rem 5%;\s*\}',
r'''header.scrolled {
    background: rgba(15, 23, 42, 0.95);
    backdrop-filter: blur(10px);
    padding: 1rem 5%;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}''', css, flags=re.DOTALL)


# 4. logo colors
css = re.sub(
r'\.logo\s*\{\s*font-size: 1\.5rem;.*?color: var\(--text-main\);\s*\}',
r'''.logo {
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.5px;
    color: var(--header-text);
}''', css, flags=re.DOTALL)

css = re.sub(
r'\.logo span\s*\{\s*color: var\(--accent\);\s*\}',
r'''.logo span {
    color: #38bdf8;
}''', css, flags=re.DOTALL)

# 5. H1
css = re.sub(
r'h1\s*\{\s*font-size: 4rem;.*?font-weight: 700;.*?margin-bottom: 1\.5rem;.*?background: linear-gradient.*?transparent;\s*\}',
r'''h1 {
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
}''', css, flags=re.DOTALL)

# 6. .hero-subtitle
css = re.sub(
r'\.hero-subtitle\s*\{\s*font-size: 1\.25rem;\s*color: var\(--text-muted\);\s*margin-bottom: 3rem;\s*\}',
r'''.hero-subtitle {
    font-size: 1.25rem;
    color: #e2e8f0;
    margin-bottom: 3rem;
}''', css, flags=re.DOTALL)

css = re.sub(
r'\.tab-btn\s*\{\s*background: none;\s*border: none;\s*color: var\(--text-muted\);',
r'''.tab-btn {
    background: none;
    border: none;
    color: var(--text-main);''', css, flags=re.DOTALL)


# 8. search input
css = re.sub(
r'\.search-input-wrapper input\s*\{\s*width: 100%;\s*height: 60px;\s*/\*.*?px;\s*color: #fff;',
r'''.search-input-wrapper input {
    width: 100%;
    height: 60px;
    padding: 0 4.5rem 0 1.5rem;
    background: rgba(255, 255, 255, 1);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    color: var(--text-main);''', css, flags=re.DOTALL)

# 10. equipment-card
css = re.sub(
r'\.equipment-card,\s*\.result-card\s*\{\s*padding: 2\.5rem;\s*background: #12141c;.*?box-shadow: 0 4px 10px rgba\(0, 0, 0, 0\.3\);\s*\}',
r'''.equipment-card,
.result-card {
    padding: 2.5rem;
    background: #ffffff;
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}''', css, flags=re.DOTALL)

css = re.sub(
r'\.equipment-card:hover,\s*\.result-card:hover\s*\{\s*transform: translateY\(-8px\);\s*box-shadow: 0 10px 30px rgba\(0, 242, 255, 0\.15\);\s*\}',
r'''.equipment-card:hover,
.result-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 30px rgba(37, 99, 235, 0.15);
}''', css, flags=re.DOTALL)

css = re.sub(
r'\.search-results-overlay\s*\{\s*margin-top: 2rem;\s*width: 100%;\s*max-width: 800px;\s*margin-left: auto;\s*margin-right: auto;\s*max-height: 400px;\s*overflow-y: auto;\s*padding: 1rem;\s*border-radius: 20px;\s*background: #0d0f17;\s*/\* Fondo sólido \*/\s*border: 1px solid var\(--glass-border\);',
r'''.search-results-overlay {
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
    border: 1px solid var(--glass-border);''', css, flags=re.DOTALL)

css = re.sub(
r'\.result-info h4\s*\{\s*font-size: 1\.5rem;\s*margin: 0\.5rem 0;\s*color: #fff;',
r'''.result-info h4 {
    font-size: 1.5rem;
    margin: 0.5rem 0;
    color: var(--text-main);''', css, flags=re.DOTALL)

# 11. Modal
css = re.sub(
r'\.modal-overlay\s*\{\s*position: fixed;.*?background: rgba\(0, 0, 0, 0\.96\);',
r'''.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(15, 23, 42, 0.8);''', css, flags=re.DOTALL)

css = re.sub(
r'\.modal-content\s*\{\s*width: 95%;\s*max-width: 900px;\s*max-height: 90vh;\s*padding: 2\.5rem;\s*/\*.*?\*/\s*overflow-y: auto;\s*position: relative;\s*transform: translateY\(20px\);\s*transition: transform 0\.3s ease-out;\s*border-radius: 30px;\s*background: #0a0b10;\s*\}',
r'''.modal-content {
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
}''', css, flags=re.DOTALL)

css = re.sub(
r'\.spec-value\s*\{\s*color: #fff;',
r'''.spec-value {
    color: var(--text-main);''', css, flags=re.DOTALL)

css = re.sub(
r'\.usage-list li\s*\{\s*padding-left: 2rem;\s*position: relative;\s*margin-bottom: 0\.8rem;\s*/\*.*?\*/\s*font-size: 1rem;\s*color: #fff;',
r'''.usage-list li {
    padding-left: 2rem;
    position: relative;
    margin-bottom: 0.8rem;
    font-size: 1rem;
    color: var(--text-main);''', css, flags=re.DOTALL)

css = re.sub(
r'\.equipment-image-container\s*\{\s*margin-top: 1\.2rem;\s*border-radius: 14px;\s*overflow: hidden;\s*border: 1px solid rgba\(255, 255, 255, 0\.08\);\s*background: #0a0b10;',
r'''.equipment-image-container {
    margin-top: 1.2rem;
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid var(--glass-border);
    background: #f8fafc;''', css, flags=re.DOTALL)

css = re.sub(
r'\.catalog-bg\s*\{\s*position: absolute;\s*top: 0;\s*left: 0;\s*width: 100%;\s*height: 100%;\s*background: url\(\'assets/hero\.png\'\) center/cover no-repeat;\s*z-index: -2;\s*opacity: 0\.2;\s*\}',
r'''.catalog-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop') center/cover no-repeat;
    z-index: -2;
    opacity: 0.1;
}''', css, flags=re.DOTALL)

css = re.sub(
r'\.hero-bg::after\s*\{\s*content: \'\';\s*position: absolute;\s*bottom: 0;\s*left: 0;\s*width: 100%;\s*height: 30%;\s*background: linear-gradient\(transparent, var\(--primary-bg\)\);\s*\}',
r'''.hero-bg::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(15,23,42,0.5), rgba(15,23,42,0.8) 70%, var(--primary-bg));
    z-index: 1;
}''', css, flags=re.DOTALL)

css = re.sub(
r'\.catalog-overlay\s*\{\s*position: absolute;\s*top: 0;\s*left: 0;\s*width: 100%;\s*height: 100%;\s*background: linear-gradient\(to bottom, rgba\(10, 11, 16, 0\.8\), var\(--primary-bg\)\);\s*z-index: -1;\s*\}',
r'''.catalog-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.9), var(--primary-bg));
    z-index: -1;
}''', css, flags=re.DOTALL)

# Add final check for color: var(--text-main) overrides on dark backgrounds
css = re.sub(
r'\.search-results-overlay\s*\{\s*margin-top: 2rem;\s*width: 100%;\s*max-width: 800px;\s*margin-left: auto;\s*margin-right: auto;\s*max-height: 400px;\s*overflow-y: auto;\s*padding: 1rem;\s*border-radius: 20px;\s*background: #ffffff;\s*border: 1px solid var\(--glass-border\);',
r'''.search-results-overlay {
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
    border: 1px solid var(--glass-border);''', css, flags=re.DOTALL)

with open('index.css', 'w', encoding='utf-8') as f:
    f.write(css)
print("CSS updated successfully")

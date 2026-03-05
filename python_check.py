import re

with open("script.js", "r", encoding="utf-8", errors="replace") as f:
    text = f.read()

# Find words with non-ascii chars
words = re.findall(r'\w*[^\x00-\x7F]\w*', text)
unique_words = sorted(set(words))
print("Broken words:", unique_words)

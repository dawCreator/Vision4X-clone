const fs = require('fs').promises;
const path = require('path');

const ROOT = path.resolve(__dirname);
const SRC_DIR = path.join(ROOT, 'src');
const INDEX_HTML = path.join(ROOT, 'index.html');

async function walkFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...await walkFiles(fullPath));
    } else {
      results.push(fullPath);
    }
  }

  return results;
}

function normalize(filePath) {
  return path.relative(ROOT, filePath).split(path.sep).join('/');
}

function renderCss(files) {
  return files.map((file) => `  <link rel="stylesheet" href="${normalize(file)}">`).join('\n');
}

function renderJs(files) {
  return files.map((file) => `  <script type="module" src="${normalize(file)}"></script>`).join('\n');
}

async function renderHtml(files) {
  const parts = [];
  for (const file of files) {
    const content = await fs.readFile(file, 'utf8');
    parts.push(`  <!-- ${normalize(file)} -->\n${content.trim()}`);
  }
  return parts.join('\n');
}

async function updateIndex() {
  const index = await fs.readFile(INDEX_HTML, 'utf8');
  const srcFiles = await walkFiles(SRC_DIR);
  const cssFiles = srcFiles.filter((file) => file.endsWith('.css')).sort();
  const jsFiles = srcFiles.filter((file) => file.endsWith('.js')).sort();
  const htmlFiles = srcFiles.filter((file) => file.endsWith('.html')).sort();

  let result = index;

  const replaceBlock = (startMarker, endMarker, content) => {
    const regex = new RegExp(`(${startMarker})([\\s\\S]*?)(${endMarker})`, 'm');
    return result.replace(regex, `$1\n${content}\n$3`);
  };

  result = replaceBlock('<!-- GENERATED CSS START -->', '<!-- GENERATED CSS END -->', [
    '<!-- // CSS -->',
    renderCss(cssFiles),
  ].filter(Boolean).join('\n'));

  result = replaceBlock('<!-- GENERATED HTML BODY START -->', '<!-- GENERATED HTML BODY END -->', [
    '<!-- // HTML -->',
    await renderHtml(htmlFiles),
  ].filter(Boolean).join('\n'));

  result = replaceBlock('<!-- GENERATED JS START -->', '<!-- GENERATED JS END -->', [
    '<!-- // JS -->',
    renderJs(jsFiles),
  ].filter(Boolean).join('\n'));

  await fs.writeFile(INDEX_HTML, result, 'utf8');
}

updateIndex().catch((error) => {
  console.error(error);
  process.exit(1);
});

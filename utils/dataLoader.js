const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');

/**
 * Read a JSON file from /data by name (without extension).
 * Files are read fresh on every request, so editing a JSON file
 * updates the site instantly — no restart needed.
 */
function getData(name) {
  const safeName = String(name).replace(/[^a-z0-9_-]/gi, '');
  const filePath = path.join(DATA_DIR, `${safeName}.json`);

  if (!fs.existsSync(filePath)) return null;

  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (err) {
    console.error(`Invalid JSON in data/${safeName}.json:`, err.message);
    return null;
  }
}

/** List all available data files (used by the API index). */
function listData() {
  return fs
    .readdirSync(DATA_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace('.json', ''));
}

module.exports = { getData, listData };

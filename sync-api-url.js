const fs = require('fs');
const path = require('path');

const backendEnvPath = path.join(__dirname, '..', 'ImposterBackend', '.env');
const frontendConfigPath = path.join(__dirname, 'config.js');

// Read backend .env
const envContent = fs.readFileSync(backendEnvPath, 'utf8');
const apiUrlMatch = envContent.match(/API_URL=(.+)/);

if (!apiUrlMatch) {
  console.error('API_URL not found in backend .env');
  process.exit(1);
}

const apiUrl = apiUrlMatch[1].trim();

// Write to frontend config.js
const configContent = `const API_URL = '${apiUrl}';\n\nexport default API_URL;\n`;
fs.writeFileSync(frontendConfigPath, configContent);

console.log(`✅ Synced API_URL to frontend: ${apiUrl}`);

const fs = require('fs');
const path = require('path');
const specs = require('./swaggerConfig'); 

// Mappen där dokumentationen ska sparas (blir 'docs/' i API-mappen)
const docsDir = path.join(__dirname, 'docs');

// Skapar mappen om den inte finns
if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir);
}

// Skriv den statiska JSON-filen
fs.writeFileSync(
    path.join(docsDir, 'openapi.json'), 
    JSON.stringify(specs, null, 2)
);

console.log('OpenAPI documentation successfully generated to /docs/openapi.json');
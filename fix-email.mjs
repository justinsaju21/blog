import fs from 'fs';
let content = fs.readFileSync('src/lib/email.ts', 'utf8');
content = content.replace(/\\\${/g, '${');
fs.writeFileSync('src/lib/email.ts', content);

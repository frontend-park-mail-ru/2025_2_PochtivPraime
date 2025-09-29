import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Предкомпиляция Handlebars-шаблонов.
 * Для каждой папки в src/shared/ui ищем файл Component/Component.hbs и компилируем его
 * в JS-модуль Component/Component.precompiled.js
 */
const componentsPath = path.join(__dirname, 'src/shared/ui');

for (const dir of fs.readdirSync(componentsPath)) {
    const componentDir = path.join(componentsPath, dir);
    const hbsFile = path.join(componentDir, `${dir}.hbs`);
    const precompiledFile = path.join(componentDir, `${dir}.precompiled.js`);

    const templateSource = fs.readFileSync(hbsFile, 'utf8');
    const precompiled = Handlebars.precompile(templateSource);
    const moduleContent = `import Handlebars from 'handlebars/runtime.js';\nexport default Handlebars.template(${precompiled});\n`;

    fs.writeFileSync(precompiledFile, moduleContent, 'utf8');
}
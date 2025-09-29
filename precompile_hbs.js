// precompile_hbs.js
import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function precompileTemplates(relativePath) {
    const componentsPath = path.join(__dirname, 'src', relativePath);

    if (!fs.existsSync(componentsPath)) {
        console.warn(`Папка ${relativePath} не найдена, пропускаем`);
        return;
    }

    for (const dir of fs.readdirSync(componentsPath)) {
        const componentDir = path.join(componentsPath, dir);
        
        if (!fs.statSync(componentDir).isDirectory()) {
            continue;
        }

        const hbsFile = path.join(componentDir, `${dir}.hbs`);
        const precompiledFile = path.join(componentDir, `${dir}.precompiled.js`);

        if (!fs.existsSync(hbsFile)) {
            console.warn(`Файл ${hbsFile} не найден, пропускаем`);
            continue;
        }

        const templateSource = fs.readFileSync(hbsFile, 'utf8');
        const precompiled = Handlebars.precompile(templateSource);
        
        // Убираем импорт, используем глобальный Handlebars
        const moduleContent = `export default Handlebars.template(${precompiled});\n`;

        fs.writeFileSync(precompiledFile, moduleContent, 'utf8');
    }
}

precompileTemplates('shared/ui');
precompileTemplates('widgets');
precompileTemplates('entities/Board/ui');
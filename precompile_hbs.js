const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");

/**
 * Предкомпиляция Handlebars-шаблонов.
 * Для каждой папки в src/shared/ui ищем файл Сomponent/Сomponent.hbs и компилирум его
 *  в JS-модуль Сomponent/Сomponent.precompiled.js
 */

const componentsPath = path.join(__dirname, "src/shared/ui");

for (const dir of fs.readdirSync(componentsPath)) {
  const componentDir = path.join(componentsPath, dir);
  const hbsFile = path.join(componentDir, `${dir}.hbs`);
  const precompiledFile = path.join(componentDir, `${dir}.precompiled.js`);
  
  const templateSource = fs.readFileSync(hbsFile, "utf8");
  const precompiled = Handlebars.precompile(templateSource);
  const moduleContent = `export default Handlebars.template(${precompiled});\n`;
  fs.writeFileSync(precompiledFile, moduleContent, "utf8");
}
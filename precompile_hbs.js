const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");

/**
 * Предкомпиляция Handlebars-шаблонов.
 * Для каждой папки в src/shared/ui:
 *  - ищется файл <Сomponent>/<Сomponent>.hbs
 *  - компилируется в JS-модуль <Сomponent>/<Сomponent>.precompiled.js
 */
const ROOT = path.join(__dirname, "src/shared/ui");

for (const dir of fs.readdirSync(ROOT)) {
  const componentDir = path.join(ROOT, dir);
  const hbsFile = path.join(componentDir, `${dir}.hbs`);
  const outFile = path.join(componentDir, `${dir}.precompiled.js`);

  if (fs.existsSync(hbsFile)) {
    const templateSource = fs.readFileSync(hbsFile, "utf8");
    const precompiled = Handlebars.precompile(templateSource);

    const moduleContent =
      'import * as Handlebars from "handlebars/runtime";\n\n' +
      `export default Handlebars.template(${precompiled});\n`;

    fs.writeFileSync(outFile, moduleContent, "utf8");
  }
}
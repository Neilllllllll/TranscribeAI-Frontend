const fs = require("fs");
const path = require("path");
require("dotenv").config({
  path: require("path").resolve(__dirname, "../env/.env")
}); // charge le fichier .env à la racine

const templatePath = path.resolve(__dirname, "../public/env.template.js");
const outputPath = path.resolve(__dirname, "../public/env.js");

// 1) Lire le template
let template = fs.readFileSync(templatePath, "utf8");

// 2) Remplacer ${VAR} par process.env.VAR
template = template.replace(/\$\{([A-Z0-9_]+)\}/g, (_, key) => {
  const value = process.env[key];
  return value !== undefined ? value : "";
});

// 3) Écrire env.js
fs.writeFileSync(outputPath, template, "utf8");

console.log("✅ env.js généré :", outputPath);
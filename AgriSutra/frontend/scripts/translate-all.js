const fs = require("fs");
const path = require("path");
const translate = require("google-translate-api-x");

const localesDir = path.resolve(__dirname, "../app/locales");
const sourceFile = path.resolve(localesDir, "en.json");
const targetLocales = ["gu", "hi", "mr"]; // List of locales to translate TO

async function translateFile(targetLocale) {
  const targetPath = path.resolve(localesDir, `${targetLocale}.json`);

  if (!fs.existsSync(sourceFile)) {
    console.error("en.json not found!");
    return;
  }

  const enData = JSON.parse(fs.readFileSync(sourceFile, "utf8"));
  let targetData = {};
  if (fs.existsSync(targetPath)) {
    targetData = JSON.parse(fs.readFileSync(targetPath, "utf8"));
  }

  console.log(`\n--- Translating to ${targetLocale} ---`);

  async function translateObject(sourceObj, targetObj) {
    for (const key in sourceObj) {
      if (typeof sourceObj[key] === "object" && sourceObj[key] !== null) {
        if (!targetObj[key]) targetObj[key] = {};
        await translateObject(sourceObj[key], targetObj[key]);
      } else {
        // Translate only if missing or same as key (placeholder)
        if (!targetObj[key] || targetObj[key] === sourceObj[key]) {
          try {
            const res = await translate(sourceObj[key], { to: targetLocale });
            targetObj[key] = res.text;
            console.log(
              `✓ Translated [${key}]: ${sourceObj[key]} -> ${res.text}`,
            );
          } catch (err) {
            console.error(`✗ Error translating ${key}:`, err.message);
          }
        }
      }
    }
  }

  await translateObject(enData, targetData);
  fs.writeFileSync(targetPath, JSON.stringify(targetData, null, 4), "utf8");
  console.log(`Done: ${targetLocale}.json updated.`);
}

async function run() {
  for (const locale of targetLocales) {
    await translateFile(locale);
  }
}

run().catch(console.error);

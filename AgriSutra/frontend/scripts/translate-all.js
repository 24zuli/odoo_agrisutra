const fs = require("fs");
const path = require("path");
const translate = require("google-translate-api-x");

const localesDir = path.resolve(__dirname, "../app/locales");
const sourceFile = path.resolve(localesDir, "en.json");
const targetLocales = ["gu", "hi", "mr", "ta", "te", "kn", "ml", "bn", "pa"]; // List of locales to translate TO

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
          let retryCount = 0;
          const maxRetries = 3;
          while (retryCount < maxRetries) {
            try {
              const res = await translate(sourceObj[key], { to: targetLocale });
              targetObj[key] = res.text;
              console.log(
                `✓ Translated [${key}]: ${sourceObj[key]} -> ${res.text}`,
              );
              // Add a larger delay to avoid rate limiting
              await new Promise((resolve) => setTimeout(resolve, 3000));
              break;
            } catch (err) {
              if (err.message.includes("Too Many Requests")) {
                retryCount++;
                const waitTime = retryCount * 10000; // 10s, 20s, 30s
                console.error(
                  `! Rate limit hit for ${key}. Retrying in ${waitTime / 1000}s... (Attempt ${retryCount}/${maxRetries})`,
                );
                await new Promise((resolve) => setTimeout(resolve, waitTime));
              } else {
                console.error(`✗ Error translating ${key}:`, err.message);
                await new Promise((resolve) => setTimeout(resolve, 2000));
                break;
              }
            }
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

const fs = require("fs");
const path = require("path");
const glob = require("glob");

const localesDir = path.resolve(__dirname, "../app/locales");
const languages = ["en", "gu", "hi", "mr", "ta", "te", "kn", "ml", "bn", "pa"]; // Support more here

// Step 1: Find all t('key') or t("key") or t(`key`) in the app directory
const keys = new Set();
const files = glob.sync("app/**/*.{js,jsx,ts,tsx}", {
  ignore: "app/locales/**",
});

console.log(`Scanning ${files.length} files for translation keys...`);

files.forEach((file) => {
  const content = fs.readFileSync(file, "utf8");
  // Regex to match t('key') or t('namespace:key')
  const regex = /t\s*\(\s*(['"`])(.*?)\1/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    keys.add(match[2]);
  }
});

console.log(`Found ${keys.size} unique keys.`);

// Step 2: Update all language JSON files
languages.forEach((lang) => {
  const filePath = path.resolve(localesDir, `${lang}.json`);
  let data = {};
  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  }

  const setNested = (obj, path, value) => {
    // If the path contains spaces, it's likely a sentence, not a nested key
    if (path.includes(" ")) {
      if (typeof obj[path] === "undefined") {
        obj[path] = value;
        return true;
      }
      return false;
    }

    const keys = path.split(".");
    let current = obj;
    let modified = false;
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!current[key] || typeof current[key] !== "object") {
        current[key] = {};
        modified = true;
      }
      current = current[key];
    }
    const lastKey = keys[keys.length - 1];
    if (typeof current[lastKey] === "undefined") {
      current[lastKey] = value;
      modified = true;
    }
    return modified;
  };

  let updated = false;
  keys.forEach((key) => {
    if (setNested(data, key, key)) {
      updated = true;
    }
  });

  if (updated) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4), "utf8");
    console.log(`✓ Updated ${lang}.json`);
  } else {
    console.log(`- ${lang}.json is already up to date.`);
  }
});

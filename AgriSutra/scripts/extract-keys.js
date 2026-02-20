const fs = require("fs");
const path = require("path");
const glob = require("glob");

const localesDir = path.resolve(__dirname, "../app/locales");
const languages = ["en", "gu", "hi", "mr"]; // Support more here

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

  let updated = false;
  keys.forEach((key) => {
    // Handle nested keys if needed (for simplicity, we handle flat keys first)
    // If your app uses nested keys, this would need to recursively ensure the object exists
    if (!data[key]) {
      data[key] = key; // Use key as default value
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

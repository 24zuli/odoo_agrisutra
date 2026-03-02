const fs = require("fs");
const path = require("path");

const localesDir = path.resolve(__dirname, "../app/locales");
const files = fs.readdirSync(localesDir).filter((f) => f.endsWith(".json"));

files.forEach((file) => {
  const filePath = path.join(localesDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const newData = {};

  // First, copy all keys that DON'T contain a dot (these are the top-level categories)
  // Actually, we want to keep the nested structure but remove the flat keys that duplicate it.
  // A key is a flat duplicate if it contains a dot and its path exists in the nested structure.

  const isNested = (obj, path) => {
    const keys = path.split(".");
    let current = obj;
    for (let i = 0; i < keys.length; i++) {
      if (!current || typeof current !== "object" || !(keys[i] in current))
        return false;
      current = current[keys[i]];
    }
    return true;
  };

  const keys = Object.keys(data);
  keys.forEach((key) => {
    if (key.includes(".")) {
      // Check if this key exists in the nested structure
      if (isNested(data, key)) {
        // This is a flat duplicate, skip it
        console.log(`Removing flat duplicate key: ${key} from ${file}`);
      } else {
        newData[key] = data[key];
      }
    } else {
      newData[key] = data[key];
    }
  });

  fs.writeFileSync(filePath, JSON.stringify(newData, null, 4), "utf8");
  console.log(`✓ Cleaned ${file}`);
});

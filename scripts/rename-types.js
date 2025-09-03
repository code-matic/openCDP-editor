const fs = require("fs");
const path = require("path");

const libPath = path.join(__dirname, "../dist/lib.d.ts");
const indexPath = path.join(__dirname, "../dist/index.d.ts");

if (fs.existsSync(libPath)) {
  fs.renameSync(libPath, indexPath);
  console.log("✅ Renamed lib.d.ts → index.d.ts");
} else {
  console.error("❌ dist/lib.d.ts not found");
  process.exit(1);
}

import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const IMAGE_DIRS = ["public/images/cr7", "public/images/trophies"];

// Check if sips tool is available (macOS)
let hasSips = false;
try {
  execSync("which sips", { stdio: "ignore" });
  hasSips = true;
} catch (e) {
  hasSips = false;
}

if (!hasSips) {
  console.log("ℹ sips không khả dụng trên môi trường này (Linux/CI). Bỏ qua bước nén tự động.");
  process.exit(0);
}

console.log("⚡ Đang quét và tự động tối ưu hóa hình ảnh...");

for (const dir of IMAGE_DIRS) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (ext !== ".jpg" && ext !== ".jpeg") continue;

    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);

    // If file is larger than 400KB, auto-compress
    if (stats.size > 400 * 1024) {
      console.log(`🔨 Đang nén ảnh dung lượng cao: ${file} (${Math.round(stats.size / 1024)} KB)...`);
      try {
        execSync(`sips -Z 1200 -s formatOptions 82 "${fullPath}"`, { stdio: "ignore" });
        const newStats = fs.statSync(fullPath);
        console.log(`   ✓ Hoàn tất: ${file} ➔ ${Math.round(newStats.size / 1024)} KB`);
      } catch (err) {
        console.warn(`   ⚠ Không thể nén file ${file}`);
      }
    }
  }
}

console.log("✓ Hoàn tất quy trình kiểm tra và tối ưu hóa hình ảnh!");

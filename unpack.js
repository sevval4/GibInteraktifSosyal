import fs from 'fs';
import zlib from 'zlib';
import path from 'path';

// Read the standalone HTML file
const htmlPath = './GİB İnteraktif UI Kit (standalone).html';
if (!fs.existsSync(htmlPath)) {
  console.error('File not found:', htmlPath);
  process.exit(1);
}

const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Extract the manifest script block
const manifestRegex = /<script type="__bundler\/manifest">([\s\S]*?)<\/script>/;
const match = htmlContent.match(manifestRegex);

if (!match) {
  console.error('Manifest not found in HTML!');
  process.exit(1);
}

const manifestJson = JSON.parse(match[1].trim());
const outputDir = './unpacked';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Extract external resources if exists
const extRegex = /<script type="__bundler\/ext_resources">([\s\S]*?)<\/script>/;
const extMatch = htmlContent.match(extRegex);
if (extMatch) {
  const extJson = JSON.parse(extMatch[1].trim());
  fs.writeFileSync(path.join(outputDir, 'ext_resources.json'), JSON.stringify(extJson, null, 2));
}

// Loop through each file in manifest
for (const [filename, fileInfo] of Object.entries(manifestJson)) {
  const dataBuffer = Buffer.from(fileInfo.data, 'base64');
  let outputData;

  if (fileInfo.compressed) {
    try {
      outputData = zlib.gunzipSync(dataBuffer);
    } catch (e) {
      console.error(`Decompression failed for ${filename}:`, e.message);
      outputData = dataBuffer;
    }
  } else {
    outputData = dataBuffer;
  }

  const extension = fileInfo.mime === 'text/jsx' ? '.jsx' : fileInfo.mime === 'text/javascript' ? '.js' : fileInfo.mime === 'text/css' ? '.css' : '.txt';
  const outputPath = path.join(outputDir, filename + extension);
  fs.writeFileSync(outputPath, outputData);
  console.log(`Unpacked: ${outputPath} (${fileInfo.mime})`);
}

console.log('Unpacking complete! Check the "unpacked" folder.');

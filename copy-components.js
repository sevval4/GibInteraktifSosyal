import fs from 'fs';
import path from 'path';

const unpackedDir = './unpacked';
const srcDir = './src/components';

if (!fs.existsSync(srcDir)) {
  fs.mkdirSync(srcDir, { recursive: true });
}

// Mapping from unpacked files to target components
const mappings = [
  { src: '019a11a0-ce2b-4c22-9a6a-8cc6391cbb4f.txt', dest: 'lib.jsx', imports: "import React from 'react';" },
  { src: 'c516f4a3-db90-424f-a95b-fadb3550e2c0.jsx', dest: 'DesignCanvas.jsx', imports: "import React from 'react';\nimport ReactDOM from 'react-dom';" },
  { src: 'e6be8f2a-9f4a-4224-877a-b7e1d6150829.jsx', dest: 'TweaksPanel.jsx', imports: "import React from 'react';" },
  { src: '5903e9ec-379f-476e-8f70-e81ae9d85184.txt', dest: 'HomeScreen.jsx', imports: "import React from 'react';" },
  { src: '076ef479-42ae-4461-add8-fd0ed13b7255.txt', dest: 'TaskScreen.jsx', imports: "import React from 'react';" },
  { src: 'ae917f7f-3530-4e87-9124-6bea5d9db0e8.txt', dest: 'ShopScreen.jsx', imports: "import React from 'react';" },
  { src: 'f2aa64e2-a84d-4a24-9fed-6f9211f65a97.txt', dest: 'GameScreen.jsx', imports: "import React from 'react';" },
  { src: 'cfd061d3-7c02-4999-8129-ccd5c747f362.txt', dest: 'EventScreen.jsx', imports: "import React from 'react';" },
  { src: '91bfc3b5-00e7-4f03-86bd-f163f53dea98.txt', dest: 'OtherScreens.jsx', imports: "import React from 'react';" }
];

for (const map of mappings) {
  const srcPath = path.join(unpackedDir, map.src);
  const destPath = path.join(srcDir, map.dest);

  if (!fs.existsSync(srcPath)) {
    console.error(`Source file not found: ${srcPath}`);
    continue;
  }

  let content = fs.readFileSync(srcPath, 'utf8');

  // Prepend eslint-disable and imports
  const header = `/* eslint-disable */\n${map.imports}\n\n`;
  content = header + content;

  fs.writeFileSync(destPath, content);
  console.log(`Copied and prepared: ${destPath}`);
}

console.log('Component copying complete!');

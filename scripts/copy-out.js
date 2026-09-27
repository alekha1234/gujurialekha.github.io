const fs = require('fs');
const path = require('path');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

const outDir = path.join(__dirname, '..', 'out');
const rootDir = path.join(__dirname, '..');

if (fs.existsSync(outDir)) {
  console.log('Synchronizing static export from out/ to root for GitHub Pages...');

  // Purge stale directories at root to eliminate zombie routes
  const directoriesToCleanFirst = ['projects', '_next'];
  directoriesToCleanFirst.forEach((dirName) => {
    const targetDir = path.join(rootDir, dirName);
    if (fs.existsSync(targetDir)) {
      console.log(`Cleaning old ${dirName} directory at root...`);
      fs.rmSync(targetDir, { recursive: true, force: true });
    }
  });

  // Copy critical files to root
  const itemsToCopy = [
    'index.html',
    '404.html',
    'robots.txt',
    'sitemap.xml',
    '_next',
    'projects',
    'my_documents',
    'llms.txt',
    'llms-full.txt',
  ];

  itemsToCopy.forEach((item) => {
    const srcPath = path.join(outDir, item);
    const destPath = path.join(rootDir, item);
    if (fs.existsSync(srcPath)) {
      console.log(`Copying ${item} -> root`);
      copyRecursiveSync(srcPath, destPath);
    }
  });

  // Also sync public/llms.txt if not in out
  const publicDir = path.join(__dirname, '..', 'public');
  ['llms.txt', 'llms-full.txt'].forEach((file) => {
    const src = path.join(publicDir, file);
    const dest = path.join(rootDir, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
    }
  });

  // Ensure .nojekyll exists
  fs.writeFileSync(path.join(rootDir, '.nojekyll'), '# Disable Jekyll for GitHub Pages\n');
  console.log('GitHub Pages export synchronization complete.');
} else {
  console.error('out directory does not exist. Run "npm run build" first.');
}

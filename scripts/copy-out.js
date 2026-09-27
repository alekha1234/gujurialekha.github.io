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
  
  // Copy critical files to root
  const itemsToCopy = ['index.html', '404.html', 'robots.txt', 'sitemap.xml', '_next', 'projects', 'my_documents'];
  
  itemsToCopy.forEach((item) => {
    const srcPath = path.join(outDir, item);
    const destPath = path.join(rootDir, item);
    if (fs.existsSync(srcPath)) {
      console.log(`Copying ${item} -> root`);
      copyRecursiveSync(srcPath, destPath);
    }
  });

  // Ensure .nojekyll exists
  fs.writeFileSync(path.join(rootDir, '.nojekyll'), '# Disable Jekyll for GitHub Pages\n');
  console.log('GitHub Pages export synchronization complete.');
} else {
  console.error('out directory does not exist. Run "npm run build" first.');
}

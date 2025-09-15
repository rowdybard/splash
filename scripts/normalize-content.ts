#!/usr/bin/env ts-node

/**
 * Content normalization script for Splashtastic website
 * Applies ordered regex replacements to keep content clean
 */

import * as fs from 'fs';
import * as path from 'path';

interface Replacement {
  pattern: RegExp;
  replacement: string;
  description: string;
}

const replacements: Replacement[] = [
  // Typos and misspellings
  {
    pattern: /Deluxe\s+Patty/gi,
    replacement: 'Deluxe Party',
    description: 'Fix Deluxe Patty typo'
  },
  {
    pattern: /Premium\s+Patty/gi,
    replacement: 'Premium Party',
    description: 'Fix Premium Patty typo'
  },
  {
    pattern: /Jafety/gi,
    replacement: 'Safety',
    description: 'Fix Jafety typo'
  },
  {
    pattern: /\bnean\b/gi,
    replacement: 'neon',
    description: 'Fix nean typo'
  },
  {
    pattern: /Some\s*whete/gi,
    replacement: 'Somewhere',
    description: 'Fix Some whete typo'
  },
  {
    pattern: /porties/gi,
    replacement: 'parties',
    description: 'Fix porties typo'
  },
  {
    pattern: /\bsuse\b/gi,
    replacement: 'sure',
    description: 'Fix suse typo'
  },
  {
    pattern: /we\s*ase/gi,
    replacement: 'we are',
    description: 'Fix we ase typo'
  },
  {
    pattern: /suriounding/gi,
    replacement: 'surrounding',
    description: 'Fix suriounding typo'
  },
  {
    pattern: /\bOus\b/gi,
    replacement: 'Our',
    description: 'Fix Ous typo'
  },
  
  // Normalize 30×30 format
  {
    pattern: /30x30|30 x 30|30×30/gi,
    replacement: '30 × 30',
    description: 'Normalize 30×30 format'
  }
];

function normalizeFile(filePath: string): void {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let normalizedContent = content;
    let changesMade = false;

    for (const { pattern, replacement, description } of replacements) {
      const originalContent = normalizedContent;
      normalizedContent = normalizedContent.replace(pattern, replacement);
      
      if (originalContent !== normalizedContent) {
        console.log(`  ✓ ${description} in ${path.basename(filePath)}`);
        changesMade = true;
      }
    }

    if (changesMade) {
      fs.writeFileSync(filePath, normalizedContent, 'utf8');
      console.log(`  📝 Updated ${filePath}`);
    }
  } catch (error) {
    console.error(`  ❌ Error processing ${filePath}:`, error);
  }
}

function findFiles(dir: string, extensions: string[]): string[] {
  const files: string[] = [];
  
  function traverse(currentDir: string): void {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Skip node_modules and other common directories
        if (!['node_modules', '.git', '.next', 'dist', 'build'].includes(item)) {
          traverse(fullPath);
        }
      } else if (stat.isFile()) {
        const ext = path.extname(item);
        if (extensions.includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  }
  
  traverse(dir);
  return files;
}

function main(): void {
  console.log('🧹 Starting content normalization...\n');
  
  const projectRoot = process.cwd();
  const srcDir = path.join(projectRoot, 'src');
  
  // Find all relevant files
  const extensions = ['.tsx', '.ts', '.js', '.jsx', '.md'];
  const files = findFiles(srcDir, extensions);
  
  console.log(`Found ${files.length} files to process\n`);
  
  let totalChanges = 0;
  
  for (const file of files) {
    const originalContent = fs.readFileSync(file, 'utf8');
    normalizeFile(file);
    
    const newContent = fs.readFileSync(file, 'utf8');
    if (originalContent !== newContent) {
      totalChanges++;
    }
  }
  
  console.log(`\n✨ Content normalization complete!`);
  console.log(`📊 Processed ${files.length} files`);
  console.log(`🔄 Made changes to ${totalChanges} files`);
  
  if (totalChanges === 0) {
    console.log('🎉 No typos found - content is already clean!');
  }
}

if (require.main === module) {
  main();
}

export { normalizeFile, replacements };

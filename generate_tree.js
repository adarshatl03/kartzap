const fs = require("fs");
const path = require("path");

const rootDir = process.cwd();
const outputFile = path.join(rootDir, "project_structure.md");
const ignoreDirs = [
  "node_modules",
  ".next",
  ".git",
  ".vscode",
  ".idea",
  "generate_tree.js",
  "project_structure.md",
  "scripts.md",
];

function getStructure(dir, prefix = "") {
  let output = "";
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });

    // Sort directories first, then files
    items.sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;
      return a.name.localeCompare(b.name);
    });

    const filteredItems = items.filter(
      (item) => !ignoreDirs.includes(item.name),
    );

    filteredItems.forEach((item, index) => {
      const isLast = index === filteredItems.length - 1;
      const marker = isLast ? "└── " : "├── ";
      const newPrefix = prefix + (isLast ? "    " : "│   ");

      output += `${prefix}${marker}${item.name}\n`;

      if (item.isDirectory()) {
        output += getStructure(path.join(dir, item.name), newPrefix);
      }
    });
  } catch (error) {
    output += `${prefix}![Error reading directory]\n`;
  }
  return output;
}

const structureContent = `# Project Structure

\`\`\`text
${path.basename(rootDir)}
${getStructure(rootDir)}
\`\`\`
`;

fs.writeFileSync(outputFile, structureContent);
console.log(`Structure successfully written to ${outputFile}`);

# Scripts & Helper Functions

This file documents the available utility scripts and helper functions for this project.

## Generate Project Structure Tree

This script scans the project directory and generates a markdown-formatted tree structure in `project_structure.md`. It automatically excludes `node_modules`, `.next`, `.git`, and the script files themselves to keep the documentation clean.

**Usage:**

Run the following command from the root of the project:

```bash
node generate_tree.js
```

**Output:**

- Updates `project_structure.md` with the current folder hierarchy.

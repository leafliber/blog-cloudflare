/* This is a script to create a new post markdown file with front-matter */

import fs from "fs";
import path from "path";

function getDate() {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const day = String(today.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
}

const args = process.argv.slice(2);

if (args.length === 0) {
	console.error(`Error: No mode argument provided
Usage: npm run new-post -- <mode>
Modes:
  file    - Creates a file with date-based name (YYYY-MM-DD.md)
  folder  - Creates a date-based folder with index.md file`);
	process.exit(1);
}

const mode = args[0].toLowerCase();
const targetDir = "./src/content/posts/";
const dateStr = getDate();

let fullPath;
let fileName;

if (mode === "file") {
	// File mode: create date-based file
	const baseFileName = dateStr;
	fileName = `${baseFileName}.md`;
	let counter = 1;
	while (fs.existsSync(path.join(targetDir, fileName))) {
		fileName = `${baseFileName}-${counter}.md`;
		counter++;
	}
	fullPath = path.join(targetDir, fileName);
} else if (mode === "folder") {
	// Folder mode: create date-based folder with index.md
	let folderName = dateStr;
	let counter = 1;
	let folderPath = path.join(targetDir, folderName);
	while (fs.existsSync(folderPath)) {
		folderName = `${dateStr}-${counter}`;
		folderPath = path.join(targetDir, folderName);
		counter++;
	}

	// Create folder
	fs.mkdirSync(folderPath, { recursive: true });

	// Create index.md inside folder
	fileName = "index.md";
	fullPath = path.join(folderPath, fileName);
} else {
	console.error(`Error: Invalid mode '${mode}'
Valid modes: file, folder`);
	process.exit(1);
}

// Ensure directory exists
const dirPath = path.dirname(fullPath);
if (!fs.existsSync(dirPath)) {
	fs.mkdirSync(dirPath, { recursive: true });
}

// Create file content with empty title
const content = `---
title: ""
published: ${getDate()}
description: ''
image: ''
tags: []
category: ''
draft: false
---
`;

fs.writeFileSync(fullPath, content);

console.log(`Post created at ${fullPath}`);

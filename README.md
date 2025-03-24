# GitHub Pages Version Viewer

A simple GitHub Pages site that allows browsing different versions of deployed content.

## Local Development

To test locally:

1. Install dependencies:
   ```
   npm install
   ```

2. Start the server:
   ```
   npm start
   ```

3. Visit http://localhost:3000 in your browser

## Structure

- `index.html` - The main entry point that lists all available versions
- `deploy/` - Contains all deployable versions in separate folders
  - `deploy/v384/` - Version 3.8.4
  - `deploy/v373/` - Version 3.7.3

## Adding New Versions

To add a new version:

1. Create a new directory in the `deploy` folder with a name like `v390`
2. Place all files for that version, including an `index.html` file, in the directory
3. The main page will automatically detect and display the new version

## Deployment

This repository is configured to be hosted on GitHub Pages. The server-related files are ignored in the .gitignore file and will not be deployed.

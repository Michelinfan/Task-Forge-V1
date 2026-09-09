# TaskForge V1

TaskForge is a desktop task manager built with Electron.

## Build the Windows .exe without installing Node.js on your PC

This repository includes a GitHub Actions workflow at:

`.github/workflows/build-windows.yml`

### Steps

1. Upload all files from this project to your GitHub repository.
2. On GitHub, open the **Actions** tab.
3. Select **Build TaskForge for Windows**.
4. Click **Run workflow**.
5. Wait for the green check to appear.
6. Open the completed workflow run.
7. Under **Artifacts**, download **TaskForge-Windows**.
8. Inside the downloaded ZIP you'll find `TaskForge-Setup-1.0.0.exe`.

The compilation runs on GitHub's Windows runner, so Node.js does not need to be installed on your own PC.

The workflow also runs automatically when you push a tag beginning with `v`, such as `v1.0.0`.

# TaskForge V1

TaskForge is a desktop task manager built with Electron.

## Build the Windows .exe without installing Node.js on your PC

The workflow is located at `.github/workflows/build-windows.yml`.

Important: it uses `npm install`, not `npm ci`, because this project does not require a package-lock.json file.

### Steps

1. Upload the contents of this project to your GitHub repository.
2. Make sure `.github/workflows/build-windows.yml` exists in that exact location.
3. Open **Actions** on GitHub.
4. Select **Build TaskForge for Windows**.
5. Click **Run workflow**.
6. Wait for the build to finish.
7. Open the completed run.
8. Under **Artifacts**, download **TaskForge-Windows**.
9. The downloaded ZIP contains `TaskForge-Setup-1.0.0.exe`.

The build runs on GitHub's Windows runner, so Node.js does not need to be installed on your PC.

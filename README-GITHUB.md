# TaskForge V1

## GitHub Actions build

Use **Actions → Build TaskForge for Windows → Run workflow**.

The workflow intentionally does not use npm caching because this project has no package-lock.json. It installs dependencies with `npm install` and then runs Electron Builder on a Windows runner.

The resulting `TaskForge-Windows` artifact contains the Windows installer.

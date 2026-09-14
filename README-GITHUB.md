# TaskForge V1 — GitHub build

The Windows workflow uses Node.js 22, does not require package-lock.json,
caches Electron downloads between GitHub Actions runs, retries the build up
to 3 times if a download connection is interrupted, and uploads the installer
as the TaskForge-Windows artifact.

Run it from Actions → Build TaskForge for Windows → Run workflow.

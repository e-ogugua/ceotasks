#!/bin/bash

# 👨‍💻 Script: setup_docs.sh
# 📁 Run this inside your project root (e.g., /dev/1-featured/ceotasks)

PROJECT_NAME="ceotasks"
DESCRIPTION="A modern, beautiful, and highly useful task manager for entrepreneurs, developers, and productivity junkies. Built with React + Tailwind CSS."
GITHUB_URL="https://github.com/e-ogugua/$PROJECT_NAME"

# Create README.md
cat <<EOF > README.md
# $PROJECT_NAME

$DESCRIPTION

## 🚀 Features

- Create, edit, complete and delete tasks
- Beautiful UI with Tailwind
- React hooks and local storage
- Easily extensible
- Deployable as web app, Mac app (via Tauri/Electron), or mobile app (via Expo)

## 📦 Stack

- React
- Tailwind CSS
- Vite
- Git & GitHub

## 🧭 Project Status

Actively being built. Track progress in [checklist.md](./checklist.md)

## 🔗 Links

- 🔗 Live demo: Coming soon
- 🧠 Built by: [Emmanuel Ogugua](https://github.com/e-ogugua)
- 📁 Repo: [$GITHUB_URL]($GITHUB_URL)

EOF

# Create checklist.md
cat <<EOF > checklist.md
# ✅ $PROJECT_NAME - Project Tracker

| # | Task                          | Description                              | Status |
|---|-------------------------------|------------------------------------------|--------|
| 1 | ✅ Project Initialized        | Git + Tailwind + React created            | Done   |
| 2 | 🧾 README & Tracker           | Write project vision and progress list   | Done   |
| 3 | 🔍 UI Layout Design           | Sketch layout and basic UI screens       | Todo   |
| 4 | ⚛️ Build Task Component       | Create and reuse the task UI block       | Todo   |
| 5 | 💾 Local Storage              | Save/load tasks with localStorage        | Todo   |
| 6 | 🔒 Auth (Optional)            | Add Firebase or local login system       | Todo   |
| 7 | 🌍 Deploy to Web              | Deploy to Vercel or Netlify              | Todo   |
| 8 | 🖥️ Package as Mac App         | Use Tauri to make standalone Mac app     | Todo   |
| 9 | 📱 Mobile Version             | Make PWA or React Native edition         | Todo   |

EOF

# Stage and commit
git add README.md checklist.md
git commit -m "📄 Add README and project checklist"
git push

echo "✅ README.md and checklist.md created, committed, and pushed!"

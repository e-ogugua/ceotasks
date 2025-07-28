#!/bin/bash

echo "📁 Creating folders and base files for ceotasks UI..."

mkdir -p src/components
mkdir -p src/pages

touch src/App.jsx
touch src/main.jsx

components=(
  Header
  Sidebar
  TaskInput
  TaskList
  TaskItem
  TaskModal
  StatsPanel
  Footer
)

pages=(
  Today
  Projects
  Focus
  History
)

for comp in "${components[@]}"; do
  echo "→ Creating component: $comp.jsx"
  echo "export default function $comp() {\n  return <div>$comp</div>\n}" > "src/components/$comp.jsx"
done

for page in "${pages[@]}"; do
  echo "→ Creating page: $page.jsx"
  echo "export default function $page() {\n  return <div>$page page</div>\n}" > "src/pages/$page.jsx"
done

echo "✅ Done scaffolding ceotasks UI components."

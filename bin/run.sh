#!/bin/bash
npx create-next-app@13.4.12 ui --typescript --tailwind --eslint --app --import-alias @/ --no-src-dir || echo "Next.js project already exists"
cd ui
npm i
npm install lucide-react
npm i @heroicons/react
npm install --save axios

# install shadcn-ui
file_path="/ui/components.json"
if [ -e "$file_path" ]; then
    echo "shadcn-ui was already initialized. Skipping..."
else
    echo "Initializing shadcn-ui..."
    yes '' | npx shadcn-ui@latest init
    echo "Fixing files..."
    python /bin/fix_nextjs_docker.py
fi

npx shadcn-ui@latest add sheet -y
npx shadcn-ui@latest add button -y
npx shadcn-ui@latest add label -y

# npx shadcn-ui@latest add accordion -y
npm run dev -- -p 3001
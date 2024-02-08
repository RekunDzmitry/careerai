#!/bin/bash
file_path="/ui/next.config.js"
echo "Current working directory: $(pwd)"

if [ -e "$file_path" ]; then
    echo "Next.js project already exists"
else
    echo "Creating Next.js project..."
    npx create-next-app@13.4.12 $NEXTJS_PATH --typescript --tailwind --eslint --app --import-alias @/ --no-src-dir
fi


cd $NEXTJS_PATH || { echo "Error changing directory"; exit 1; }

npm i lucide-react
npm i @heroicons/react
npm i --save axios

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

npm run dev

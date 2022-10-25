echo "Switching to branch main"
git checkout main

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -r build/* root@165.22.125.184:/var/www/html/rrLoto-frontend/build/

echo "Done !"
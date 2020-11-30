cd ../

# echo "Clean current build"
# rm -rf ./dist

echo "Build process"
npm run build
cp package.json ./dist/package.json
cp README.md    ./dist/README.md

echo "Pack process start"
npm pack ./dist 

echo "Pack process done"

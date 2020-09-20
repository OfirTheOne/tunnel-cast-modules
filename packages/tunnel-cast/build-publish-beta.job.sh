

BRANCH=$(git rev-parse --abbrev-ref HEAD)

ALLOWED_BRANCH="beta-production"
echo $ALLOWED_BRANCH
if [ "$BRANCH" != "$ALLOWED_BRANCH" ]
then
  echo 'Aborting script, unallowed branch';
  exit 1;
else
    echo "====== Build Publish Beta Job ======"
    echo "On brunch $BRANCH"
    
    echo "Clean current build"
    rm -rf ./dist-prod

    echo "Build process"
    npm run build-prod
    cp package.json ./dist-prod/package.json
    cp README.md    ./dist-prod/README.md

    echo "Publish process"
    npm publish --tag beta ./dist-prod 
fi




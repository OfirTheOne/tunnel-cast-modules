FROM node


ENV SOURCE_FOLDER /tmp/source

RUN mkdir -p $SOURCE_FOLDER

COPY . $SOURCE_FOLDER

WORKDIR $SOURCE_FOLDER

# install json terminal tool.
RUN npm i -g json 

# replace to current package name to temporery name.
RUN json -I -f ./package.json -e 'this.name="test-e2e-app"'

# replace to current 'lib' import with original package name - simulate actual external usage.
# RUN sh ./test/pre-publish-pack/replace-local-lib-name.sh

RUN export LIB_NAME="@tunnel-cast\/common" \
    && export VALUE_AFTER_REPLACE="from \"$LIB_NAME" \
    && export REPLACE_PATTERN="from \".*\/lib" \
    && export FILE_PATH="./" \
    && export FILE_NAME_PATTERN="*.e2e.spec.ts" \
    && find $FILE_PATH -type f -name $FILE_NAME_PATTERN -exec sed -i '' -e "s/$REPLACE_PATTERN/$VALUE_AFTER_REPLACE/" {} \;
# RUN find ./ -type f -name *.e2e.spec.ts -exec sed -i '' -e "s/from \".*\/lib/from \"tunnel-cast/" {} \;

# install all deps.
RUN npm i --production=false

# install local package tgz file.
RUN export PACKAGE_VERSION=$(cat ./package.json | json version) \
    && export ORINGIN_PACKAGE_NAME="tunnel-cast-common" \
    && export PACKAGE_FILE_EXT="tgz" \
    && export package_file_name="$ORINGIN_PACKAGE_NAME-$PACKAGE_VERSION.$PACKAGE_FILE_EXT" \
    && echo $package_file_name \
    && npm i -D ./$package_file_name --dry-run

# run e2e test - test external usage.
RUN npm run test:e2e
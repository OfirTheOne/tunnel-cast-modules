

export PACKAGE_VERSION=$(node -p -e "require('../../package.json').version") \ 
&& export ORINGIN_PACKAGE_NAME="tunnel-cast-common" \
&& export PACKAGE_FILE_EXT="tgz" \
&& export package_file_name="$ORINGIN_PACKAGE_NAME-$PACKAGE_VERSION.$PACKAGE_FILE_EXT" \
&& npm i -D ../../$package_file_name --dry-run
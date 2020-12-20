



lib_name="tunnel-cast"
value_after_replace="from \"$lib_name"
replace_pattern="from \".*\/lib"

file_path="./test"
file_name_pattern="*.e2e.spec.ts"

find $file_path -type f -name $file_name_pattern -exec sed -i '' -e "s/$replace_pattern/$value_after_replace/" {} \;


export LIB_NAME="tunnel-cast" \
&& export VALUE_AFTER_REPLACE="from \"$LIB_NAME" \
&& export REPLACE_PATTERN="from \".*\/lib" \
&& export FILE_PATH="./test" \
&& export FILE_NAME_PATTERN="*.e2e.spec.ts" \
&& find $FILE_PATH -type f -name $FILE_NAME_PATTERN -exec sed -i '' -e "s/$REPLACE_PATTERN/$VALUE_AFTER_REPLACE/" {} \;


cd ${HOME}/Desktop/jedi/monaco-languageclient/example && yarn run prepare && yarn run start &

PID=$!

echo "PID for the background process is ${PID}"


jobs | ( IFS= ; read -r line ; echo "Line here $line" )

# artillery run first.yml --output result.json

kill -9 ${PID}

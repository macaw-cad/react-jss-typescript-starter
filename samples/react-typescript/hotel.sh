hotel start
hotel add "npm run start" --name react-client --port 3000
hotel add "npm run start:storybook" --name Storybook --port 9001

if [ "${OSTYPE//[0-9.]/}" == "darwin" ]
then
	echo "Running Mac"
    echo "Please open your browser and navigate to http://localhost:2000"
elif  [ "${OSTYPE//[0-9.]/}" == "linux-gnu" ]
then
	echo "Running Linux"
    echo "Please open your browser and navigate to http://localhost:2000"
elif  [ "${OSTYPE//[0-9.]/}" == "msys" ]
then
	echo "Running Windows"	
    start chrome http://localhost:2000
fi

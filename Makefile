install: ;@echo "Installing dependencies...\n"; \
	npm i;
start_client: ;@echo "Starting the project client...\n"; \
	node ./src/client.js $(arg1) $(arg2)
start_server: ;@echo "Starting the project server...\n"; \
	node ./src/server.js
develop_server: ;@echo "Starting the project in develop mode with nodemon...\n"; \
	./node_modules/.bin/nodemon ./src/server.js
debug_server: ;@echo "Starting the project in debug mode with nodemon...\n"; \
	./node_modules/.bin/nodemon . --inspect ./src/server.js
eslint: ;@echo "Eslinting the project...\n"; \
	./node_modules/.bin/eslint ./src/ --max-warnings=0
prettier: ;@echo "Prettiering the project...\n"; \
	./node_modules/.bin/prettier ./src/ --wtire
test: ;@echo "Testing the project...\n"; \
	node ./src/tests

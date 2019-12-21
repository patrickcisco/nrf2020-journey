# 27017
APP :=nrf-mongo
VERSION :=v001
PORT :=27017
DOCKER_IMAGE :="mongo:latest"

clean:
	-docker rm ${APP} 
docker: clean
	docker run -d --name $(APP) -p $(PORT):27017 ${DOCKER_IMAGE}
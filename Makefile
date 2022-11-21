build-dev:
	cd client && $(MAKE) build-dev-fe
	cd server && $(MAKE) build-be

run-dev:
	docker-compose -f docker-compose-dev.yml up

# Production configuration
build-local:
	cd client && $(MAKE) build-local-fe
	cd server && $(MAKE) build-be

run-local:
	ENV=local docker-compose -f docker-compose-production.yml up

# Running the caddy web server and using the Mongo DB Atlas database. Also, running on Digital Ocean VM
build-production:
	cd client && $(MAKE) build-production-fe
	cd server && $(MAKE) build-be

run-production:
	ENV=production docker-compose -f docker-compose-production.yml up -d

#Vultr VM
SSH_STRING:=root@45.32.77.87
ssh:
	ssh $(SSH_STRING)

#Copy files from local to Digital Ocean VM
copy-files:
	scp -r ./* $(SSH_STRING):/root/
build-dev:
	cd client && $(MAKE) build-dev-fe
	cd server && $(MAKE) build-be

run-dev:
	docker-compose -f docker-compose-dev.yml up

# Running the caddy web server and using the Mongo DB Atlas database
build-local:
	cd client && $(MAKE) build-local-fe
	cd server && $(MAKE) build-be

run-local:
	ENV=1.0-local docker-compose -f docker-compose-production.yml up

# Running the caddy web server and using the Mongo DB Atlas database. Also, running on Digital Ocean VM
build-production:
	cd client && $(MAKE) build-production-fe
	cd server && $(MAKE) build-be

run-production:
	ENV=1.0-production docker-compose -f docker-compose-production.yml up
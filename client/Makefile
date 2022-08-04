build-dev-fe:
	docker build -t react-app-dev -f Dockerfile.dev .

build-local-fe:
	docker build \
		-t react-app-production:local \
		--build-arg CADDYFILE=Caddyfile.local \
		--build-arg BASE_URL=http://localhost:8000/api \
		-f Dockerfile.production .

build-production-fe:
	docker build \
		-t react-app-production:production \
		--build-arg CADDYFILE=Caddyfile.production \
		--build-arg BASE_URL=https://mywines.juancgalue-web.cl/api \
		-f Dockerfile.production .
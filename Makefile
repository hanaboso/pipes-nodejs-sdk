DCS=docker-compose exec sdk

docker-up-force:
	docker-compose up -d --force-recreate --remove-orphans

docker-down-clean:
	docker-compose down -v

yarn-install:
	$(DCS) yarn install

yarn-update:
	$(DCS) yarn up

lint:
	$(DCS) yarn lint

unit:
	$(DCS) yarn test:ci

coverage:
	$(DCS) yarn test:unit

fasttest: lint unit

test: docker-up-force fasttest docker-down-clean
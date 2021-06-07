DCS=docker-compose exec -T sdk

ALIAS?=alias
Darwin:
	sudo ifconfig lo0 $(ALIAS) $(shell awk '$$1 ~ /^DEV_IP/' .env.dist | sed -e "s/^DEV_IP=//")
Linux:
	@echo 'skipping ...'
.lo0-up:
	-@make `uname`
.lo0-down:
	-@make `uname` ALIAS='-alias'
.env:
	sed -e "s/{DEV_UID}/$(shell if [ "$(shell uname)" = "Linux" ]; then echo $(shell id -u); else echo '1001'; fi)/g" \
		-e "s/{DEV_GID}/$(shell if [ "$(shell uname)" = "Linux" ]; then echo $(shell id -g); else echo '1001'; fi)/g" \
		.env.dist > .env; \

docker-up-force: .env
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
	$(DCS) yarn test:unit

fasttest: lint unit

test: docker-up-force yarn-install fasttest docker-down-clean
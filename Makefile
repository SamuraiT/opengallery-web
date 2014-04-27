
CM = node_modules/.bin/component

.PHONY: build-component build

build: build-component build-sass

build-component:
	@$(CM) build --dev --standalone 'open-gallery-app'
	@echo 'build component done'

build-sass:
	@bundle exec compass compile assets
	@echo 'build sass done'

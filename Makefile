
CM = node_modules/.bin/component
JS_DEP = component.json \
         $(shell cat component.json | jq  '.scripts[], .json[]'  | tr -d '"')

.PHONY: build clean

build: build/build.js build-sass

build/build.js: $(JS_DEP)
	@$(CM) build --dev
	@echo 'build component done'

build-sass:
	@bundle exec compass compile assets
	@echo 'build sass done'

clean:
	rm -f build/build.js


CM = node_modules/.bin/component
JS_DEP = $(shell find lib -type f -name '*.js')

.PHONY: build clean sass fontcustom lint

build: build/build.js sass

build/build.js: $(JS_DEP)
	@$(CM) build --dev
	@echo 'build component done'

sass: fontcustom
	@bundle exec compass compile assets
	@echo 'build sass done'

fontcustom: assets/sass/_fontcustom.scss

assets/sass/_fontcustom.scss: fontcustom.yml
	@bundle exec fontcustom compile -c $<
	@mv assets/sass/fontcustom.css $@
	@echo 'build fontcustom done'

lint:
	@jshint $(JS_DEP)

clean:
	rm -f build/build.js \
          assets/sass/_fontcustom.scss \
          assets/sass/fontcustom.css \
          .fontcustom-manifest.json

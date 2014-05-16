
CM = node_modules/.bin/component
UGLIFYJS = node_modules/.bin/uglifyjs
DEP = component.json $(shell find lib -type f)
JS_DEP = $(filter %.js, $(DEP))

.PHONY: build clean sass fontcustom lint release

build: build/build.js sass

build/build.js: $(DEP)
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

release:
	@$(CM) build --standalone 'opengallery' -n build.raw
	$(UGLIFYJS) --mangle < build/build.raw.js > build/build.js

clean:
	rm -f build/build.js \
          build/build.raw.js \
          assets/sass/_fontcustom.scss \
          assets/sass/fontcustom.css \
          .fontcustom-manifest.json

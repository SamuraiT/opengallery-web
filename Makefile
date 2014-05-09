
CM = node_modules/.bin/component

.PHONY: build clean sass fontcustom

build: build/build.js sass

build/build.js:
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

clean:
	rm -f build/build.js \
          assets/sass/_fontcustom.scss \
          assets/sass/fontcustom.css \
          .fontcustom-manifest.json

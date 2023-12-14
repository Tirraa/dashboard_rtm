.PHONY: all initialize

MAKEFLAGS += --silent
PM = pnpm

%:
	$(PM) "$@"

all:
	$(PM) build

initialize:
	$(PM) install
	$(PM) contentlayer build
	echo "^ DON'T WORRY if you see a stupid error: https://github.com/contentlayerdev/contentlayer/issues/495"
	$(PM) prebuild
	cp --no-clobber .env_example .env

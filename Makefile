.PHONY: all initialize install prebuild build vercel-ci-build-command build-contentlayer clean fclean re re-using-pnpm-cache re-using-next-cache simulate-deploy simulate-deploy-discarding-build-cache

MAKEFLAGS += --silent
PM = pnpm

%:
	$(PM) "$@"

all: build

initialize: install prebuild
	cp --no-clobber .env_example .env

install:
	$(PM) install

prebuild: build-contentlayer
	$(PM) prebuild

build:
	$(PM) build

vercel-ci-build-command:
	$(PM) ci:vercel-build-command

build-contentlayer:
	$(PM) contentlayer build
	echo "^ DON'T WORRY if you see a stupid error: https://github.com/contentlayerdev/contentlayer/issues/495"

clean:
	rm -rf .next .contentlayer .rtm-generated

fclean: clean
	find . \( -type d -name "node_modules" -o -name "dist" \) -exec rm -rf {} +

re: fclean install build

re-using-pnpm-cache: clean build

re-using-next-cache: build

simulate-deploy: clean vercel-ci-build-command

simulate-deploy-discarding-build-cache: fclean install vercel-ci-build-command

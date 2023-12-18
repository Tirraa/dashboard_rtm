.PHONY: all initialize install prebuild build vercel-ci-build-command build-contentlayer clean fclean re re-using-pnpm-cache re-using-next-cache simulate-deploy simulate-deploy-discarding-build-cache

MAKEFLAGS += --silent
PM = pnpm

NEXT_GENERATED = .next
CONTENTLAYER_GENERATED = .contentlayer
RTM_GENERATED = .rtm-generated
ENV_EXAMPLE = .env_example
ENV_FILE = .env

%:
	$(PM) "$@"

all: build

initialize: install prebuild
	cp --no-clobber $(ENV_EXAMPLE) $(ENV_FILE)

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
	rm -rf $(NEXT_GENERATED) $(CONTENTLAYER_GENERATED) $(RTM_GENERATED)

fclean: clean
	find . \( -type d -name "node_modules" -o -name "dist" \) -exec rm -rf {} +

re: fclean install build

re-using-pnpm-cache: clean build

re-using-next-cache: build

simulate-deploy: clean vercel-ci-build-command

simulate-deploy-discarding-build-cache: fclean install vercel-ci-build-command

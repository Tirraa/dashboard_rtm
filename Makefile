.PHONY: all install build prebuild test coverage mutations-tests vercel-ci-build-command build-contentlayer prebuild-rtm initialize clean-codegen clean fclean re re-using-pm-cache re-using-next-cache simulate-deploy simulate-deploy-discarding-build-cache

MAKEFLAGS += --silent

#==============
# § I. CONFIG
#==============

PM := pnpm

CONTENTLAYER_GENERATED_CODE := .contentlayer
RTM_GENERATED_CODE := .rtm-generated
NEXT_GENERATED_CODE := .next

COVERAGE_GENERATED_REPORT := coverage
STRYKER_GENERATED_REPORT := reports

ENV_EXAMPLE := .env_example
ENV_FILE := .env

#=================
# § II. COMMANDS
#=================

#-------------------------
# **** II. 1) PM Related
#-------------------------

# @Mirror
%:
	$(PM) "$@"

# @Default
all: build

# @Mirror
install:
	$(PM) install

# @Mirror
build:
	$(PM) build

# @Override
prebuild: build-contentlayer
	$(PM) prebuild

# @Override
test: initialize
	$(PM) test:run

# @Override
coverage: initialize
	$(PM) coverage

# @Override
mutations-tests: clean-codegen initialize
	$(PM) mutations-tests:run

# @Alias
vercel-ci-build-command:
	$(PM) ci:vercel-build-command

# @Alias
build-contentlayer:
	$(PM) contentlayer build
	echo "^ DON'T WORRY if you see a stupid error: https://github.com/contentlayerdev/contentlayer/issues/495"

# @Alias
prebuild-rtm:
	$(PM) prebuild

#------------------
# **** II. 2) DSL
#------------------

initialize: install prebuild
	cp --no-clobber $(ENV_EXAMPLE) $(ENV_FILE)

clean-codegen:
	rm -rf $(NEXT_GENERATED_CODE) $(CONTENTLAYER_GENERATED_CODE) $(RTM_GENERATED_CODE)

clean: clean-codegen
	rm -rf $(COVERAGE_GENERATED_REPORT) $(STRYKER_GENERATED_REPORT)

fclean: clean
	find . \( -type d -name "node_modules" -o -name "prebuilder-dist" -o -name ".stryker-tmp" \) -exec rm -rf {} +

re: fclean install build

re-using-pm-cache: clean build

re-using-next-cache: build

simulate-deploy: clean vercel-ci-build-command

simulate-deploy-discarding-build-cache: fclean install vercel-ci-build-command

.PHONY: all install build prebuild test coverage mutations-tests vercel-ci-build-command build-contentlayer prebuild-rtm initialize-env initialize clean-codegen clean fclean re re-using-pm-cache re-using-next-cache simulate-deploy simulate-deploy-discarding-build-cache check-coding-style

MAKEFLAGS += --silent

#==============
# § I. CONFIG
#==============

PM := pnpm

CONTENTLAYER_GENERATED_CODE := .contentlayer
RTM_GENERATED_CODE := .rtm-generated
NEXT_GENERATED_CODE := .next

COVERAGE_GENERATED_REPORT := coverage

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
	$(PM) before-build:tricky-typechecks
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

initialize-env:
	[ -e "$(ENV_FILE)" ] || cp "$(ENV_EXAMPLE)" "$(ENV_FILE)"

initialize: install prebuild initialize-env

clean-codegen:
	rm -rf $(NEXT_GENERATED_CODE) $(CONTENTLAYER_GENERATED_CODE) $(RTM_GENERATED_CODE)

clean: clean-codegen
	rm -rf $(COVERAGE_GENERATED_REPORT)

fclean: clean
	find . \( -type d -name "node_modules" -o -name "prebuilder-dist" -o -name ".stryker-tmp" \) -exec rm -rf {} +

re: fclean install build

re-using-pm-cache: clean build

re-using-next-cache: build

simulate-deploy: clean vercel-ci-build-command

simulate-deploy-discarding-build-cache: fclean install vercel-ci-build-command

check-coding-style:
	$(PM) ci:format-check
	$(PM) ci:lint
	$(PM) ci:typecheck

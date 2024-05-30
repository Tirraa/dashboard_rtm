.PHONY: all install build prebuild test coverage coverage-all mutations-tests check-coding-style dev-with-rtm-tools vercel-ci-build-command build-contentlayer prebuild-rtm initialize-env initialize watch-prebuild-rtm clean-codegen clean-stryker-cache clean-prebuilder-dist clean-node-modules clean-coverage-report clean fclean re re-using-pm-cache re-using-next-cache simulate-deploy simulate-deploy-discarding-build-cache

MAKEFLAGS += --silent

# NOTE: since MAKEFLAGS are set with --silent, the `@` annotations will be used to indicate effects

#==============
# § I. CONFIG
#==============

PM := pnpm

CONTENTLAYER_GENERATED_CODE := .contentlayer
RTM_GENERATED_CODE := .rtm-generated
NEXT_GENERATED_CODE := .next
STRYKER_TMP := .stryker-tmp
PREBUILDER_DIST := prebuilder-dist
NODE_MODULES := node_modules

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
prebuild: prebuild-rtm build-contentlayer

# @Override
test: initialize
	$(PM) before-build:tricky-typechecks
	$(PM) test:run

# @Override
coverage: initialize
	$(PM) coverage

# @Override
coverage-all: initialize
	$(PM) coverage

# @Override
mutations-tests: clean-codegen clean-stryker-cache initialize
	$(PM) mutations-tests:run

# @Override
check-coding-style: prebuild-rtm build-contentlayer
	@{ \
	    exit_status=0; \
	    $(PM) ci:format-check || exit_status=$$((exit_status | $$?)); \
	    $(PM) ci:lint || exit_status=$$((exit_status | $$?)); \
	    $(PM) ci:typecheck-project || exit_status=$$((exit_status | $$?)); \
	    $(PM) ci:typecheck-tests || exit_status=$$((exit_status | $$?)); \
	    $(PM) ts-prune || exit_status=$$((exit_status | $$?)); \
      if [ $$exit_status -ne 0 ]; then exit $$exit_status; fi \
	}

# @Override
dev-with-rtm-tools:
	$(PM) concurrently "\"$(PM) dev\"" "\"$(PM) prebuild --watch\""

# @Alias
vercel-ci-build-command:
	$(PM) ci:vercel-build-command

# @Alias
build-contentlayer:
	$(PM) contentlayer build
	@echo "^ DON'T WORRY if you see a stupid error: https://github.com/contentlayerdev/contentlayer/issues/495"

# @Alias
prebuild-rtm:
	$(PM) prebuild

#------------------
# **** II. 2) DSL
#------------------

initialize-env:
	[ -e "$(ENV_FILE)" ] || cp "$(ENV_EXAMPLE)" "$(ENV_FILE)"

initialize: install prebuild initialize-env

watch-prebuild-rtm:
	$(PM) prebuild --watch

clean-codegen:
	rm -rf $(NEXT_GENERATED_CODE) $(CONTENTLAYER_GENERATED_CODE) $(RTM_GENERATED_CODE)

clean-stryker-cache:
	rm -rf $(STRYKER_TMP)

clean-prebuilder-dist:
	find . -type d -name "$(PREBUILDER_DIST)" -exec rm -rf {} +

clean-node-modules:
	find . -type d -name "$(NODE_MODULES)" -exec rm -rf {} +

clean-coverage-report:
	rm -rf $(COVERAGE_GENERATED_REPORT)

clean: clean-codegen clean-coverage-report

fclean: clean clean-stryker-cache clean-prebuilder-dist clean-node-modules

re: fclean install build

re-using-pm-cache: clean build

re-using-next-cache: build

simulate-deploy: clean vercel-ci-build-command

simulate-deploy-discarding-build-cache: fclean install vercel-ci-build-command

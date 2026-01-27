.PHONY: setup
setup: deps

.PHONY: deps
deps:
	pnpm install --frozen-lockfile

.PHONY: commit
commit:
	pnpm czg

.PHONY: build-prod
build-prod:
	pnpm ng build ngx -c prod
	pnpm ng build playground -c prod

.PHONY: publish
publish:
	cd dist/ngx && pnpm publish --access public --no-git-checks

.PHONY: playground
playground:
	pnpm ng build ngx
	pnpm ng serve playground

.PHONY: setup
setup: deps

.PHONY: deps
deps:
	pnpm install

.PHONY: commit
commit:
	pnpm cz

.PHONY: build
build:
	pnpm ng build ngx -c prod

.PHONY: playground
playground:
	pnpm ng serve playground

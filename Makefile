.PHONY: setup
setup: deps

.PHONY: deps
deps:
	pnpm install

.PHONY: commit
commit:
	pnpm cz

.PHONY: playground
playground:
	pnpm ng build ngx
	pnpm ng serve playground

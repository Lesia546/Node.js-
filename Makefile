# Єдиний інтерфейс команд для рев'ю. Кожна ціль — обгортка над npm-скриптом.
# Рецепти починаються з символу табуляції (не пробілів).
.PHONY: install check audit format format-fix lint typecheck build test smoke sha

install:
	npm ci

check:
	npm run check

audit:
	npm run audit:deps

format:
	npm run format:check

format-fix:
	npm run format

lint:
	npm run lint

typecheck:
	npm run typecheck

build:
	npm run build

test:
	npm test

smoke:
	npm run smoke

sha:
	npm run sha
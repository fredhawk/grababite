alias d := dev
alias b := build
alias t := test-all
alias gen := generate
alias mig := migrate
alias ddb := docker-db

# Run dev environment
dev:
    pnpm run dev

# Run build
build:
    pnpm run build

# Run preview
preview:
    pnpm run preview

# Run all tests
test-all:
    pnpm run test

# Run unit tests
test-unit:
    pnpm run test:unit

# Run integration tests
test-int:
    pnpm run test:integration

# Generate a database migration
generate:
    pnpm drizzle-kit generate:pg

# Run database migrations
migrate:
    pnpm run db:migrate

# Seed the database
seed:
    pnpm run db:seed

# Run docker compose to start up database in docker
docker-db:
    docker compose up -d

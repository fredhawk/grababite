alias d := dev
alias b := build
alias t := test-all
alias gen := generate
alias mig := migrate
alias dbu := docker-db-up
alias dbd := docker-db-down

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
    pnpm drizzle-kit generate

# Run database up
data-up:
    pnpm drizzle-kit up

# Run database migrations
migrate:
    pnpm drizzle-kit migrate

# Seed the database
seed:
    pnpm run db:seed

# Run docker compose to start up database in docker
docker-db-up:
    docker compose up -d

# Run docker compose to start up database in docker
docker-db-down:
    docker compose down

# Reset db
db-reset: docker-db-down
    echo 'Reseting database'
    sudo rm -rf db-data
    echo 'Starting up clean database'
    just dbu
    sleep 2
    echo 'Migrating schema'
    just mig
    echo 'Seeding database'
    just seed

# Start Drizzlekit Studio
studio:
    pnpm drizzle-kit studio

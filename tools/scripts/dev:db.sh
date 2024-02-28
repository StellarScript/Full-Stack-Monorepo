docker rm --force appify-db
docker rm --force appify-redis

docker rmi $(docker images 'redis' -a -q)
docker rmi $(docker images 'postgres' -a -q)

# Redis
docker run --name appify-redis -p 6379:6379 -d redis

# Postgres
docker run --name appify-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=appify -p 5432:5432 -d postgres

# Migrate
yarn nx run server:prisma-generate
yarn nx run server:prisma-migrate -- --name init --create-db --experimental
#!/bin/bash

npx prisma migrate deploy --schema prisma/schema.prisma
node ./main.js
#!/bin/bash

docker compose -f docker-compose.yaml --env-file ./.env.development up --build

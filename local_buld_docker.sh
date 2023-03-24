#!/bin/bash

echo "Stage build web .. "

docker build -t template_cra_admin:1 .
docker images

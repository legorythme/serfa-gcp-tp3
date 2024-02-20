#! /bin/bash

# you can use this script as an executable with `chmod +x vm-tp.sh`,
# it allows you to run it with => `./vm-tp.sh`,
# if you don't do it, you'll have to run it as `sh vm-tp.sh`

docker build -f gcp.Dockerfile -t gcp-vm .
docker run gcp-vm create test-vm
docker run gcp-vm enable-http
docker run gcp-vm ip test-vm
# docker run gcp-vm delete test-vm

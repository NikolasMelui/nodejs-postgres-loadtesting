#!/bin/bash

# Client mock with simple HTTP POST request with JSON data

curl --header "Content-Type: application/json" \
  --request POST \
  -d "{\"login\":\"${1}\",\"password\":\"${1}\"}" \
  http://localhost:3000/

#!/bin/bash

# Client mock with simple HTTP POST request with JSON data

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"username":"xyz","password":"xyz"}' \
  http://localhost:3000/

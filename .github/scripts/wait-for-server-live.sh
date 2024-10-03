#!/bin/bash

# Number of attempts
max_attempts=6

for i in $(seq 1 $max_attempts)
do
  echo "Attempt $i"
  status_code=$(curl \
    -X GET \
    --write-out %{http_code} \
    --silent\
    --output /dev/null\
    https://server-medusa.up.railway.app/store/products)

  echo "Status code: $status_code"
  if [[ "$status_code" -eq 200 ]] ; then
    echo "Server is live"
    exit 0
  else
    echo "Server returned status code $status_code"
    sleep 5
  fi
done

echo $status_code

echo "Server did not respond after $max_attempts attempts"
exit 1
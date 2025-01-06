#!/bin/sh
set -e

# Replace env variable placeholders with real values
printenv | grep NEXT_PUBLIC_ | while IFS= read -r line; do
  key=$(echo "$line" | cut -d "=" -f1)
  value=$(echo "$line" | cut -d "=" -f2-)

  # Replace placeholders in .next folder
  find /usr/src/app/.next/ -type f -exec sed -i "s|${key}|${value}|g" {} \;
done

# Execute the container's main process (CMD in Dockerfile)
exec "$@"

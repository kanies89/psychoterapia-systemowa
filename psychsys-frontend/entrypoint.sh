#!/bin/sh
# Substitute environment variables into the static files
echo "NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL"
echo "NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY=$NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY"
exec "$@"

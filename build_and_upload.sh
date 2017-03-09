#!/bin/bash
GIT_COMMIT_ID=$(git rev-parse --short HEAD)

echo $GIT_COMMIT_ID

aws s3 ls s3://running-man.com/$GIT_COMMIT_ID >/dev/null 2>&1

if [[ $? -eq 0 ]]; then
    echo "s3 bukcet already exists"
    exit 1;
fi

npm run production-build

gzip -9 -c ./public/js/bundle.js > /tmp/bundle.js
gzip -9 -c ./public/css/style.css > /tmp/style.css

aws s3 cp /tmp/bundle.js s3://running-man.com/$GIT_COMMIT_ID/js/ --content-encoding "gzip"  --content-type "application/javascript"
aws s3 cp /tmp/style.css s3://running-man.com/$GIT_COMMIT_ID/css/ --content-encoding "gzip"  --content-type "text/css"

echo "Upload completed!"

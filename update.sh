#!/bin/bash
git add -A
git commit -m "${*:2}"
git push
echo "Updated Kuizine repository"

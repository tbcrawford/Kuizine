#!/bin/bash
git add -A
git commit -m "${*:1}"
git push
echo "Updated Kuizine repository"

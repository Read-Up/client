#!/bin/sh

if [ "$CI" != "true" ]; then
  "$@"
fi

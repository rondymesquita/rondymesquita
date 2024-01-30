#!/bin/bash

VERSION=0.5.0

curl -L https://github.com/mfontanini/presenterm/releases/download/v$VERSION/presenterm-$VERSION-x86_64-unknown-linux-gnu.tar.gz > presenterm.tar.gz
tar xvf presenterm.tar.gz presenterm-$VERSION/presenterm
mv presenterm-$VERSION/presenterm .
rm -rf presenterm.tar.gz
rm -rf presenterm-$VERSION

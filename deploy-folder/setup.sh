#!/usr/bin/env bash

###########################################
###########################################
##### author Sawyer Cutler ################
##### copyright 2022 Sawyer Cutler ########
##### license  MIT  #######################
###########################################
###########################################


set -Eeuo

echo "Creating Directories..."

mkdir scripts contracts test

echo "Installing NPM Modules"

npm install @openzeppelin/contracts @openzeppelin/contracts-upgradeable
npm install

echo "Copying Environment File"

cp .env.sample .env

echo "Hardhat with  Typescript Ready"

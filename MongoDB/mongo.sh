#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Installing required packages..."
sudo apt-get update
sudo apt-get install -y gnupg curl

echo "Adding MongoDB GPG key..."
curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | \
    sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg --dearmor

echo "Adding MongoDB APT repository..."
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/8.0 multiverse" | \
    sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list

echo "Updating package list..."
sudo apt-get update

echo "Installing MongoDB..."
sudo apt-get install -y mongodb-org

echo "MongoDB 8.0 installation complete."

sudo mkdir -p /data/db
sudo chown -R $(whoami) /data/db

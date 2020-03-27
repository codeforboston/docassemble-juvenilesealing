#!/bin/sh -l

echo "Hello $1"
time=$(date)
python3 -V
ls
python3 test_selenium.py
aloe tests/features/*
echo "python libraries installed:"
pip3 freeze

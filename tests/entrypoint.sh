#!/bin/sh -l

echo "Hello $1"
time=$(date)
echo "::set-output name=time::$time"
python3 -V
python3 test_selenium.py
aloe features/*
echo "python libraries installed:"
pip3 freeze

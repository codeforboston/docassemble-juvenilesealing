#!/bin/sh -l

echo "Hello $1"
time=$(date)
echo "::set-output name=time::$time"
python test_selenium.py
echo "python libraries installed:"
pip freeze

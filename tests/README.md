To get tests to run, you need to download chromedriver from https://sites.google.com/a/chromium.org/chromedriver/ and put it in `tests/`
You also need to `pip3 install aloe selenium certifi`

To run [a feature test](https://docassemble.org/docs/development.html#bdd):
```
cd tests
aloe features/hello_world.feature
```
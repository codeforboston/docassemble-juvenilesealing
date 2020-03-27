# Container image that runs your code
FROM selenium/standalone-chrome-debug:3.141.59

RUN apt-get update && apt-get install pip3

# Copies your code file from your action repository to the filesystem path `/` of the container
COPY entrypoint.sh /entrypoint.sh
COPY test_selenium.py /test_selenium.py

# Code file to execute when the docker container starts up (`entrypoint.sh`)
ENTRYPOINT ["/entrypoint.sh"]

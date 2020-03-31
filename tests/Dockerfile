# Container image that runs your code
FROM selenium/standalone-chrome-debug:3.141.59

USER root

RUN apt-get update && apt-get install -y python3-pip
RUN pip3 install selenium aloe certifi

# Copies your code file from your action repository to the filesystem path `/` of the container
COPY entrypoint.sh /entrypoint.sh

# Code file to execute when the docker container starts up (`entrypoint.sh`)
ENTRYPOINT ["/entrypoint.sh"]

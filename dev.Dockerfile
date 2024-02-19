FROM ubuntu:22.04

# ! we run the image as root

# ! do not push this image to a public registry as it contains sensitive credentials (you've been warned)

# SA key in env
# you need a service account for this and its corresponding key
COPY ./vms-sa.json /vms-sa.json

# this is how Google finds your identity to communicate with the GCP
ENV GOOGLE_APPLICATION_CREDENTIALS=/vms-sa.json

# copy env
COPY .env /.env

# installing gcloud CLI;
# the `-y` flag is used for non-interactive mode
RUN apt-get update && apt-get install -y \
    curl \
    apt-transport-https ca-certificates gnupg

# installing Python
RUN apt-get install -y python3

# installing pip
RUN apt-get install -y python3-pip

# if you want to find how to install the CLI, just Google "install gcloud Ubuntu"
## add the gcloud CLI distribution URI as a package source
RUN echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
## import the Google Cloud public key
RUN curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -
## update and install the gcloud CLI
RUN apt-get update && apt-get install -y google-cloud-cli

# installing python dependencies
COPY requirements.txt /requirements.txt 
RUN pip install -r /requirements.txt

# copy the script
COPY ./gcp-vm.py /gcp-vm.py

# ! dev to run the container indefinitely (better for debugging)
# CMD ["sh", "-c", "tail -f /dev/null"]

# `ENTRYPOINT` allows me to run the container as an executable,
# with the parameters I want to pass to the script:
# `docker run MY_IMAGE param1 param2` =>  `python3 /gcp-vm.py {command} {name}`;
# `CMD` and `ENTRYPOINT` are not executed during the build, only when the container runs
ENTRYPOINT [ "python3", "/gcp-vm.py" ]

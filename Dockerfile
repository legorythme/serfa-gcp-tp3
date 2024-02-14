# Récupère depuis dockerhub une image de base de Python
# IMAGE:TAG => le tag est un identifiant unique de la version
FROM python:3.12.1

# docker build -t hello-world .
# cette commande veut dire "construis cette image Docker";
# 

WORKDIR /usr/src/app

RUN apt-get install -y curl
# Downloading gcloud package
RUN curl https://dl.google.com/dl/cloudsdk/release/google-cloud-sdk.tar.gz > /tmp/google-cloud-sdk.tar.gz

# Installing the package
RUN mkdir -p /usr/local/gcloud \
  && tar -C /usr/local/gcloud -xvf /tmp/google-cloud-sdk.tar.gz \
  && /usr/local/gcloud/google-cloud-sdk/install.sh

# Adding the package path to local
ENV PATH $PATH:/usr/local/gcloud/google-cloud-sdk/bin

#RUN pip install --upgrade pip

COPY ./requirements.txt .

RUN pip3 install -r requirements.txt

COPY ./.env .
COPY ./gcp-vm.py .

CMD ["python3", "gcp-vm.py", "create", "test-server"]

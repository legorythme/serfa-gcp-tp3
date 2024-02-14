# Récupère depuis dockerhub une image de base de Python
# IMAGE:TAG => le tag est un identifiant unique de la version
FROM python:3.12.1-slim

# docker build -t hello-world .
# cette commande veut dire "construis cette image Docker";
# 

WORKDIR /usr/src/app

RUN pip install --upgrade pip

COPY ./requirements.txt .

RUN pip3 install -r requirements.txt

COPY ./.env .
COPY ./gcp-vm.py .

CMD ["python3", "gcp-vm.py", "create", "test-server"]

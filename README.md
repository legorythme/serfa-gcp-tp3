# SERFA GCP TP3: VMs and `gcloud` scripting

## scripting creation of VM's with `gcloud`

- enable Compute Engine API
- install `gcloud` CLI and configure it
- run `gcloud` to create an instance of a VM (replace with the correct values) =>

```bash
gcloud compute instances create test-server \
    --project=PROJECT \
    --zone=ZONE \
    --machine-type=e2-standard-2 \
    --network-interface=network-tier=PREMIUM,stack-type=IPV4_ONLY,subnet=default \
    --metadata=startup-script=\ \
\#\!\ /bin/bash$'\n'\ apt\ update$'\n'\ apt\ -y\ install\ apache2$'\n'\ cat\ \<\<EOF\ \>\ /var/www/html/index.html$'\n'\ \<html\>\<body\>\<p\>Linux\ startup\ script\ added\ directly.\</p\>\</body\>\</html\>$'\n'\ EOF \
    --no-restart-on-failure \
    --maintenance-policy=TERMINATE \
    --provisioning-model=SPOT \
    --instance-termination-action=DELETE \
    --service-account=DEFAULT_COMPUTE_SERVICE ACCOUNT \
    --scopes=https://www.googleapis.com/auth/devstorage.read_only,https://www.googleapis.com/auth/logging.write,https://www.googleapis.com/auth/monitoring.write,https://www.googleapis.com/auth/servicecontrol,https://www.googleapis.com/auth/service.management.readonly,https://www.googleapis.com/auth/trace.append \
    --tags=http-server \
    --create-disk=auto-delete=yes,boot=yes,device-name=test-server,image=projects/debian-cloud/global/images/debian-12-bookworm-v20240213,mode=rw,size=10,type=projects/PROJECT/zones/ZONE/diskTypes/pd-balanced \
    --no-shielded-secure-boot \
    --shielded-vtpm \
    --shielded-integrity-monitoring \
    --labels=goog-ec-src=vm_add-gcloud \
    --reservation-affinity=any
```

- you can find the IP of your VM with => `gcloud compute instances describe test-server --format='get(networkInterfaces[0].accessConfigs[0].natIP)'`

- enable HTTP traffic => 

`gcloud compute firewall-rules create allow-http --direction=INGRESS --priority=1000 --network=default --action=ALLOW --rules=tcp:80 --source-ranges=0.0.0.0/0`

... this command works because you have tagged your VM with `http-server` tag.

- now delete your VM with: `gcloud compute instances delete test-server --zone=ZONE`

- ok, let's create a simple script to automate this and save it as [`gcp-vm.py`](./gcp-vm.py), let's make it take the parameters that can vary:

    - a `.env` file with `DEFAULT_COMPUTE_SERVICE_ACCOUNT`, `GCP_PROJECT`, and `GCP_ZONE` variables
    - a parameter for the name of the VM, to pass to the script => `python3 gcp-vm.py create test-server`

## resources

- https://cloud.google.com/sdk/docs/scripting-gcloud
- https://cloud.google.com/blog/products/management-tools/scripting-with-gcloud-a-beginners-guide-to-automating-gcp-tasks
- there is a `bash.Dockerfile` image at the root of the repo, this is to test bash commands on Ubuntu, to use it

    - `docker build -f bash.Dockerfile -t bash .`
    - `docker run bash` => this will create a container and block your terminal
    - open a shell inside the container from another terminal => `docker exec -it CONTAINER_NAME /bin/bash`

## script everything with Docker

- script this process inside Docker:

    1. install `gcloud` CLI
    2. authenticate with your project (maybe with a key?)

    ![key example](./screenshot-1.png)

    3. create a VM with a startup script
    4. enable HTTP traffic
    5. ping the VM to check if it's up
    6. delete the VM

... the goal is to do all these steps with a simple `docker run IMAGE...` command.

`docker build --build-arg PROJECT_NAME=markets-agent --build-arg SERVICE_ACCOUNT_EMAIL=vms-sa@markets-agent.iam.gserviceaccount.com -t gcp-vm .`

## CI/CD deployment

Most of the Apache servers host your website files under `/var/www`.

Now, with a VM that is up and not being deleted, we want to update our application in an automated way, for that we need to:

- connect via SSH to the server
- copy the source code to the server inside the correct folder
- if the Apache configuration changes, restart the server as a `sudo` user without interactivity

First, we need to try the whole process manually:

### create the SSH keys that allow you to connect to the VM

`gcloud compute ssh VM_NAME --zone=ZONE` to:

- create SSH keys using gcloud
- this will create the keys, the first time you connect to the machine, and store them in the default location `~/.ssh` (on a Debian distro) for SSH
- you can now exit the VM

### impersonate the SSH user that will connect to the VM

In this step, what we want is to be able to not use `gcloud` to get inside the VM. Why don't we want to use `gcloud`? it's because we want the simplest and the most generic way to connect to our machine without having to install additional dependencies (such as `gcloud`) in our CI/CD pipeline.

For this, we'll register our newly created keys with the `ssh-agent` on our local machine like so => `eval "$(ssh-agent -s)" && ssh-add google_compute_engine`.

Here, `google_compute_engine` is the name of the private key file that `gcloud` created for us.

### try to connect to the VM without `gcloud`

`ssh USER@IP`, this should allow you to access the VM.

If you don't know or remember the `USER` part, just use `gcloud` again to connect to the VM and check the user name once inside it.

### try copying files inside the VM

`scp test.txt USER@IP:/var/www/html` => this copies the the file inside the VM's `/var/www/html` folder.

The first time you'll run this, you will encounter a permissions issue: it's because your VM user doesn't own the folder in which Apache stores the website files. You can verify this by running `ls -l /var/www` inside the VM. To be able to copy files within the VM, you'll need, inside the VM, to: `sudo chown USER -R /var/www/html`.

Now if you copy again the file and go to `http://IP/test.txt` you should see the content of the file.

Ok, now let's update our site with a pipeline !

# Developer machine setup (Windows 10)
- [General pre-requisities](#general-pre-requisities)
    - [Admin rights](#admin-rights)
    - [Windows Subsystem for Linux](#windows-subsystem-for-linux)
    - [A terminal (optional)](#a-terminal-optional)
    - [Git](#git)
  - [AWS](#aws)
  - [Docker](#docker)
  - [Javascript setup](#javascript-setup)
    - [Node.js](#nodejs)
    - [Yarn](#yarn)
    - [PostgreSQL](#postgresql)
  - [Python setup](#python-setup)
    - [pyenv](#pyenv)
## General pre-requisities
### Admin rights
It is important that your regular, everyday user account be granted admin rights, at least for the duration of this setup guide.
Postgres, nvm and pyenv among others rely on user-specific environment variables and permissions which will break if you attempt to install under an admin account and then switch to less privileged account for day-to-day. It is better to grant admin, setup, then remove.
### Windows Subsystem for Linux
Enable the Windows Subsystem for Linux.
![image1](images/win-1.png)
![image2](images/win-2.png)
Install Ubuntu 18.04 LTS by downloading it from the Microsoft Store.
![image3](images/win-3.png)
After it prompts you to create a username and a password, you will enter the shell.
![image4](images/win-4.png)
Do an initial package update:
`$ sudo apt update && sudo apt upgrade`
### A terminal (optional)
You will probably want to replace the Ubuntu-on-Windows Terminal with something like [Hyper](https://hyper.is/).
By default Hyper will launch the Windows Command Prompt, not bash. To change this, open the config by going to Edit...Preferences.
Scroll down until you get to the shell and shellArgs parameters. Set shell to C:\\Windows\\System32\\bash.exe and shellArgs to empty [].
![image5](images/win-5.png)
Save, quit, and relaunch Hyper.
### Git
Please ensure your git config to your real email address and not `user@macbook-pro.local` etc. Some of our code extracts and sends email to the email address configured in git.
`$ git config --global user.name "Your Name"`
`$ git config --global user.email "email@address.com"`
**IMPORTANT**:
Make sure git is not configured to convert Unix/Mac line endings into Windows line endings:
`$ git config --global core.autocrlf input`
Generate an SSH key pair, pressing enter to all prompts:
`$ ssh-keygen -t rsa -b 4096 -C "<email address>"`
Print out the contents of the public key:
`$ cat ~/.ssh/id_rsa.pub`
Paste the output into your [Github SSH keys configuration](https://github.com/settings/keys).
At this point you should be able to check out git repositories, eg. 
`$ git clone git@github.com:oohmedia/otp-api`
`$ git clone git@github.com:oohmedia/otp-client`
`$ git clone git@github.com:oohmedia/inventory`
## AWS
Most OTP infra scripts require **awscli** as well as the **jq** JSON formatter.
`$ sudo apt install awscli jq`
## Docker
In addition to our pipeline setup, several of our **otp-infra** scripts require [Docker](https://download.docker.com/win/stable/Docker%20for%20Windows%20Installer.exe) to be installed. 
Creating a Docker ID should not be required, just the installation.
Once done, please enter the settings menu and disable TLS to enable the client to talk to the Windows host.
![image5](images/win-6.png)
Once done, you'll need to configure Docker access from WSL:
`$ sudo apt install apt-transport-https ca-certificates curl software-properties-common`
`$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -`
`$ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb\_release -cs) stable"`
`$ sudo apt update && sudo apt install docker-ce`
`$ export "DOCKER_HOST=localhost:2375" >> ~/.bashrc`
`$ source ~/.bashrc`
If everything is working correctly, docker commands should not return an error:
`$ docker images`
**IMPORTANT**:
The pg_dump scripts, among others, require docker volume mappings to be working correctly.
To do this, you need to remap your Windows drive from /mnt/c to /c, so that the Windows docker can access the Linux path you are in.
Create the folder:
`$ sudo mkdir /c`
And remap /mnt/c to /c.
`$ sudo mount --bind /mnt/c /c`
And make sure you are running the scripts from somewhere under /c.
You should probably add the mount to your .bashrc.
## Javascript setup
### Node.js
You should use **nvm** (Node Version Manager) to manage your installed Node version(s). You can set a system wide default as well as project-specific versions. 
To install:
`$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash`
Each Javascript project should have an `.nvmrc` file that describes the specific version of Node.js the app is designed for. You should be able to run 
`$ nvm install` and/or `nvm use` 
on each project you check out, although we tend to standardise on the latest stable LTS release. 
If you're experiencing any issues you might find it useful to set your default Node.js to LTS:
`$ nvm alias default lts/*`
### Yarn
All Javascript projects in OTP use the **yarn** package manager rather than the default npm. Some of our scripts will not work with npm and their package lock files are incompatible.
Ubuntu has a similarly named package that conflicts so remove it:
`$ sudo apt remove cmdtest`
Now set up the yarn repo:
`$ curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -`
`$ echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list`
Since we already have Node.js installed through **nvm** we can skip the installation of Ubuntu's version of Node.js:
`$ sudo apt update && sudo apt install --no-install-recommends yarn`
### PostgreSQL
All of our Javascript APIs require a local Postgres 9.x database. The easiest option on Windows is to run it in Docker. Make sure you have installed Docker (as above).
Pull the docker image for Postgres 9.6:
`$ docker pull postgres:9.6`
Configure a local folder to store the database:
`$ mkdir -p $HOME/docker/volumes/postgres`
Run the docker image:
`$ docker run --name postgres -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres:9.6`
Docker should now be running the postgres DB. You can now install the CLI.
`$ sudo apt install postgresql-client-common postgresql-client-10`
You should make sure that the postgres database + login exists for your username.
`$ psql -c "create user $(whoami) superuser;" -h localhost -U postgres`
`$ createdb $(whoami) -h localhost`
Test that you can create an OTP database:
`$ createdb otp -h localhost`
## Python setup
### pyenv
Many Datahub projects, as well as Recommendation Engine and Inventory, require Python 3.6. Similar to nvm, you can manage Python versions with **pyenv**.
Install the dependencies for pyenv:
`$ sudo apt-get install -y make build-essential libssl-dev zlib1g-dev libbz2-dev \
libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev \
xz-utils tk-dev libffi-dev liblzma-dev`
Then install pyenv:
`$ curl -L https://github.com/pyenv/pyenv-installer/raw/master/bin/pyenv-installer | bash`
You will need to update your shell to use pyenv version of Python. Edit the ~/.bashrc file
`nano ~/.bashrc`
And add the three lines the pyenv installer asks for to the bottom of the file, eg:
`export PATH="/home/ben/.pyenv/bin:$PATH"`
`eval "$(pyenv init -)"`
`eval "$(pyenv virtualenv-init -)"`
Save (Ctrl-O), Quit (Ctrl-X), and then restart the shell so the changes take effect:
`$ exec "$SHELL"`
You can now run pyenv inside any Python repository:
`$ pyenv install`
Again similar to nvm each Python project should have a `.python-version` file that describes which version to install automatically.

From <https://raw.githubusercontent.com/oohmedia/otp-docs/master/onboarding-docs/windows-10-dev-machine-setup.md?token=AL73EI4MBEQDBDOXRLZ3U3S5KE6WG> 

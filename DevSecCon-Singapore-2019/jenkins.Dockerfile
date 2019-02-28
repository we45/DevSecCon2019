FROM jenkins/jenkins:lts

USER root

RUN apt-get update && apt-get -y install apt-transport-https ca-certificates curl gnupg2 software-properties-common wget \
    && wget -qO- https://get.docker.com | sh && echo "jenkins ALL=NOPASSWD: ALL" >> /etc/sudoers

RUN wget https://bootstrap.pypa.io/get-pip.py && python get-pip.py
RUN pip install bandit safety robotframework==3.0.4 RoboZap==1.2

RUN usermod -aG docker jenkins


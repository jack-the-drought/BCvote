FROM ubuntu:xenial

RUN apt-get -y update
RUN apt-get install -y python-software-properties
RUN apt-get install -y software-properties-common

RUN add-apt-repository ppa:bitcoin/bitcoin
RUN apt-get update
RUN apt-get install -y bitcoind

RUN mkdir ~/.bitcoin
RUN echo "rpcuser=john\nrpcpassword=johnpass\nrpcallowip=172.21.0.1/12\nregtest=1\n" > ~/.bitcoin/bitcoin.conf

CMD bitcoind

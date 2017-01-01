#This is a block-chain(regression) based MEAN stack voting webapp.
#build 
docker-compose build
#start the app
docker-compose up
#the following command will initiate some bitcoin credit so we can do transactions
docker-compose exec johnbtc bitcoin-cli -regtest generate 101

#ps: note that only an admin can create a vote. To create admin user just register with the username admin.
#if there are any problems feel free to report them to me, thanks.

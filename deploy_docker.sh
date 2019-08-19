sudo docker pull anypay/sports-oracle
#docker build --tag sports_oracle .

docker kill sports-oracle
docker rm sports-oracle

docker run -d --restart=always -p 3000:3000 --name sports-oracle --env-file=/opt/sports-oracle/.env sports-oracle


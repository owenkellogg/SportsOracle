docker pull anypay/sports-oracle

#docker build --tag sports_oracle .

docker kill sports_oracle
docker rm sports_oracle

docker run -d --restart=always -p 3000:3000 --name sports_oracle --env-file=.env sports_oracle


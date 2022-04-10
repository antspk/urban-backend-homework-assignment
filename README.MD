# Urban – Backend Engineer - Technical Test

## Local - development environment
Make sure to set up these env variables, and start the application, started application should be available on your localhost with the port you've provided or 9000 by default.
```shell
#Start Redis, that application could connect to it and cache requests.
docker compose up -d

#Start application on you local machine:
npm ci && npm run start
```

 

## Build - create docker image
```shell
docker build -t urban/api:1.0.0 .
```

## Deploy - create kubernetes resources
Before deployment, you should update `./infra/secret.yaml` file and change `google-maps-secret` & `open-cage-secret` values to you base64 encoded secrets.  
Following commands should create necessary kubernetes resources to run your application in your local kubernetes cluster:
```shell
kubectl apply -f ./infra/secret.yaml
kubectl apply -f ./infra/cache-deployment.yaml
kubectl apply -f ./infra/configmap.yaml
kubectl apply -f ./infra/deployment.yaml
```
After deployment application should be reachable via [http://localhost:9000/docs](http://localhost:9000/docs) 

## Destroy - delete kubernetes resources
To remove kubernetes resourced from your local cluster run following commands.
```shell
kubectl delete -f ./infra/secret.yaml
kubectl delete -f ./infra/cache-deployment.yaml
kubectl delete -f ./infra/configmap.yaml
kubectl delete -f ./infra/deployment.yaml
```
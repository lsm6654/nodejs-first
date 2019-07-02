# nodeJs-first

nodeJs + TypeScript + graphQL + mongoDB(mongoose) 

## Build & Run
```
$ npm install
$ npm start
```

http://localhost:4000/graphql

#### initialize test data
```
$ ./node_modules/.bin/ts-node src/db/initialize-data.ts
```
***

## Environment
- npm
- mongo

### mongo with docker-compose
#### Prerequisites
- docker
- docker-compose

##### setup
```
$ docker-compose up -d
```

##### start/stop
```
docker start/stop ${PROCESS_ID}
```

***


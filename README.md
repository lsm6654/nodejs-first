# nodeJs-first

nodeJs + TypeScript + graphQL + mongoDB(mongoose) 

## Build & Run

### graphql-api
```
$ npm install
$ npm start

# initialize test data
$ ./node_modules/.bin/ts-node src/db/initialize-data.ts
```
http://localhost:4000/graphql

#### GraphQL examples

##### 회의실 예약
```
mutation {
  addReservation(
    userId: "5d1c06395989cb375fa80594", 
    meetingRoomId: "5d1c06395989cb375fa805a9",
    startTime: "2019-07-09T03:00:00",
    endTime:"2019-07-10T03:00:00"){
        startTime
        endTime
  }
}
```

##### 주어진 시간에 비어있는 회의실 목록
```
{
  emptyMeetingRoomsByTimeBetween(
    startDate: "2019-06-20T00:37:07",
    endDate: "2019-07-02T03:00:07"){
        name
        size
  }
} 
```

##### 이번주 회의식 예약 내역 확인
```
{
  reservationsThisWeek {
    userId{
      name
      group
    }
    meetingRoomId {
      name
      size
    }
    startTime
    endTime
  }
}
```


### alter-date-format
```
$ ./node_modules/.bin/ts-node problems/alter-date-format.ts
```

### snake-ladder
```
$ ./node_modules/.bin/ts-node problems/snake-ladder.ts
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



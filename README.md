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


## 회고

### 좋았던 점
- node에 대해 알게 되었고, 재미있었다.
- Promise 패턴을 적용해보려 함. Promise 얘기만 많이 들었었는데, 이런거였구나 하고 느낌.
- GraphQL
    - REST나 RPC와 같은 인터페이스보다 훨씬 매력적. 새로운 경험!
- 그래도 꾸역꾸역 프로젝트 구성을..
    - 프로젝트 셋팅부터 진행하려다보니 수많은 난관에 봉착해왔는데, 그래도 어떻게 구성을 하게됨. -> 너무 엉성해서 문제이지만...
    - 남의걸 배끼려고하기보다 직접 하려함 -> 그래도 결국 quick start 를 따라하게 된 느낌..? ㅎㅎ


### 아쉬운 점
- 여러가지 면에서 너무 부족한것 같아서 창피할 따름.
    - 스크립트 언어도 낯설었고..
    - 부가적인 라이브러리 활용에서도..
    - -> 결국 수많은 삽질을 했다.
- 요구사항의 완성도가 부족했음.
    - 아무래도 프로젝트 구성부터 여러가지 신경쓸게 많았다. 하고 싶으나 하지 못한 것들이 꽤 있음.
        - error handling
        - resolve 에 비즈니스 로직이 들어가게 되었는데.. 보통 어떻게 구성하는건지 예제를 찾아보려 했음
        - model schema... populate 로 객체 치환을 하는데, variable name은 id를 가리키다보니 좀 보기 싫음. -> 보통 어떻게 하는지 찾아보려 했음..
        - GraphQL 스키마에 생각보다 에러가 많이 발생하던데. IDE 에서 안잡히고 런타임에 잡히는 에러 찾기가 어려웠음. -> 더 좋은 방법이 있나??
        - Date Type serialize/deserialize
        - properties
    -기타 등등....??
- Test code
    - jest 나 mocha 를 이용해 mock up하여 테스트를 해보려 했으나.. 시간이 모자라기도 했고, nodejs를 처음 진행해보면서 접하는 수많은 문제들로 인해 실패.
# serverless-sagas

> Original credit to https://github.com/theburningmonk/lambda-saga-pattern

## Successful input

```
{
 "tripId": "5c12d94a-ee6a-40d9-889b-1d49142248b7",
 "depart": "London",
 "departAt": "2017-07-10T06:00:00.000Z",
 "arrive": "Dublin",
 "arriveAt": "2017-07-12T08:00:00.000Z",
 "hotel": "holiday inn",
 "checkIn": "2017-07-10T12:00:00.000Z",
 "checkOut": "2017-07-12T14:00:00.000Z",
 "car": "Volvo",
 "carFrom": "2017-07-10T00:00:00.000Z",
 "carTo": "2017-07-12T00:00:00.000Z"
}
```

## Failure input

```
{
 "tripId": "5c12d94a-ee6a-40d9-889b-1d49142248b7",
 "depart": "London",
 "departAt": "2017-07-10T06:00:00.000Z",
 "arrive": "Dublin",
 "arriveAt": "2017-07-12T08:00:00.000Z",
 "hotel": "holiday inn",
 "checkIn": "2017-07-10T12:00:00.000Z",
 "checkOut": "2017-07-12T14:00:00.000Z",
 "car": "Volvo",
 "carFrom": "2017-07-10T00:00:00.000Z",
 "carTo": "2017-07-12T00:00:00.000Z",
 "failBookFlight": true
}
```

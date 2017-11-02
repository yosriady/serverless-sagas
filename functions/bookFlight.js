const AWS = require('aws-sdk');

const db = new AWS.DynamoDB.DocumentClient();

/* event example:
 *  { tripId: some_guid,
 *    depart: london,
 *    departAt: some_date,
 *    arrive: dublin,
 *    arriveAt: some_date,
 *  }
 */
module.exports.handler = (event, context, callback) => {
  if (event.failBookFlight) {
    callback("Book Flight Error");
  } else {
    return db.get({
      TableName: process.env.FLIGHT_BOOKINGS_TABLE_NAME,
      Key: {
        tripId: event.tripId,
      },
    }).promise()
      .then(({ Item }) => {
        const params = {
          TableName: process.env.FLIGHT_BOOKINGS_TABLE_NAME,
          Item: Object.assign(Item || {}, {
            tripId   : event.tripId,
            depart    : event.depart,
            departAt : event.departAt,
            arrive    : event.arrive,
            arriveAt : event.arriveAt
          }),
        };
        return db.put(params).promise();
      })
      .then(() => {
        const response = {
          statusCode: 201,
          body: {
            bookFlightSuccess: true,
          },
        };
        callback(null, response);
      })
      .catch((err) => {
        const response = {
          statusCode: 500,
          body: {
            bookFlightSuccess: false,
            error: err.message,
          },
        };
        callback(null, response);
      });
  }
};

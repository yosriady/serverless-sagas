const AWS = require('aws-sdk');

const db = new AWS.DynamoDB.DocumentClient();

/* event example:
 *  { tripId: some_guid,
 *    car: volvo,
 *    carFrom: some_date,
 *    carTo: some_date
 *  }
 */
module.exports.handler = (event, context, callback) => {
  if (event.failBookCar) {
    callback("Book Car Error");
  } else {
    return db.get({
      TableName: process.env.CAR_BOOKINGS_TABLE_NAME,
      Key: {
        tripId: event.tripId,
      },
    }).promise()
      .then(({ Item }) => {
        const params = {
          TableName: process.env.CAR_BOOKINGS_TABLE_NAME,
          Item: Object.assign(Item || {}, {
            tripId  : event.tripId,
            car      : event.car,
            carFrom : event.carFrom,
            carTo   : event.carTo
          }),
        };
        return db.put(params).promise();
      })
      .then(() => {
        const response = {
          statusCode: 201,
          body: {
            bookCarSuccess: true,
          },
        };
        callback(null, response);
      })
      .catch((err) => {
        const response = {
          statusCode: 500,
          body: {
            bookCarSuccess: false,
            error: err.message,
          },
        };
        callback(null, response);
      });
  }
};

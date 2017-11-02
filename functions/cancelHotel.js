const AWS = require('aws-sdk');

const db = new AWS.DynamoDB.DocumentClient();

/* event example:
 *  {
 *    tripId: some_guid
 *  }
 */
module.exports.handler = (event, context, callback) => {
  return db.get({
    TableName: process.env.HOTEL_BOOKINGS_TABLE_NAME,
    Key: {
      tripId: event.tripId,
    },
  }).promise()
    .then(({ Item }) => {
      const params = {
        TableName: process.env.HOTEL_BOOKINGS_TABLE_NAME,
        Item: Object.assign(Item || {}, {
          tripId: event.tripId,
          status: 'CANCELLED'
        }),
      };
      return db.put(params).promise();
    })
    .then(() => {
      const response = {
        statusCode: 201,
        body: {
          cancelHotelSuccess: true,
        },
      };
      callback(null, response);
    })
    .catch((err) => {
      const response = {
        statusCode: 500,
        body: {
          cancelFlightSuccess: false,
          error: err.message,
        }
      };
      callback(null, response);
    });
};

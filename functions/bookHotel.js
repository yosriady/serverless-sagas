const AWS = require('aws-sdk');

const db = new AWS.DynamoDB.DocumentClient();

/* event example:
 *  { tripId: some_guid,
 *    hotel: holiday inn,
 *    checkIn: some_date,
 *    checkOut: some_date,
 *  }
 */
module.exports.handler = (event, context, callback) => {
  if (event.failBookHotel) {
    callback("Book Hotel Error");
  } else {
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
            hotel: event.hotel,
            checkIn: event.checkIn,
            checkOut: event.checkOut
          }),
        };
        return db.put(params).promise();
      })
      .then(() => {
        const response = {
          statusCode: 201,
          body: {
            bookHotelSuccess: true,
          },
        };
        callback(null, response);
      })
      .catch((err) => {
        const response = {
          statusCode: 500,
          body: {
            bookHotelSuccess: false,
            error: err.message,
          },
        };
        callback(null, response);
      });
  }
};

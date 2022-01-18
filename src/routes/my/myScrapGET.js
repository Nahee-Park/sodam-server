const responseMessage = require('../../constants/responseMessage');
const statusCode = require('../../constants/statusCode');
const { reviewDB } = require('../../db');
const db = require('../../db/db');
const util = require('../../lib/util');
const { duplicatedDataClean } = require('../../lib/convertRawDataToProccessedData');

module.exports = async (req, res) => {
  if (!req.user) {
    return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.NEED_LOGIN));
  }
  let client;
  const userId = req.user[0].id;
  try {
    client = await db.connect(req);
    let responseData = [];
    if (userId) {
      responseData = await reviewDB.getScrapedReviewByUserId(client, userId);
      responseData.map((item) => {
        if (!item.image) {
          item.image = null;
        }
      });
    responseData = duplicatedDataClean(responseData, 'shopId', 'category');
    console.log(responseData);
      if (responseData.length !== 0) res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.GET_SCRAP_OF_MINE, responseData));
      else {
        res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.NO_REVIEW, responseData));
      }
    }
  } catch (error) {
    console.log(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
  } finally {
    client.release();
  }
};
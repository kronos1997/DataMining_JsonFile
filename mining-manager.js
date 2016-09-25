var luisClient = require('./luis-client.js');
var mongoClient = require('./mongo-client.js')
var jsonfile = require(/*Json File*/)

var textMiner = function Constructor(settings) {
}

//***Public methods***
textMiner.prototype.run = function () {
  this._setupLuis(jsonfile)
};

//Set up luis to convert free text to intents and entities
textMiner.prototype._setupLuis = function (data) {
  this.luisClient = new luisClient ({
    data: data
  });
  this.luisClient._promiseForLuisEntity();
};

//Set up connect with mongoDB
textMiner.prototype._setupMongo = function () {
  this.mongoClient = new mongoClient ({
    url: "mongodb://zhen0095:yxL2ucHg5M8brL4H4oyGZwnijhB5JfhKidFmHCdZXvGnS9c7H9kgT6BwJT6izYZ8XLfaGTurnekBVIkfkpXidw==@zhen0095.documents.azure.com:10250/?ssl=true"
  });
  this.mongoClient._storeData()
};

module.exports = textMiner;
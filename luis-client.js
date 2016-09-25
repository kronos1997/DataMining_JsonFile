var request = require('request')
var mongoClient = require('./mongo-client.js')
var self = null;

var luisClient = function Constructor(settings) {
    self = this;
    self.data = settings.data;
};

var finaldata = [];
var counter = 0;
var count = 0;
var n = 0;

luisClient.prototype._promiseForLuisEntity = function () {
    if (this.data.length > 0) {
        this._processLuisEntity();
    }
}

var link = "";

luisClient.prototype._processLuisEntity = function () {
        var options = {
            //url: PASS YOUR Luis.ai LINK,
            json: true
        };

        link = self.data[count].result.extractorData.data[0].group[n].Link[0].href //link from json file

        request(options, function (error, response, returndata) {
            if (error) {
                return error
            }
            if (response.statusCode !== 200) {
                return;
                //return new Error('unexpected status ' + response.statusCode)
            }
            console.log(returndata)
            //Use returndata and store it in an array after filter or handling
            }

            if(n + 1 < self.data[count].result.extractorData.data[0].group.length){
                n++;
                counter++;
                if (count + 1 == self.data.length && n + 1 == self.data[count].result.extractorData.data[0].group.length) {
                    this.mongoClient = new mongoClient ({
                        //url: MONGODB LINK,
                        data: finaldata
                    });
                    this.mongoClient._storeData()
                }
                self._processLuisEntity();
            }else{
                if (count + 1 < self.data.length && n + 1 == self.data[count].result.extractorData.data[0].group.length) {
                    count++;
                    counter++;
                    n = 0;
                    self._processLuisEntity();
                }
            }
        })
}

module.exports = luisClient;
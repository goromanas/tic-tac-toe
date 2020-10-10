const actionCollection = require('../db').collection('actions');

let Action = function (data) {
  this.data = data;
};

Action.prototype.getLog = function () {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await actionCollection.find().toArray();
      resolve(response);
    } catch (e) {
      reject(e);
    }
  });
};

Action.prototype.addAction = function () {
  return new Promise(async (resolve, reject) => {
    try {
      await actionCollection.insertOne({
        block: this.data.block,
        player: this.data.player
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

Action.prototype.clearActions = function () {
  return new Promise(async (resolve, reject) => {
    try {
      await actionCollection.deleteMany();
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = Action;

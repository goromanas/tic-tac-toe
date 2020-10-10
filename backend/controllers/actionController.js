const Action = require('../models/Action');

exports.log = async function (req, res) {
  const action = new Action();
  const actions = await action.getLog();
  res.json(actions);
};

exports.add = function (req, res) {
  let action = new Action(req.body);
  action
    .addAction()
    .then(() => {
      res.status(200).send('Success');
    })
    .catch(() => {
      res.status(500).send('Sorry, the request is invalid.');
    });
};

exports.clear = function (req, res) {
  let action = new Action(req.body);
  action
    .clearActions()
    .then(() => {
      res.status(200).send('Success');
    })
    .catch(() => {
      res.status(500).send('Sorry, the request is invalid.');
    });
};

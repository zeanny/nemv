var express = require('express');
var router = express.Router();

const mongoose = require('mongoose')
var autopunc_status = require('../../models/autopunc_status.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/autopunc/status', async function(req, res, next) {
  mongoose.connect('mongodb://172.30.6.192:27017/autopunc', { useNewUrlParser: true, useUnifiedTopology: true  }, (err) => {
    if (err) return console.error(err)
  })

  let json_result = {}
  let status = {}
//  const limit = 100

  var ver = 1
  if (req.query.version) {
    ver = parseInt(req.query.version)
  }

  // await autopunc_status.find(query).countDocuments()
  // .then(r=>status.api_total_count = r)
  // .catch(e => console.error(e))
  // console.log(status)
  status.version = ver

  await autopunc_status.find({"api":1, "test":true, "version":ver}).countDocuments()
  .then(r=>status.api_total_count = r)
  .catch(e => console.error(e)) 
  console.log(status)

  await autopunc_status.find({"api":0, "test":true, "version":ver}).countDocuments()
  .then(r=>status.trans_total_count = r)
  .catch(e => console.error(e))
  console.log(status)

  await autopunc_status.find({"api":1, "succeed":true,"test":true, "version":ver}).countDocuments()
  .then(r=>status.api_succeed_count = r)
  .catch(e => console.error(e)) 
  console.log(status)

  await autopunc_status.find({"api":0, "succeed":true,"test":true, "version":ver}).countDocuments()
  .then(r=>status.trans_succeed_count = r)
  .catch(e => console.error(e))  
  console.log(status)

  await autopunc_status.aggregate([ {$match:{"api":0, "version":ver}}, {$group: {_id:null, 'total':{$sum:'$time'}}}])
  .then(r=>status.trans_total_time = r[0]["total"])
  .catch(e => console.error(e))
  console.log(status)

  await autopunc_status.aggregate([ {$match:{"api":1, "version":ver}}, {$group: {_id:null, 'total':{$sum:'$time'}}}])
  .then(r=>status.api_total_time = r[0]["total"])
  .catch(e => console.error(e))
  console.log(status)

  json_result.status = status

  // await autopunc_status.find({"test":{$ne:"NONE"}}, {_id:0, test:0}).sort({date:-1})
  // .then(r=>json_result.api_history = r)
  // .catch(e => console.error(e)) 

  //console.log(json_result)
  res.json(json_result)
});


router.get('/autopunc/history/:query', async function(req, res, next) {
  mongoose.connect('mongodb://172.30.6.192:27017/autopunc', { useNewUrlParser: true, useUnifiedTopology: true  }, (err) => {
    if (err) return console.error(err)
  })

  let json_result = {}
  const limit = 100
  let query_string = req.params.query
  
  console.log(query_string)
  json_query = JSON.parse(query_string)
  await autopunc_status.find(json_query, {_id:0, sentence:0, date:0}).sort({date:-1})
  .then(r=>json_result.api_history = r)
  .catch(e => console.error(e)) 

  console.log(json_result)
  res.json(json_result)
  
});

router.delete('/autopunc/history', function(req, res, next) {
  mongoose.connect('mongodb://172.30.6.192:27017/autopunc', { useNewUrlParser: true, useUnifiedTopology: true  }, (err) => {
    if (err) return console.error(err)
  })

  autopunc_status.remove({"test":{$ne:"NONE"}})
  .then(r=>json_result.api_succeed_count = r)
  .catch(e => console.error(e)) 

  res.send("delete complete")
});
  // or

  // Todo.find({})
  //   .then(todo => console.log(todo))
  //   .catch(err => console.log(err))

module.exports = router;

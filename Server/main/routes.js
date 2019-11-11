var express = require('express');
let data;
var dbinfo = require('../passes');
const { Pool } = require('pg');
const pool = new Pool(dbinfo);
pool.query("SELECT * from users", (err, res) => {
    if(!err) {data = res}
  console.log(err, res);
  pool.end()
});

var router = express.Router();

router.get('/user', function(req, res) {
    res.json(data)
});

module.exports = router;
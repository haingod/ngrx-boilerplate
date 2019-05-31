const express = require('express');
const router = express.Router();
let heroes = [
  {
    id: 221,
    name: 'Big Hero 6',
    saying: 'fa la la la la (from node server)'
  }
]
router.get('/heroes', (req, res) => {
  res.send(heroes);
});
router.delete('/hero/:id', (req, res) => {
  heroes = [];
  res.send();
})

router.get('/badguys', (req, res) => {
  res.send([
    {
      id: 41,
      name: 'Bad Guy',
      saying: 'bwahahahaha (from node server)'
    }
  ]);
});

module.exports = router;

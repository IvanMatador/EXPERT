const allCards = require('../test_data');
const { request } = require('express');


module.exports.getCards = async function(req, res) {
  try {
    return await res.status(200).json(allCards);
  } catch (err) {
    throw new Error(err);
  }
};

/* module.exports.removeUser = async function(req, res) {
  try {
    const index = await allCards.findIndex(i => i.idReport === +req.params.id);
    allCards.splice(index, 1);
    return res.status(200);
  } catch (err) {
    throw new Error(err);
  }
}; */

module.exports.getById = async function(req, res) {
  try {
    return await res.status(200).json(allCards.filter(i => i.id === +req.params.id));
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.getByAllIds = async function(req, res) {
  try {
    const stringIds = [...(new Set(req.params.ids.split(':')))];
    const resultArray = [];
    console.log(resultArray)
    stringIds.map(item => {
      const card = allCards.filter(i => i.id === +item);
      resultArray.push(...card);
      //console.log(resultArray)
    })


    return await res.status(200).json(resultArray.sort((a,b)=>a.id-b.id));
  } catch (err) {
    throw new Error(err);
  }
};


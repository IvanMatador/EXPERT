const allCards = require('../test_data');
const momentum = require('moment');
const { request } = require('express');

module.exports.getByParams = async function(req, res) {
  try {
    const dateValues = {dateFrom: 0, dateTo: 0};
    const queryObj = Object.values(req.query);
    spliceDate(queryObj);
    const doubleArray = [[queryObj[0],queryObj[1]]];
    const keys = [queryObj[0]];
    const values = [];
    const filteredData = [];
    const countTypesArray = [];
    const typesAndEntries = [];
    const allEntriesIds = [];
    let finalData = []
    
    function spliceDate(arr) {

      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 'dateFrom' && arr[i+1] > 0 && arr[i+2] === 'dateTo' && arr[i+3] > 0) {
          dateValues.dateFrom = arr[i+1];
          dateValues.dateTo = arr[i+3];
          arr.splice(i, 4);
        }
      }
    }

    function dateToMilliseconds(date) {
      const targetDate = momentum(date).format('x');
      return +targetDate;
    }

    for (let i = 1; i < queryObj.length; i++) {
      const item = []
      if (i % 2 === 0) {
        keys.push(queryObj[i]);
        item.push(queryObj[i]);
        item.push(queryObj[i+1]);
      } else {
        values.push(queryObj[i]);
      }
      if (item.length > 0) {
        doubleArray.push(item);
      }
      
    }

    const uniqueKeys = new Set(keys);
    const arrayFromSet = [...uniqueKeys];
    const setSize = uniqueKeys.size;
    

    for (const set of uniqueKeys) { 
      countTypesArray.push([set, 0]);
    }

    for (let i = 0; i < keys.length; i++) { 
      for (let j = 0; j < setSize; j++) {
        if (keys[i] === countTypesArray[j][0]){
          countTypesArray[j][1] += 1;
        }
      }
    }

    countTypesArray.sort((a, b) => b[1] - a[1]);

    for (const type of countTypesArray) {
      for (let i = 0; i < doubleArray.length; i++){
        const typeArr = [type[0]];
        if (doubleArray[i][0] == type[0]) {
          const arrayFromAll = allCards.filter(item => {
            const key = Object.keys(item);
            const val = Object.values(item);
            if (val.findIndex((elem, idx) => elem === doubleArray[i][1] && key[idx] === doubleArray[i][0]) !== -1) {
              return true;
            } else { 
              return false;
            }
          })
          const ids = [];
          if (arrayFromAll.length > 0) {
            arrayFromAll.map(item => ids.push(item.idReport));
          }
          typeArr.push(ids);
        }
        if (typeArr.length > 1) {
          typesAndEntries.push(typeArr);
        }
      }
    }

    for (const type of arrayFromSet) {
      const typeSet = [type];
      for (const entrie of typesAndEntries) {
        if (type === entrie[0]) {
          entrie[1].map(item => typeSet.push(item));         
        }
      }
      allEntriesIds.push(typeSet);
    }

    allEntriesIds.sort((a,b)=>a.length-b.length).map(item => item.splice(0 ,1));
    const uniqEntrieIds = [...allEntriesIds[0]];
    allEntriesIds.every(item => uniqEntrieIds.every(e => item.findIndex(i => i === e) !== -1));    
  
    uniqEntrieIds.map(item => {
      const enter = allCards.filter(i => i.idReport === item);
      filteredData.push(...enter);
    })
    
    if (filteredData.length > 0){
      finalData = filteredData.filter(element => dateToMilliseconds(element.outputDate.date) >= dateValues.dateFrom
                                    && dateToMilliseconds(element.outputDate.date) <= dateValues.dateTo);
    } else if (dateValues.dateFrom > 0 && dateValues.dateTo > 0) {
      finalData = allCards.filter(element => dateToMilliseconds(element.outputDate.date) >= dateValues.dateFrom
                                    && dateToMilliseconds(element.outputDate.date) <= dateValues.dateTo);
    }

    if (finalData.length === 0 && filteredData.length > 0 ) {
      finalData = filteredData;
    }

    if (!allEntriesIds.every(item => uniqEntrieIds.every(e => item.findIndex(i => i === e) !== -1))) {
      filteredData.splice(0)
    }

    return await res.status(200).json(finalData);
  } catch (err) {
    throw new Error(err);
  }
};

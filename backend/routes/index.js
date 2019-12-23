const express = require("express");
const router = express.Router();
const db = require("../db/db.js");
const config = require("../config/config.js");
const sockets = require("../sockets/sockets.js");



router.put("/api/init", (req, res) => {
  const data = req.body.map(k => {

    let eur = new String(k["Sale_Price_EUR"]);
    let usd = new String(k["Sale_Price_USD"]) 

    return {
      "name": k["MFG -NAME"],
      "product": k["PRODUCT_NAME"],
      "eur": eur.replace("$", "").toString(),
      "usd": usd.replace("$", "").toString(),
      "upc": k["PRODUCT_ID/UPC"],
      "epc": k["EPC"],
      "inlay": k["Inlay"],
      "meta": k["Image (Ref only not for printing)"],
      "location": config.LOCATIONS.Home,
      "timestamp": Math.floor(Date.now() / 1000),
      "pickList": false,
    }
  });
  db.init(data, (result, err) => {
    // sockets.io.sockets.emit(config.EVENTS.InitDB, 200);
    sockets.io.sockets.emit(config.EVENTS.QA, 200);
    sockets.io.sockets.emit(config.EVENTS.PICKLIST, 200);
    res.send().status(200)
  })
})

router.get("/api/tags", (req, res) => {
  db.getTags({}, (result, err) => {
    res.send(result).status(200);
  })
})

router.get("/api/tags/:id", function(req, res) {
  if (req.params.id == "") {
    res.status(404).send('Not found');
  }
  db.getTags({"epc": req.params.id},(result, err) => {
    if (err !== undefined && err !== null) {
      console.log(err);
      res.status(500).send('Server Error');
      return;
    }
    if (result.length === 1) {
      res.send(result[0]).status(200);
    } else {
      res.status(404).send('Not found');
    }
  })
})

router.put("/api/devices/:id", function(req, res) {
  const data = {
    "id": req.params.id,
    "name": req.body.name,
    "location": req.body.location,
    "timestamp": req.body.timestamp,
  }

  db.getTags({"epc": data.id},(result, err) => {
    if (err !== undefined && err !== null) {
      console.log(err);
      res.status(500).send('Server Error');
      return;
    }
    if (result.length === 1) {
      const updatedTag = result[0];
      updatedTag.timestamp = data.timestamp
      updatedTag.location = data.location
      updatedTag.metaname = data.name

      db.updateTag(updatedTag, (updateResult, err) => {
        if (err !== undefined && err !== null) {
          res.status(500).send('Server Error');
          return;
        }
        console.log('updating tag succesfull');
        sockets.io.sockets.emit(config.EVENTS.MAP, 200);
        return res.status(200).send(updatedTag);
      })
    } else {
      res.status(404).send('Not found');
    }
  })
});

router.get("/api/qa", function(req, res) {
  db.getTags({"location": config.LOCATIONS.Distribution, "$or": [
    {"metaname": config.CASES.Good},
    {"metaname": config.CASES.Bad},
  ]}, (result, err) => {

    db.getTags({"pickList": true}, (pickListResult, err) => {
      // result contains the current items within  the qa area.
      // pickListReslt contains the current pick list, that should math the items in the QA area.
      const pickListMap = new Map();
      pickListResult.forEach( k => {
        const value = (pickListMap.get(k.upc) === undefined) ? 1 : pickListMap.get(k.upc) + 1
        pickListMap.set(k.upc, value)
      })
      let updatedQAList = [];
      result.forEach( k => {
        // iterate through the current selected QA Items, and compare them against the checklist.
        const itemsInPickList = pickListMap.get(k.upc);
        if (itemsInPickList == undefined || itemsInPickList == 0) {
          // oops, the item should not be in the QA area
          k["good"] = false;
          updatedQAList.push(k)
        } else {
          k["good"] = true;
          updatedQAList.push(k);
          pickListMap.set(k.upc, itemsInPickList -1)
        }
      })
      res.send(updatedQAList).status(200);
    })
  });
})

router.put("/api/qa/:id", function(req, res) {
  const data = {
    "id": req.params.id,
    "name": req.body.name,
    "location": req.body.location,
    "timestamp": req.body.timestamp,
  }

  db.getTags({"epc": data.id},(result, err) => {
    if (err !== undefined && err !== null) {
      console.log(err);
      res.status(500).send('Server Error');
      return;
    }
    if (result.length === 1) {
      const updatedTag = result[0];
      updatedTag.timestamp = data.timestamp
      updatedTag.location = data.location
      updatedTag.metaname = data.name

      db.updateTag(updatedTag, (updateResult, err) => {
        if (err !== undefined && err !== null) {
          res.status(500).send('Server Error');
          return;
        }
        console.log('updating tag succesfull');
        sockets.io.sockets.emit(config.EVENTS.QA, 200);
        return res.status(200).send(updatedTag);
      })
    } else {
      res.status(404).send('Not found');
    }
  })
});

router.get("/api/picklist", (req, res) => {
  db.getTags({"pickList": true}, (result, err) => {
    res.send(result).status(200);
  })
});

router.put("/api/picklist", (req, res) => {
  db.updatePickList(req.body, (result, err) => {
    sockets.io.sockets.emit(config.EVENTS.PICKLIST, 200);
    res.send(result).status(200);
  })
});


module.exports = router;
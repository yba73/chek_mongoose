const express = require("express");
const router = express.Router();
const Person = require("../models/personSchema");

//Create and Save a Record of a Model
router.post("/newperson", (req, res) => {
  let newPerson = new Person(req.body);
  newPerson.save((err, data) => {
    err ? console.log(err) : res.send("a new person was added");
  });
});

//Create Many Records with model.create()
router.post("/manyperson", (req, res) => {
  // Person.create(req.body, (err,data)=>{
  //     err ? console.log(err) : res.send('a new list of person was added')
  // })

  const listOfPerson = [
    {
      id: 1,
      name: "sonia",
      age: 28,
      favoriteFoods: ["sa7an tounsi"],
    },
    {
      id: 2,
      name: "ons",
      age: 19,
      favoriteFoods: ["ma9roudh", "kaftaji"],
    },
    {
      id: 3,
      name: "majda",
      age: 31,
      favoriteFoods: ["pasta", "tacos"],
    },
    {
      id: 4,
      name: "hamza",
      age: 26,
      favoriteFoods: ["pizza"],
    },
    {
      id: 5,
      name: "aicha",
      age: 29,
      favoriteFoods: ["chawarma", "burritos"],
    },
  ];
  Person.create(req.body, (err, data) => {
    err ? console.log(err) : res.send("a new list of person was added");
  });
});

//Find All Persons
router.get("/all", (req, res) => {
  Person.find({}, (err, data) => {
    err ? console.log(err) : res.json(data);
  });
});

//Use model.find() to Search Your Database
router.get("/name/:name", (req, res) => {
  Person.find({ name: req.params.name }, (err, data) => {
    err ? console.log(err) : res.json(data);
  });
});

//Use model.findOne() to Return a Single Matching Document from Your Database
router.get("/fav/:favoriteFoods", (req, res) => {
  Person.findOne({ favoriteFoods: req.params.favoriteFoods }, (err, data) => {
    err ? console.log(err) : res.json(data);
  });
});

//Use model.findById() to Search Your Database By _id
router.get("/id/:id", (req, res) => {
  Person.findById(req.params.id, (err, data) => {
    err ? console.log(err) : res.json(data);
  });
});

//Perform Classic Updates by Running Find, Edit, then Save
router.get("/FES/:id", (req, res) => {
  Person.findById(req.params.id).then((data) => {
    data.favoriteFoods.push("thai");
    data.save();
    res.json(data);
  });
});

//Perform New Updates on a Document Using model.findOneAndUpdate()
router.get("/update/:name", (req, res) => {
  Person.findOneAndUpdate(
    { name: req.params.name },
    { age: 20 },
    { new: true },
    (err, data) => {
      err ? console.log(err) : res.json(data);
    }
  );
});

//Delete One Document Using model.findByIdAndRemove
router.delete("/delete/:id", (req, res) => {
  Person.findByIdAndRemove(req.params.id, (err, data) => {
    err ? console.log(err) : res.send("the person was removed");
  });
});

//MongoDB and Mongoose - Delete Many Documents with model.remove()
router.delete("/remove", (req, res) => {
  Person.remove({ name: "test" }, (err, data) => {
    err ? console.log(err) : res.json(data);
  });
});

//Chain Search Query Helpers to Narrow Search Results
router.get("/chain/:food", (req, res) => {
  Person.find({ favoriteFoods: req.params.food })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec((err, data) => {
      err ? console.log(err) : res.json(data);
    });
});

module.exports = router;

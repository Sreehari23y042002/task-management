const db = require("./../models");
const Role = db.role;
const mongoose = require('mongoose');


async function configDB() {
  mongoose.set("strictQuery",false)
  mongoose.connect("mongodb://localhost:27017/node_mongo")
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit(1);
  });
}

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "employee"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'employee' to roles collection");
      });

      new Role({
        name: "manager"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'manager' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

module.exports = configDB;
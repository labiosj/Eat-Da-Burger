// Import MySQL connection.
const connection = require('../config/connection.js');

function printQues(num) {
  const arr = [];

  for (let i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  const arr = [];

  for (let key in ob) {
    const value = ob[key];
    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }
  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
const orm = {
  selectAll: function(tableInput, cb) {
    connection.query('SELECT * FROM ??', tableInput, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  insertOne: function(table, cols, vals, cb) {
    const queryString = 'INSERT INTO ?? (??) VALUES (?)';

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQues(vals.length);
    queryString += ") ";

    connection.query(queryString, [table, cols, vals], function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  // An example of objColVals would be {name: panther, sleepy: true}
  updateOne: function(table, objColVals, condition, cb) {
    const queryString = 'UPDATE ?? SET ? WHERE ?'

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, [table, objColVals, condition], function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  delete: function(table, condition, cb) {
    var queryString = "DELETE FROM ?? WHERE ?";

    connection.query(queryString, [table, condition], function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};

// Export the orm object for the model (cat.js).
module.exports = orm;

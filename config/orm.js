// Import MySQL connection.
var connection = require("../config/connection.js");

// Helper function for SQL syntax.

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    
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
var orm = {
  all: function(tableInput, cb) {
    
    connection.query("SELECT * FROM ??", [tableInput], function (err,result) {
      if (err) {
        throw err;
      }
      cb(result);
    })
    
      },
  create: function(table, insertData, cb) {
   
        connection.query("INSERT INTO ?? SET ?" , [table, insertData], function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  
  update: function(table, objColVals, condition, cb) {

    connection.query("UPDATE ?? SET ? WHERE ?", [table,objColVals, condition], function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    
    });
  },
  delete: function(table, condition, cb) {

    connection.query("DELETE FROM ?? WHERE ?", [table,condition], function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    
    }); 
    
  }
};


module.exports = orm;

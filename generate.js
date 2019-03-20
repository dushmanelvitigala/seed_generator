const csv = require("csv-parse");
const fs = require("fs");
const Handlebars = require("handlebars");
var dateFormat = require("dateformat");

var source =
  "'use strict';\
  module.exports = {\
    up: (queryInterface, Sequelize) => {\
      return queryInterface.bulkInsert('{{table}}', [{\
        {{#each data}}\
          {{@key}}: {{{this}}},\
        {{/each}}\
          }], {});\
    },\
      down: (queryInterface, Sequelize) => {\
      return queryInterface.bulkDelete('{{table}}', null, {});\
    }\
  };";

fs.createReadStream("sql/Masterdata.sql")
  .pipe(csv({ delimiter: ";", trim: true, relax: true }))
  .on("data", data => {
    let row = new Object();
    var entity = data.toString().match(/\".*?\"/);
    row.table = entity[0].slice(1, -1);

    var matches = data
      .toString()
      .match(/\(.*?\)/g)
      .map(function(str) {
        return str.slice(1, -1); // Remove the brackets
      });

    if (matches) {
      let data = (row.data = {});
      let keys = matches[0].split(",");
      let values = matches[1].split(",");
      for (const i of keys.keys()) {
        data[keys[i].trim().slice(1, -1)] =
          values[i].trim() === "CURRENT_TIMESTAMP"
            ? "new Date()"
            : values[i].trim();
      }
      console.log(row);
    }
    var template = Handlebars.compile(source);
    var result = template(row);
    console.log(result);
    fs.writeFile(
      "seeders/" +
        dateFormat(new Date(), "yyyymmddhMMssL") +
        "-" +
        row.table +
        ".js",
      result,
      function(err) {
        if (err) {
          return console.log(err);
        }

        console.log("The file was saved!");
      }
    );
  })
  .on("end", () => {})
  .on("error", error => {
    console.log(error);
  });

// const LZUTF8 = require("lzutf8");
// const _ = require("lodash");
// const filter =
//   "W3sibGFiZWwiOlsiTG9uZyBSaWRnZSJdLCJuYW1lIjoiZ3AiLCJ0eXDEDFNGIiwidmFsdWXELzg3NGI1ZTgyLTcyYzktNDlhYi05MTZlLWFmYWZmZDlkYTI1MyJdfV0=";
// const recoveredFilters = LZUTF8.decompress(filter, { inputEncoding: "Base64" });

// // console.time("consoleTime: list resources");
// // console.timeEnd("consoleTime: list resources");

// let resourceInfo = { urn1: "1234" };
// let xyz = {
//   urn: "heoollooo",
// };
// let a = _.extend(xyz, resourceInfo);

// console.log(resourceInfo);
// console.log(xyz);
// console.log(a);
// console.log(a === xyz);
// console.log(a === resourceInfo);

// class baseservice {
//   populateId() {
//     return this.geturn();
//   }
// }

// class baseAuditservice {
//   populateId() {
//     this.geturn();
//   }
// }
// const lol = new baseAuditservice();
// class iveventssummary extends baseservice {
//   geturn() {
//     return "werkkk";
//   }
//   sendevent() {
//     super.populateId();
//   }
// }

// const xyz = new iveventssummary();

// console.log(xyz.sendevent()());
// console.log(lol);
const fs = require("fs");
const notificationObj = require("./bulk.json").data;
const user = require("./user.json").data;
const lol = notificationObj.map((x) => x.destination);
const actualusers = user.map((x) => x.loginId);
const duplicates = lol.filter((item, index) => lol.indexOf(item) !== index);
const emailsuniqueusers = [...new Set(lol)];
let arr = [];
for (let i = 0; i < actualusers.length; i++) {
  let index = emailsuniqueusers.findIndex((x) => x === actualusers[i]);
  if (index < 0) {
    arr.push(actualusers[i]);
  }
}

fs.writeFile(
  "/Users/rsrigadd/personal/playground/test.txt",
  JSON.stringify(arr),
  function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  }
);

// console.log(lol);
// console.log(rm);
// console.log(duplicates);

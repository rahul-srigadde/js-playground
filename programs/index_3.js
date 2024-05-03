const axios = require("axios");
const fs = require("fs");

async function getUsersList(offset, limit) {
  const url = `https://apps-preview.intralinks.com/v3/apis/il-fund/notificationsData?filter={"content":"d0faa04c-4c8d-465e-9bf7-12c8debf43c9","role":["192b8f87-5a7f-4d7f-92b8-597e70e80247","NO_ROLE"],"gp":"c2620730-b69f-4239-b57c-95c8754cd1c4"}&offset=${offset}&limit=${limit}`;
  const userRes = await axios.get(url, {
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Cookie:
        "connect.sid=s%3Aa7af3942-ac44-4b17-a9ab-1686610db25b.4efUr%2FhVOmc1gPK6C0XqMWHSCh9Xy%2BRF3YsSTfFA09g.us03",
    },
  });
  // console.log("url", userRes);
  return userRes.data;
}
function printLogsToFile(data, fileName = "test") {
  return fs.writeFile(
    `/Users/rsrigadd/personal/playground/logs/${fileName}.json`,
    JSON.stringify(data),
    function (err) {
      if (err) {
        return console.log(err);
      }

      console.log("The file was saved!", fileName);
    }
  );
}
async function checkBlock() {
  let i = 0;
  let users = [];
  let promises = [];

  while (i < 4500) {
    promises.push(getUsersList(i, 500));
    i = i + 500;
  }
  const res = await Promise.all(promises);
  res.map((x) => users.push(...x.data.map((y) => y.destination)));
  await printLogsToFile(users, "test");
}

async function executeNotification() {
  let usersList = [];
  let userResponseTotalCount = 0;
  let userOffset = 0;
  let userLimit = 500;

  let userResponse = await getUsersList(userOffset, userLimit);
  usersList = usersList.concat(userResponse.data.map((x) => x.destination));
  userOffset = usersList.length;
  userResponseTotalCount = userResponse._meta.stats.count;
  console.log("userResponseTotalCount", userResponseTotalCount);
  console.log("userOffset", [...new Set(usersList)].length);
  while (usersList.length < userResponseTotalCount) {
    userResponse = await getUsersList(userOffset, userLimit);
    usersList = usersList.concat(userResponse.data.map((x) => x.destination));
    userOffset = usersList.length;
    console.log("userOffset", [...new Set(usersList)].length);
  }
}

function identifyduplicates(file1, file2) {
  const data1 = require(`./${file1}`);
  const data2 = require(`./${file2}`);
  const duplicates = data1.filter((x) => data2.includes(x));
  printLogsToFile(duplicates, `test_${file1}_${file2}`);
}

// identifyduplicates("dump2/test.json", "dump2/test.json");
// identifyduplicates("test_1000", "test_1500");
// identifyduplicates("test_1500", "test_2000");
// identifyduplicates("test_2000", "test_2500");
// identifyduplicates("test_2500", "test_3000");
// identifyduplicates("test_3000", "test_3500");
// identifyduplicates("test_3500", "test_4000");
// identifyduplicates("test_4000", "test_4500");

async function checkDuplicates() {
  const destination = require("./logs/test.json");
  const dups = destination.filter(
    (x, index) => destination.findIndex((y) => y === x) !== index
  );
  await printLogsToFile(dups, "notifications");
}

async function execute() {
  console.log("1");
  await checkBlock();
  console.log("2");
  await checkDuplicates();
  console.log("3");
}

execute();

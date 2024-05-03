const axios = require("axios");
const fs = require("fs");

async function getUsersList(offset, limit) {
  const url = `http://localhost:8095/v3/apis/il-fund/exportData`;

  let data = JSON.stringify({
    data: {
      fields: "destination,title,resourceType,portalName,error",
      sort: '[{"createdAt": "dsc"}]',
      filters:
        '{"notification":"5270ae0a-b476-49a4-8de5-7ac274a657f2","gp":"c379dc63-1c91-4c2a-9a6d-77a1b483d58e"}',
      modelName: "notificationItem",
      gp: "c379dc63-1c91-4c2a-9a6d-77a1b483d58e",
    },
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:8095/v3/apis/il-fund/exportData",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzBkOTBmZS03NzAxLTRkMjktODQyMi1kYjMyNDNlNzRkZjkiLCJraW5kIjoiRVhURVJOQUwiLCJwcmluY2lwYWxLaW5kIjoiRVhURVJOQUwiLCJwcmluY2lwYWxJZCI6IjYzMGQ5MGZlLTc3MDEtNGQyOS04NDIyLWRiMzI0M2U3NGRmOSIsInByb3ZpZGVySWQiOiIyZmY3MDc0Zi02MmI1LTQyN2EtOWNhZi00NWFhNzlhNjhiYmQiLCJpYXQiOjE3MTA5MTkxNjQsImV4cCI6MjA3MDkxOTE2NCwiaXNzIjoiaHR0cDovLzAuMC4wLjA6ODA5NSJ9.s6bqaAEL-Rihpu_2PPqdhmTTy26Fruw-U8M3pqGHqSGe_M1SRBL00xq5-0HduLdro4Fvqesv11FlfvLmhPqGtOfUyMHEzEo40hqIHEeC2UtE8eq5ZxdVW0puwC0kU1Nd-KLd3XcgUH8lA-C5fYXYDCYjOii7CHxr3fd6Y-5Yzalp5iYk3vd3CRaGLNbUDuXCjB_2-bEi6IvaQxNik76hp1MrJ3VRMI_zw2-rgaR-j3qqZ_RgLVKnUQ8oM2cCko37z9mAJB9hZW2btYBoqBk4BYQuwSLa_fL1Vo2pMhaZqcx1o7uwooUCb-E3IiQbZMnoH81YPTzxyrY-GFChIZ0yqg",
      "Content-Type": "application/json",
    },
    data: data,
  };

  const userRes = await axios.request(config);

  return userRes.data.data;
}

async function executeNotification() {
  let i = 0;
  let userResponse;
  const responseFromAPI = [];
  while (i < 9) {
    userResponse = await getUsersList();
    responseFromAPI.push(userResponse.fileName);
    i++;
  }
  console.log(responseFromAPI);
}

function identifyduplicates() {
  const data500 = require(`./logs/file_500.json`);
  const data1000 = require(`./logs/file_1000.json`);
  const data1500 = require(`./logs/file_1500.json`);
  const data2000 = require(`./logs/file_2000.json`);
  const data2500 = require(`./logs/file_2500.json`);
  const data3000 = require(`./logs/file_3000.json`);
  const data3500 = require(`./logs/file_3500.json`);
  const data4000 = require(`./logs/file_4000.json`);
  const data4105 = require(`./logs/file_4105.json`);
  const finaldata = [
    ...data500,
    ...data1000,
    ...data1500,
    ...data2000,
    ...data2500,
    ...data3000,
    ...data3500,
    ...data4000,
    ...data4105,
  ];
  const duplicates = finaldata.filter(
    (item, index) => finaldata.indexOf(item) !== index
  );
  console.log(duplicates);
}

// executeNotification().then();

const csv = require("csv-stringify/sync");
const output = csv.stringify([
  ["1", "2", "3", "4"],
  [true, "b", "c", "d"],
]);

console.log(output);

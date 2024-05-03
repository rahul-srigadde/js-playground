const axios = require("axios");
const fs = require("fs");

async function getUsersList(offset, limit) {
  const url = `http://localhost:8095/v3/apis/il-fund/notificationsData?filter={"content":"d0faa04c-4c8d-465e-9bf7-12c8debf43c9","role":["192b8f87-5a7f-4d7f-92b8-597e70e80247","NO_ROLE"],"gp":"c2620730-b69f-4239-b57c-95c8754cd1c4"}&offset=${offset}&limit=${limit}`;
  console.log(url);
  const userRes = await axios.get(url, {
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      // Cookie:
      //   "connect.sid=s%3Aa7af3942-ac44-4b17-a9ab-1686610db25b.4efUr%2FhVOmc1gPK6C0XqMWHSCh9Xy%2BRF3YsSTfFA09g.us03",
      "x-il-ctx-service-token":
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyYTQ4NDlhNS00MjZjLTRhMDgtYjk0Ni1iOTM3NDNiZjQ5ZTQiLCJraW5kIjoiQUNDRVNTIiwicHJpbmNpcGFsSWQiOiIyYTQ4NDlhNS00MjZjLTRhMDgtYjk0Ni1iOTM3NDNiZjQ5ZTQiLCJwcm92aWRlcklkIjoiN2Q1YjMzMDctMjcyZC00MmE3LTlmN2EtYjlmNDdiNWM2MDU5IiwicHJpbmNpcGFsS2luZCI6IklBTV9TRVJWSUNFIiwiZXh0ZXJuYWxJZCI6ImZ1bmRzdmNAaWxhZG1pbi5jb20iLCJhZG1pbiI6eyJ2ZHJfdmlhIjp0cnVlfSwianRpIjoiZmQxY2UzMTYtZGMwMi00ZWVhLThlNDgtYmU3YjU1OTYyMzdiIiwicnRpIjoiYTAxZmQ0ZjUtZmE2MC00YjkyLWJjOWMtNTA2OTg3ZWI3ZDRmIiwiaWF0IjoxNzEwMjIzMjc1LCJleHAiOjE3MTAzMDk2NzUsImlzcyI6ImlhbS1wcmV2aWV3LmludHJhbGlua3MuY29tIn0.eW4gg26FXNlHNTqPIJ_Ia_T3jWG_mWDZInfT2e8b06Bdo2j_90xFE2UNKYTOQxY5ZUE51EKuyJP1krMXxUuLQSuqAjmItv9juczEpo5RN7N96vzdUSeYFvo83ZVVI9nDqzsxPqRYMt3FXeLbmDmW-CP0c0NBzT-AOHyK3MOiHyqEWucAuWjDpEOBKpG21vEhlpjcIvApiMy7TMDZ5rcFSvkXJP5MfV_4Z7I6yvDR8pyPtU5MGKr5PRKoaEr99Y-CcBL4JwAxU1EvchBOsqxTAV6kZrEi2lYMjI9pZHTfxzrpxfADLOxvwSjDNX41SVWAaKzz3jLCPAe5Npk8h3nkqw",
    },
  });
  // console.log("url", userRes);
  return userRes.data;
}

async function executeNotification() {
  let usersList = [];
  let userResponseTotalCount = 0;
  let userOffset = 0;
  let userLimit = 500;

  let userResponse = await getUsersList(userOffset, userLimit);
  let responseFromAPI = userResponse.data.map((x) => x.destination);
  usersList = usersList.concat(responseFromAPI);
  userOffset = usersList.length;
  userResponseTotalCount = userResponse._meta.stats.count;
  fs.writeFileSync(
    `/Users/rsrigadd/personal/playground/logs/file_${usersList.length}.json`,
    JSON.stringify(responseFromAPI)
  );
  while (usersList.length < userResponseTotalCount) {
    userResponse = await getUsersList(userOffset, userLimit);
    responseFromAPI = userResponse.data.map((x) => x.destination);
    usersList = usersList.concat(responseFromAPI);
    userOffset = usersList.length;
    fs.writeFileSync(
      `/Users/rsrigadd/personal/playground/logs/file_${userOffset}.json`,
      JSON.stringify(responseFromAPI)
    );
  }
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

executeNotification().then((x) => identifyduplicates());

const a = `http://localhost:8090/v3/apis/il-alts-notifications/notificationInstances?
groupBy=destination,campaign&limit=10&offset=0&
filter={"portalId": "005ecdf5-c35f-47ab-a039-dfa7666928ae",
"resourceData.campaign":"b480dead-6557-4eda-ae71-dd85e356197a", 
"resourceType" : "TEASERS"}&sort=[{"createdAt":"dsc"}]&
groupByLimit=1&groupBySort=[{"destination":"dsc"}]`;

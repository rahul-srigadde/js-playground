const SparkPost = require("sparkpost");

const YOUR_API_KEY = "54b4c709e7b19ddebcfee2431afe8dfaf309a408";
const client = new SparkPost(YOUR_API_KEY);

// const options = {
//     endpoint: 'https://dev.sparkpost.com:443'
//   };

function getDomains() {
  const options = {
    uri: "metrics/domains",
  };

  client
    .get(options)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
function sendEmail() {
  client.transmissions
    .send({
      options: {
        sandbox: true,
      },
      content: {
        from: "testing@sparkpostbox.com",
        subject: "Hello, World!",
        html: "<html><body><p>Testing SparkPost - the world's most awesomest email service!</p></body></html>",
      },
      recipients: [{ address: "rahul.srigadde625@gmail.com" }],
    })
    .then((data) => {
      console.log("Woohoo! You just sent your first mailing!");
      console.log(data);
    })
    .catch((err) => {
      console.log("Whoops! Something went wrong");
      console.log(err);
    });
}
getDomains();

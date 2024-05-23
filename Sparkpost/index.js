const SparkPost = require("sparkpost");
require("dotenv").config();

class SparkPostClass {
  constructor() {
    this.client = new SparkPost(process.env.SPARK_POST_API_KEY);
  }
  getDomains() {
    const options = {
      uri: "metrics/domains",
    };

    this.client
      .get(options)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  sendEmail() {
    this.client.transmissions
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
  getInboundDomains() {
    this.client.inboundDomains
      .list()
      .then((data) => {
        console.log("Congrats you can use our client library!");
        console.log(data);
      })
      .catch((err) => {
        console.log("Whoops! Something went wrong");
        console.log(err);
      });
  }
  createInboundDomains(createOpts) {
    this.client.inboundDomains
      .create(createOpts)
      .then((data) => {
        console.log("Congrats you can use our client library!");
        console.log(data);
      })
      .catch((err) => {
        console.log("Whoops! Something went wrong");
        console.log(err);
      });
  }
}

function execute() {
  const sparkpost = new SparkPostClass();
  sparkpost.getInboundDomains({ domain: "example1.com" });
}
execute();

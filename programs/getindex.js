const _ = require("lodash");
_.templateSettings = {
  interpolate: /{{(.+?)}}/g,
};

const template = {};

template.subject =
  "A new {{DOC_TYPE}} {{IV_DOC_TYPE}}document has been uploaded";

template.merge = {
  IV_DOC_TYPE: "hello ",
  DOC_TYPE: "jbsdfbdk;fv",
  IV_TYPE: "sknvlkxndv",
};

console.log(_.template(template.subject)(template.merge));

db.getCollection("notificationinstances").find({
  "resourceData.posting": "b77fc42b-0782-4245-9d59-5c6010bf8457",
  error: { $exists: true },
});

db.getCollection("notificationinstances").find({
  "resourceData.content": "c684cbba-d08a-4e46-b45c-99ceecd03ba3",
  error: { $exists: true },
});

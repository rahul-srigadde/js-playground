// some base class
class BaseClass {}
// SocialNetworkMixin
const SocialNetwork = (superclass) =>
  class extends superclass {
    foo() {
      console.log("foo");
    }
  };
// AdProviderMixin
const AdProvider = (superclass) =>
  class extends superclass {
    bar() {
      console.log("bar");
    }
  };
// Our helper class that will make things look better
class MixinBuilder {
  constructor(superclass) {
    this.superclass = superclass;
  }
  with(...mixins) {
    return mixins.reduce((c, mixin) => mixin(c), this.superclass);
  }
}
// this will combine everything in one class
const mix = (superclass) => new MixinBuilder(superclass);

class Facebook extends mix(BaseClass).with(SocialNetwork, AdProvider) {}
const fb = new Facebook();
fb.foo();
fb.bar();

db.getCollection("notificationinstances").find({});

db.notificationinstances.aggregate([
  {
    $match: {
      portalId: "3ce9210e-5478-499a-a005-98a3781dea90",
      error: { $exists: true },
    },
  },
  {
    $group: {
      _id: "$notification",
      notificationInstances: { $push: "$$ROOT" },
      count: { $sum: 1 },
    },
  },
  { $sort: { count: -1 } },
  { $unwind: "$notificationInstances" },
  //  {
  //    $project: {
  //      notificationInstances: {
  //        $slice: [
  //          "$notificationInstances",
  //         5,
  //        ],
  //      },
  //    },
  //  },
]);

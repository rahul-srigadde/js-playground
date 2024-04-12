print("Domain Name, Count");
db.userprofiles
  .aggregate([
    {
      $project: {
        domain: { $arrayElemAt: [{ $split: ["$loginId", "@"] }, 1] },
        user: "$$ROOT",
      },
    },
    {
      $unwind: "$domain",
    },
    {
      $group: {
        _id: "$domain",
        distinctUsers: { $addToSet: "$user.loginId" },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
    {
      $project: {
        _id: 1,
        numberOfDistinctUsers: { $size: "$distinctUsers" },
      },
    },
  ])
  .forEach((x) => print(x._id + "," + x.numberOfDistinctUsers));

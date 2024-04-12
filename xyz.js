db.notificationinstances.aggregate([
  {
    $match: {
      applicationId: "442faf51-408a-48f3-a92c-f45157bf3541",
      testEmail: false,
      status: {
        $ne: "CREATED",
      },
      portalId: "005ecdf5-c35f-47ab-a039-dfa7666928ae",
      "resourceData.campaign": "b480dead-6557-4eda-ae71-dd85e356197a",
      resourceType: "TEASERS",
    },
  },
  {
    $sort: {
      createdAt: -1,
    },
  },
  {
    $group: {
      _id: {
        portalId: "$portalId",
        applicationId: "$applicationId",
        destination: "$destination",
      },
      emails: {
        $push: "$$ROOT",
      },
      count: {
        $count: {},
      },
    },
  },
  {
    $project: {
      portalId: "$_id.portalId",
      _id: 0,
      destination: "$_id.destination",
      notificationCount: "$count",
      lastSentEmail: {
        $slice: ["$emails", 5],
      },
    },
  },
  {
    $unwind: "destination",
  },
  {
    $sort: {
      destination: -1,
    },
  },
  {
    $project: {
      portalId: "$_id.portalId",
      _id: 0,
      destination: "$_id.destination",
      notificationCount: "$count",
      lastSentEmail: {
        $slice: ["$emails", 5],
      },
    },
  },
  {
    $limit: 10,
  },
]);

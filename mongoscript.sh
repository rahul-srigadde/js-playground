
COLLECTIONS=("notifications" )
# Construct the MongoDB connection string
CONNECTION_STRING="mongodb://il-alts-notifications-mongodb-service-user:$ALTS_MONGO_PASSWORD@il-alts-notifications-mongodb-0.il-alts-notifications-mongodb-headless,il-alts-notifications-mongodb-1.il-alts-notifications-mongodb-headless,il-alts-notifications-mongodb-2.il-alts-notifications-mongodb-headless/AltsNotifications?authSource=admin"
#CONNECTION_STRING="mongodb://$HOST:$PORT/$DB_NAME"
for COLLECTION in "${COLLECTIONS[@]}"
do
    mongodump --uri=$CONNECTION_STRING --collection $COLLECTION --archive=$COLLECTION.gz --gzip
done


for COLLECTION in "${COLLECTIONS[@]}"
do
    mongorestore --uri=$CONNECTION_STRING --collection $COLLECTION --archive=$COLLECTION.gz --gzip
done

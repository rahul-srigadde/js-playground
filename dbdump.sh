export DB_USER="il-alts-notifications-mongodb-service-user"
export DB_PASSWORD="wkWe7AeJgw90tJ2sxFBm96uBf09pteWFolc00I2DmzL3ZFdj"
export HOST="localhost:27018"
export DB="AltsNotifications"


 
fundCollections=(
    # "applicationonboardings"
    # "batchevents"
    # "notificationerrors"
    # "notificationinstances"
    "notifications"
    # "svctasks"
    # "archiveconfigs"
    # "assets"
    # "assignments"
    # "audittrails"
    # "bulkitems"
    # "bulks"
    # "cashflowbatches"
    # "cashflowtransactions"
    # "classes"
    # "clientpolicymetadatas"
    # "clients"
    # "consents"
    # "contents"
    # "customcontents"
    # "customlandingpages"
    # "customroles"
    # "docdownloads"
    # "docgroups"
    # "doctypes"
    # "documentreads"
    # "entities"
    # "entitlementexternalfunds"
    # "entitlementexternalpartners"
    # "entitlementfunds"
    # "entitlementpartners"
    # "exceltemplates"
    # "exportdatas"
    # "externalfunds"
    # "externalsystems"
    # "fundirrbatches"
    # "fundirritems"
    # "funds"
    # "generalpartnerships"
    # "gpresources"
    # "groups"
    # "hedgeperiods"
    # "hedgetransactions"
    # "holdingitems"
    # "holdings"
    # "ilpatransactiontags"
    # "investments"
    # "investors"
    # "ivevents"
    # "migrationentitymappings"
    # "migrationitems"
    # "migrations"
    # "notificationitems"
    # "notifications"
    # "periods"
    # "policies"
    # "postingitems"
    # "postings"
    # "reports"
    # "reporttemplates"
    # "requesteduserprofiles"
    # "roles"
    # "scheduledtasks"
    # "securities"
    # "svcarchivescripts"
    # "svconetimescripts"
    # "svctasks"
    # "tasklogs"
    # "templates"
    # "thirdparties"
    # "transactions"
    # "usercontents"
    # "userpreferences"
    # "userprofiles"
    # "workflowrules"
    # "workflows"
    )
 
# for collection in ${fundCollections[@]}; do
#   mongodump -v --host $HOST -u $DB_USER --authenticationDatabase=admin -p $DB_PASSWORD --db=$DB --collection=$collection --archive="dump/"$collection.gz --gzip
# done

# for collection in ${fundCollections[@]}; do
#   mongorestore -v --host localhost:27017 --db=$DB --noIndexRestore --gzip --archive="dump/"$collection.gz
# done


for collection in ${fundCollections[@]}; do
    mongoexport --uri="mongodb://$HOST" --authenticationDatabase=admin --db=$DB  -u $DB_USER -p $DB_PASSWORD --collection=$collection  --out="dump2/"$collection.json
done

# for collection in ${fundCollections[@]}; do
#   mongorestore -v --host localhost:27017 --db=$DB --noIndexRestore --gzip --archive="dump/"$collection.gz
# done


# mongoexport --uri="mongodb://localhost:27019" --authenticationDatabase=admin --db=$DB  -u $DB_USER -p $DB_PASSWORD --out=bulk.json

# mongoimport  --uri="mongodb://localhost:27017"  --db=$DB --collection=activityerrors --file=bulk.json

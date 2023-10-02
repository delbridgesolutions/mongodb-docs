
var coll = db.getCollection("COLLECTION_NAME");
var cursor = coll.find();
while (cursor.hasNext()) {
    var doc = cursor.next();
    var keys = {};
    var hasNull = false;
    for ( var x in doc) {
        if (x != "_id" && (doc[x] == null || doc[x] == "") ) {
            keys[x] = 1;
            hasNull = true;
        }
    }
    if (hasNull) {
        coll.update({_id: doc._id}, {$unset:keys});
    }
}
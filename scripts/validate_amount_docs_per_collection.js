var adminDb = db.getSiblingDB("admin");
var dbs = [];
var listDbsOutput = adminDb.runCommand({listDatabases: 1, nameOnly: true});


for (var i = 0; i < listDbsOutput.databases.length; i++) {
      if ( listDbsOutput.databases[i].name == "admin"
       || listDbsOutput.databases[i].name == "local"
       || listDbsOutput.databases[i].name == "config" ) {
        continue;
       }
      dbs.push(listDbsOutput.databases[i].name);
  }
print(`Database Name | Collection Name | # Docs | # Indices`)
for (var i = 0; i < dbs.length; i++) {
  var currDB = db.getSiblingDB(dbs[i]);
  var colls = currDB.getCollectionInfos().sort((a,b) => (a.name > b.name ? 1 : -1));
  for (var j = 0; j < colls.length; j++) {
    var currColl = currDB.getCollection(colls[j].name);
    
     print(`${currDB.getName()}|${currDB,colls[j].name}|${currColl.countDocuments({})}|${currColl.getIndexes().length}`);// 4.2+
    }
}

  //mongosh --quiet "mongodb+srv://admin:admin@cluster0.cuhwb.mongodb.net/myFirstDatabase"  --eval="load('validate_amount_docs_per_collection.js')"
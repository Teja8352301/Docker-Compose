const {MongoClient} = require('mongodb');
const dbConnect = async(isProduction) =>{
    let uri = 'mongodb://mongodb:mongodb@mongo:27017'
    if(isProduction == 'true'){
        uri = 'mongodb://mongodb:Teja8352@docdb-2022-06-07-16-41-02.cvka2dttyoqj.ap-south-1.docdb.amazonaws.com:27017/?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&retryWrites=false'
    }
    const client = new MongoClient(uri);
    client.db('users')
    await client.connect();
    await  listDatabases(client);
    return client
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

module.exports  = dbConnect
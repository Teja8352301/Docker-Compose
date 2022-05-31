const {MongoClient} = require('mongodb');
const dbConnect = async() =>{
    const uri = 'mongodb://mongodb:mongodb@mongo:27017'
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
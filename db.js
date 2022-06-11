const {MongoClient,ServerApiVersion } = require('mongodb');
const dbConnect = async(isProduction) =>{
    let uri = 'mongodb://mongodb:mongodb@mongo:27017'
    // let uri = 'mongodb+srv://Teja:w1J9teVj2hcaIsM9@cluster0.zl9y0.mongodb.net/?retryWrites=true&w=majority'
    // if(isProduction == 'true'){
    //     uri = 'mongodb+srv://Teja:w1J9teVj2hcaIsM9@cluster0.zl9y0.mongodb.net/?retryWrites=true&w=majority'
    // }
    console.log('url need to connect...',uri)
    const client = new MongoClient(uri,{ useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    // client.db('users')
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
const {MongoClient , ObjectId} = require ("mongodb")
const url =  "mongodb://localhost:27017"
const client = new MongoClient(url)

const dbName = "task-1"
async function addUser(){
    try {
        await client.connect()
        console.log("connected to DB successfully")
        const db = client.db(dbName)
        const users = db.collection("users")
        const result = await users.insertOne({
            name : "rawan" ,
            age : 24 , 
            city : "alex" 
        })  
        console.log("Inserted document id  :" , result.insertedId)
        await addNewUser(users)
        await addMany(users) 
        await findUser(users ,"69b850027705aebb3eb782b0")
        await countUsers(users)
        await limitUsers(users)
        await findAllUsers(users)
        await updateUsers(users ,"69b844c70a59e2b509a5eb54")
        await updateManyUsers(users)
        await deleteUsers(users ,"69b83afe4e252b96a285b394")
        await deleteManyUsers(users)
    }
    catch (err){
        console.log(err)
    }
}
addUser()
////////////////////////////////////////////////////////////////////////
async function addNewUser(users){
    const result = await users.insertOne({
        name : "ahmed" ,
        age : 31 ,
        city : "alex"
    })
 console.log(" INserted documents id  :" , result.insertedId)
} 
async function addMany(users){
    const result = await users.insertMany([
        {
         name : "zyad" ,
         age : 18 ,
         city : "alex"   
        },
        {
         name : "marwan" ,
         age : 19 ,
         city : "alex" 
        },
         {
         name : "moaman" ,
         age : 19 ,
         city : "tanta" 
        },
         {
         name : "maryam" ,
         age : 20 ,
         city : "cairo" 
        },
         {
         name : "yousef" ,
         age : 21 ,
         city : "alex" 
        },
         {
         name : "karem" ,
         age : 27 ,
         city : "cairo" 
        },
         {
         name : "mayar" ,
         age : 27,
         city : "alex" 
        },
         {
         name : "mohamed" ,
         age : 27 ,
         city : "cairo" 
        },
         {
         name : "gehad" ,
         age : 27 ,
         city : "alex" 
        },
         {
         name : "alaa" ,
         age : 27,
         city : "tanta" 
        }

    ])
    console.log("INserted documents :" , result.insertedCount)
}


async function findUser(users , id){
    const user = await users.findOne({ _id : new ObjectId(id)})
    if(users){
        console.log("found user :" , user)
    }
    else{
        console.log("user not found")
    }
}
async function  countUsers(users){
    const count = await users.countDocuments({ age : 27})
    console.log("Users with same age :" , count)
}

async function limitUsers(users){
    const data = await users.find({ age : 27}).limit(3).toArray()
    console.log("Limit Users :" , data)
}

async function findAllUsers(users){
    const data = await users.find({ age : 27}).toArray()
    console.log("Users :" , data)
}

async function updateUsers(users , id){
    const result = await users.updateOne(
        {_id : new ObjectId(id)},
        {
            $set: {name : "eman"},
            $inc: {age : 70}

        }

    )
    console.log("Modified :" , result.modifiedCount)

}

async function updateManyUsers(users){
    const result = await users.updateMany(
        {},
        {$inc: {age: 5 }}
    )
    console.log("Modified Docs :",result.modifiedCount )

}

async function deleteUsers(users , id){
    const result = await users.deleteOne(
        {_id: new ObjectId(id)}
    )
    console.log("Deleted Docs :",result.deletedCount)
}

async function deleteManyUsers(users){
    const result = await users.deleteMany({
        age : 32
})
console.log("Deleted Docs :",result.deletedCount)
}
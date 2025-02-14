const express = require("express")
const mongoose = require("mongoose")
const {buildSchema} = require('graphql')
const {graphqlHTTP} = require("express-graphql")
const UserModel = require('./model/User')
const app = express();
const SERVER_PORT = 4000

// Schema
const gqlSchema = buildSchema(
  `
    type Query{
      welcome: String,
      greet(name: String): String
      user: User
      users: [User]
      userId(uid: Int): User
    }

    type Mutation{
      addUser(uid: Int, firstname: String, lastname: String, salary: Float): User
    }

    type User{
      uid: Int
      firstname: String 
      lastname: String 
      salary: Float
    }

  `
)

// Root Resolver
const rootResolver = {
  welcome: () => {
    return "Welcome to GraphQL Examples"
  },
  greet: ({name}) => { // obj.name
    return `Hello, ${name}`
  },
  user: async () => {
    // const user = {
    //   uid: 1,
    //   fnm: "Ramtin",
    //   lnm: "Abolfazli",
    //   salary: 500.50
    // }
    const user = await UserModel.findOne({})
    console.log(user)
    return user
  },
  userId: async({ uid }) => {
    const userId = await UserModel.findOne({uid})
    console.log(userId)
    return userId
  },
  users: async () => {
  //   const users = [{
  //     uid: 1,
  //     fnm: "Ramtin",
  //     lnm: "Abolfazli",
  //     salary: 500.50
  //   },
  //   {
  //     uid: 2,
  //     fnm: "Sherry",
  //     lnm: "Ghavam",
  //     salary: 400.50
  //   }
  // ]
    const users = await UserModel.find({})
    return users
  },
  addUser: async (user) => {
    console.log(user)
    const {uid, firstname, lastname, salary} = user
    const newUser = UserModel({
      uid, 
      firstname: firstname, 
      lastname: lastname,
      salary: salary
    })
    await newUser.save()
    return newUser
  }
  
}

// GqlHttp Object
const graphqlMiddleware = graphqlHTTP({
  schema: gqlSchema,
  rootValue: rootResolver,
  graphiql: true
});

app.use("/graphql", graphqlMiddleware);


const connectDB = async() => {
  try{
    console.log("Attempting to connect to DB");

    mongoose.connect('mongodb+srv://Ramtin:Mongodb4030@cluster0.9zcim.mongodb.net/db_comp3133_employee?retryWrites=true&w=majority&appName=Cluster0',  {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    }).then(() => {
      console.log(`Mongo db connected.`)
    }).catch((err) => {
      console.error(err)
    })
  }catch(error){
    console.log(error)
  }
}
app.listen(SERVER_PORT, ()=>{
  console.log(`Server started`)
  connectDB()
  console.log('http://localhost:4000/graphql')
})
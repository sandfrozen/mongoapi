import express from 'express'
import graphqlHTTP from 'express-graphql'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'

import schema from './graphql/schema'

const PORT = process.env.PORT || '4000'
const db = 'mongodb+srv://tomek:tomek94@cluster0-bhkqc.gcp.mongodb.net/test?retryWrites=true'

//FIXES CORS ERROR
const whitelist = [
  // Allow domains here
  'http://localhost:3000',
];
const corsOptions = {
  origin(origin, callback){
    const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true
};

// Connect to MongoDB with Mongoose.
mongoose.connect(db,
  {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))

// cors(),
const app = express()
app.use(
  '/graphql',
  bodyParser.json(),
  cors(),
  graphqlHTTP({
    schema: schema,
    graphiql: true
  }))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
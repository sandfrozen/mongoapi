import express from 'express'
import graphqlHTTP from 'express-graphql'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'

import schema from './graphql/schema'
import {connection_string} from './mongodb/mongodb.js'

const PORT = process.env.PORT || '4000'

const db = connection_string

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
  cors(whitelist),
  graphqlHTTP({
    schema: schema,
    graphiql: false
  }))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

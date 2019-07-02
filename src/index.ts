import express from 'express'
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import {graphqlSchema} from './schema';

mongoose.connect("mongodb://localhost:27017/nodejs-first", { useNewUrlParser: true });

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    graphiql: true,

}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
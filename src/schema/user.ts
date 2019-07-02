import {GraphQLObjectType, GraphQLString} from 'graphql';

import {User} from '../db/user';
import {Schema, Types} from "mongoose";

export const userType = new GraphQLObjectType({
    name: 'User',
    description: 'Auth user',
    fields: () => ({
        id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString,
            description: 'The username',
        },
        group: {
            type: GraphQLString,
            description: 'The users group name',
        }
    }),
});

const query = {
};

const mutation = {
};

export const UserSchema = {
    query,
    mutation,
    types: [userType]
};
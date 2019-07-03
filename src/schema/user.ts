import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt
} from 'graphql';

import {getUsers, addUser, User} from '../db/user';

export const userType = new GraphQLObjectType({
    name: 'User',
    description: 'Auth user',
    fields: () => ({
        name: {
            type: GraphQLString,
            description: 'The username',
        },
        group: {
            type: GraphQLString,
            description: 'The users group name',
        },
    }),
});

const query = {
    users: {
        type: new GraphQLList(userType),
        args: {
            limit: {
                description: 'limit items in the results',
                type: GraphQLInt
            }
        },
        resolve: (limit: number) => getUsers(limit)
    },
};

const mutation = {
    addUser: {
        type: userType,
        args: {
            username: {
                type: new GraphQLNonNull(GraphQLString)
            },
            password: {
                type: new GraphQLNonNull(GraphQLString)
            },
        },
        resolve: (input: User) => addUser(input)
    },
};

export const UserSchema = {
    query,
    mutation,
    types: [userType]
};
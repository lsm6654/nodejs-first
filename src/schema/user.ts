import {
    GraphQLEnumType,
    GraphQLInterfaceType,
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt, GraphQLID
} from 'graphql';

import {getUsers, getUserById, getUserByName, addUser, User, UserModel} from '../db/user';
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
    users: {
        type: new GraphQLList(userType),
        args: {
            limit: {
                description: 'limit items in the results',
                type: GraphQLInt
            }
        },
        resolve: (_:any, args: any) => getUsers(args.limit)

    },
    userByUsername: {
        type: userType,
        args: {
            name: {
                description: 'find by username',
                type: GraphQLString
            }
        },
        resolve: (_:any, {name}:UserModel) => getUserByName(name)
    },
    userById: {
        type: userType,
        args: {
            _id: {
                description: 'find by id',
                type: GraphQLString
            }
        },
        resolve: (_:any, {_id}:UserModel) => getUserById(new Types.ObjectId(_id))

    },
};

const mutation = {
    addUser: {
        type: userType,
        args: {
            name: {
                type: new GraphQLNonNull(GraphQLString)
            },
            group: {
                type: new GraphQLNonNull(GraphQLString)
            },
        },
        resolve: (obj: string, input: UserModel) => addUser(new UserModel(input))
    },
};

export const UserSchema = {
    query,
    mutation,
    types: [userType]
};
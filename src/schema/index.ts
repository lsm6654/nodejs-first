import {
    GraphQLSchema,
    GraphQLObjectType,
} from 'graphql';

import { UserSchema } from './user';
import {MeetingRoomSchema} from "./meeting-room";
import {ReservationSchema} from "./reservation";

export const graphqlSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: () => Object.assign(
            UserSchema.query,
            MeetingRoomSchema.query,
            ReservationSchema.query,
        )
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: () => Object.assign(
            UserSchema.mutation,
            MeetingRoomSchema.mutation,
            ReservationSchema.mutation,
        )
    }),
    types: [
        ...UserSchema.types,
        ...MeetingRoomSchema.types,
        ...ReservationSchema.types
    ]
});
import {
    GraphQLEnumType,
    GraphQLInterfaceType,
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt
} from 'graphql';

import {Schema} from "mongoose";
import {GraphQLISODateTime} from "type-graphql";
import {
    ReservationModel,
    addReservation,
    getReservationByTimeBetween,
    getReservations,
    getReservationsByStartTimeAfter
} from "../db/reservation";
import {userType} from "./user";
import {meetingRoomType} from "./meeting-room";

const reservationType = new GraphQLObjectType({
    name: 'Reservation',
    fields: () => ({
        userId: {
            type: userType,
        },
        meetingRoomId: {
            type: meetingRoomType,
        },
        startTime: {
            type: GraphQLISODateTime,
        },
        endTime: {
            type: GraphQLISODateTime,
        }
    }),
});

const query = {
    reservationsThisWeek: {
        type: new GraphQLList(reservationType),
        resolve: () => {
            const curr = new Date();
            const first = curr.getDate() - curr.getDay();
            const firstday = new Date(curr.setDate(first));
            //TODO date 수정.
            return getReservationsByStartTimeAfter(firstday);
        }
    },

    reservations: {
        type: new GraphQLList(reservationType),
        args: {
            limit: {
                description: 'limit items in the results',
                type: GraphQLInt
            }
        },
        resolve: (limit: number) => getReservations(limit)
    },
    reservationByTimeBetween: {
        type: reservationType,
        args: {
            startTime: {
                type: GraphQLISODateTime
            },
            endTime: {
                type: GraphQLISODateTime
            }
        },
        resolve: (startTime: Date, endTime: Date) => getReservationByTimeBetween(startTime, endTime)
    }
};

const mutation = {
    addReservation: {
        type: reservationType,
        args: {
            userId: {
                type: new GraphQLNonNull(GraphQLString)
            },
            meetingRoomId: {
                type: new GraphQLNonNull(GraphQLString)
            },
            startTime: {
                type: new GraphQLNonNull(GraphQLISODateTime)
            },
            endTime: {
                type: new GraphQLNonNull(GraphQLISODateTime)
            }
        },
        resolve: (obj: any, input: any) => addReservation(new ReservationModel(input))
    }
};

export const ReservationSchema = {
    query,
    mutation,
    types: [reservationType]
};
import {GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql';

import {Schema} from "mongoose";
import {GraphQLISODateTime} from "type-graphql";
import {
    addReservation,
    getReservationByMeetingRoomIdAndTimeBetween,
    getReservationsByStartTimeAfter,
    removeReservation,
    ReservationModel
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
            const firstdayThisWeek = new Date(curr.setDate(first));
            const firstDayThisWeekWithTime = new Date(curr.getFullYear(), firstdayThisWeek.getMonth(), firstdayThisWeek.getDay());

            return getReservationsByStartTimeAfter(firstDayThisWeekWithTime).populate('userId').populate('meetingRoomId').exec();
        }
    },
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
        resolve: (obj: any, input: any) => {
            const reservation = addReservation(new ReservationModel(input));

            const promise = reservation.then( r => {
                return getReservationByMeetingRoomIdAndTimeBetween(r.meetingRoomId, r.startTime, r.endTime);
            }).then(r => {
                if (r.length > 1) {
                    const lastIndex = r.length -1;
                    throw removeReservation(r[lastIndex]._id);
                }
                return reservation;
            }).catch(function (e) {
                throw "duplicated reservation error occurred";
            });

            return promise;
        }
    }
};

export const ReservationSchema = {
    query,
    mutation,
    types: [reservationType]
};
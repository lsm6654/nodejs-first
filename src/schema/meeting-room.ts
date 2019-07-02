import {GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString} from 'graphql';

import {Schema} from "mongoose";
import {getMeetingRooms, MeetingRoom} from "../db/meetingRoom";
import {getReservationByTimeBetween} from "../db/reservation";

export const meetingRoomType = new GraphQLObjectType({
    name: 'MeetingRoom',
    fields: () => ({
        name: {
            type: GraphQLString,
            description: 'The meetingRoom name',
        },
        size: {
            type: GraphQLInt,
            description: 'The meetingrooms size',
        },
    }),
});

const query = {
    emptyMeetingRoomsByTimeBetween: {
        type: new GraphQLList(meetingRoomType),
        args: {
            startDate: {
                type: GraphQLString
            },
            endDate: {
                type: GraphQLString
            },
        },
        resolve: (_: any, {startDate, endDate}: any) => {
            const reservations = getReservationByTimeBetween(new Date(startDate), new Date(endDate)).populate('meetingRoomId').exec();
            const meetingRooms = getMeetingRooms();

            return Promise.all([reservations, meetingRooms])
                .then(arr => {
                    const roomIds = arr[0].map(r => {
                        const room: any = r.meetingRoomId;
                        return room._id;
                    });

                    const notExistsMeetingRooms = arr[1].filter(meetingRoom => {
                        return roomIds.some(x => x != meetingRoom.id);
                    });

                    return notExistsMeetingRooms;
                });
        }
    },
};

const mutation = {
};

export const MeetingRoomSchema = {
    query,
    mutation,
    types: [meetingRoomType]
};
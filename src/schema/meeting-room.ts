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
import {addMeetingRoom, getMeetingRoomByName, getMeetingRooms, MeetingRoom, MeetingRoomModel} from "../db/meetingRoom";
import {getReservationsByStartTimeAfter} from "../db/reservation";

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
        resolve: (startDate: string) => {
            const date = new Date(startDate);
            //getReservationByTimeBetween()
        }
    },
    meetingRooms: {
        type: new GraphQLList(meetingRoomType),
        args: {
            limit: {
                description: 'limit items in the results',
                type: GraphQLInt
            }
        },
        resolve: (limit: number) => getMeetingRooms(limit)
    },
    meetingRoomByName: {
        type: meetingRoomType,
        args: {
            name: {
                description: 'find by meetingroom name',
                type: GraphQLString
            }
        },
        resolve: (name: string) => getMeetingRoomByName(name)
    }
};

const mutation = {
    addMeetingRoom: {
        type: meetingRoomType,
        args: {
            name: {
                type: new GraphQLNonNull(GraphQLString)
            },
            size: {
                type: new GraphQLNonNull(GraphQLInt)
            },
        },
        resolve: (obj: any, input: any) => addMeetingRoom(new MeetingRoomModel(input))
    }
};

export const MeetingRoomSchema = {
    query,
    mutation,
    types: [meetingRoomType]
};
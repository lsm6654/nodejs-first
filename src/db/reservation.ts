import { Schema, model, Document } from 'mongoose';
import * as mongoose from "mongoose";

export interface Reservation {
    userId: Schema.Types.ObjectId;
    meetingRoomId: Schema.Types.ObjectId;
    startTime: Date;
    endTime: Date;
}

export interface ReservationModel extends Reservation, Document {
}

const modelSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    meetingRoomId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'MeetingRoom'},
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
});

export const ReservationModel = model<ReservationModel>('Reservation', modelSchema);

export function getReservations(limit = 100) {
    return ReservationModel.find().limit(limit);
}

export function getReservationById(id: Schema.Types.ObjectId) {
    return ReservationModel.findOne({ _id: id });
}

export function getReservationByTimeBetween(startTime: Date, endTime: Date) {
    return ReservationModel.find({'startTime': {$gte: startTime}} && {'endTime': {$lte: endTime}});
}

export function getReservationByMeetingRoomIdAndTimeBetween(meetingRoomId: Schema.Types.ObjectId, startTime: Date, endTime: Date) {
    return ReservationModel.find({ $and: [{'meetingRoomId' : meetingRoomId}, {'startTime': {$gte: startTime}}, {'endTime': {$lte: endTime}}]});
}

export function getReservationsByStartTimeAfter(date: Date) {
    return ReservationModel.find({'startTime': {$gte: date}});
}

export function addReservation(input: Reservation) {
    return ReservationModel.create(input);
}

export function removeReservation(id: string) {
    return ReservationModel.findByIdAndRemove(id);
}
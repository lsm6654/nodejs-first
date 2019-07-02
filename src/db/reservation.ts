import { Schema, model, Document } from 'mongoose';
import * as mongoose from "mongoose";

export interface Reservation {
    userId: mongoose.Types.ObjectId;
    meetingRoomId: mongoose.Types.ObjectId;
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

export function getReservationsByStartTimeAfter(date: Date) {
    return ReservationModel.find({'startTime': {$gte: date}}).populate('userId').populate('meetingRoomId').exec();
}

export function addReservation(input: Reservation) {
    const rec = ReservationModel.create(input);
    return rec;
}

export function removeReservation(id: string) {
    return ReservationModel.findByIdAndRemove(id);
}
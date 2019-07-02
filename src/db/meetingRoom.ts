import { Schema, model, Document } from 'mongoose';

export interface MeetingRoom {
    name: string;
    size: number;
}

export interface MeetingRoomModel extends MeetingRoom, Document {
}

const modelSchema = new Schema({
    name: { type: String, required: true, createIndex: { unique: true }},
    size: { type: Number, required: true },
});

export const MeetingRoomModel = model<MeetingRoomModel>('MeetingRoom', modelSchema);

export function getMeetingRooms(limit = 100) {
    return MeetingRoomModel.find().limit(limit);
}

export function getMeetingRoomById(id: Schema.Types.ObjectId) {
    return MeetingRoomModel.findOne({ _id: id });
}

export function getMeetingRoomByName(name: string) {
    return MeetingRoomModel.findOne({ name });
}

export function addMeetingRoom(input: MeetingRoom) {
    return MeetingRoomModel.create(input);
}

export function removeMeetingRoom(id: string) {
    return MeetingRoomModel.findByIdAndRemove(id);
}
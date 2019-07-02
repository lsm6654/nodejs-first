import {Schema, model, Document, Types} from 'mongoose';
import * as mongoose from "mongoose";

export interface User {
    name: string;
    group: string;
}

export interface UserModel extends User, Document {
}

const userModelSchema = new Schema({
    name: { type: String, required: true},
    group: { type: String, required: true },
});

export const UserModel = model<UserModel>('User', userModelSchema);

export function getUsers(limit = 100) {
    return UserModel.find().limit(limit);
}

export function getUserById(id: Types.ObjectId) {
    return UserModel.findOne({ _id: id });
}

export function getUserByName(name: string) {
    return UserModel.findOne({ name: name});
}

export function addUser(input: User) {
    return UserModel.create(input);
}

export function removeUser(id: string) {
    return UserModel.findByIdAndRemove(id);
}
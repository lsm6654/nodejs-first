import {addUser, UserModel} from "./user";
import {addMeetingRoom, MeetingRoomModel} from "./meetingRoom";
import mongoose from 'mongoose';

// initiailze test data
mongoose.connect("mongodb://localhost:27017/nodejs-first", { useNewUrlParser: true });

const users = [];
for (let i=0; i< 20; i++) {
    users.push(new UserModel({name: "jess" + i , group: "group-" + Math.floor(i/10)}));
}
users.forEach(user => {
    addUser(user).then(r => console.log(r));
});


const sizeList = [4,6,8];
const meetingRooms = [];
for (let i=0; i<10; i++) {

    meetingRooms.push(new MeetingRoomModel({name: "room-"+i, size: sizeList[Math.floor(Math.random()*3)]}))
}
meetingRooms.forEach( room => {
    addMeetingRoom(room).then(r => console.log(r))
});

mongoose.disconnect();
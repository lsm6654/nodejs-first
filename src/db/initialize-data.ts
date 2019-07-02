import {addUser, UserModel} from "./user";
import {addMeetingRoom, MeetingRoomModel} from "./meetingRoom";

// initiailze test data

const users = [];
for (let i=0; i< 20; i++) {
    users.push(new UserModel({name: "jess" + i , group: "group-" + Math.floor(i/10)}));
}

users.forEach(user => {
    addUser(user);
});


const sizeList = [4,6,8];
const meetingRooms = [];
for (let i=0; i<10; i++) {

    meetingRooms.push(new MeetingRoomModel({name: "room-"+i, size: sizeList[Math.floor(Math.random()*3)]}))
}

meetingRooms.forEach( room => {
    addMeetingRoom(room);
})
import React, { useState, useEffect } from "react";
import { Socket } from "phoenix-socket";

var socket;
var room;
var channel;
var notesdata = [];

var currentUser = "<%= user_id%>";
var currentRoom = "test";

export function socketConnection() {
  socket = new Socket("wss://sphxchat.herokuapp.com/socket", {});
  socket.connect();
  channel = socket.channel("room:" + currentRoom, {});
  channel.join().receive("ok", (resp) => {
    console.log("Joined successfully", resp);
  });

  channel.on("notes", function (data) {
    console.log(data);
  });
}

export function pullData() {
  channel.on("notes", function (data) {
    console.log(data);
    notesdata.push(data);
  });
  return notesdata;
}

export function pushData(message) {
  if (message.image !== "") {
    channel.push("notes", {
      name: message.title && message.title !== "" ? message.title : "Untitled",
      notes: message.notes,
      created: currentUser,
      room: currentRoom,
      image: message.image,
      bgcolor: message.bgcolor,
    });
  } else {
    channel.push("notes", {
      name: message.title && message.title !== "" ? message.title : "Untitled",
      notes: message.notes,
      created: currentUser,
      room: currentRoom,
      bgcolor: message.bgcolor,
    });
  }
}

export function updateData(Notes, i) {
  channel.push("editnotes", {
    name: Notes.Items[i].name || "Untitled",
    notes: Notes.Items[i].notes,
    updated: currentUser,
    created: Notes.Items[i].created,
    room: currentRoom,
    image: Notes.Items[i].image,
    bgcolor: Notes.Items[i].bgcolor,
    id: Notes.Items[i].id,
  });
}

export function deleteData(item) {
  channel.push("deletenotes", item);
}
export function duplicateData(item) {
  channel.push("notes", {
    name: item.name,
    notes: item.notes,
    created: currentUser,
    room: item.room,
    image: item.image,
    bgcolor: item.bgcolor,
  });
}

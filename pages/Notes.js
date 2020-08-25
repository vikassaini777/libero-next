import React, { useState, useEffect } from "react";
import { Card, Dropdown } from "react-bootstrap";
import $ from "jquery";
// import { Socket } from "phoenix-socket";
import TextareaAutosize from "react-textarea-autosize";

import {
  pullData,
  pushData,
  updateData,
  deleteData,
  duplicateData,
  socketConnection,
} from "./socket.js";

function Notes() {
  const [message, setMessage] = useState({ bgcolor: "White", image: "" });
  const [Notes, setNotes] = useState({ Items: [] });
  // const [elementClass, setelementClass] = useState({ bodycolor: "" });

  const colors = [
    { name: "White", code: "#fff" },
    { name: "Red", code: "#f28b82" },
    { name: "Orange", code: "#fbbc04" },
    { name: "Yellow", code: "#fff475" },
    { name: "Green", code: "#ccff90" },
    { name: "Teal", code: "#a7ffeb" },
    { name: "Purple", code: "#d7aefb" },
    { name: "DarkBlue", code: "#aecbfa" },
  ];

  const textareaStyle = {
    resize: "none",
    padding: "9px",
    boxSizing: "border-box",
    outline: "0",
  };

  const CustomBtn = {
    width: "25px",
    height: "25px",
    padding: "0px",
    display: "inline-block",
  };

  // const [socket, setSocket] = useState(false);
  // const [channel, setChannel] = useState(false);
  // const socket = new Socket("wss://sphxchat.herokuapp.com/socket", {});
  // socket.connect();
  // var channel = socket.channel("room:" + currentRoom, {});
  // channel.join().receive("ok", (resp) => {
  //   console.log("Joined successfully", resp);
  // });
  var notesdata = [];
  useEffect(() => {
    socketConnection();
    reloadData();

    notesdata = pullData();
    // setNotes({ ...Notes, Items: pullData() });
    // channel.on("notes", function (data) {
    //   console.log(data);
    //   notesdata.push(data);
    //   setNotes({ ...Notes, Items: notesdata });
    // });
    // channel.on("editnotes", function (data) {
    //   console.log(data);
    // });
    // channel.on("deletenotes", function (data) {
    //   console.log(data);
    // });
    // if (!socket) {
    //   setSocket(new Socket("wss://sphxchat.herokuapp.com/socket", {}));
    // }
    // if (!socket && !channel) {
    //   // socket.connect();
    //   console.log("test", socket);
    //   // setChannel(socket.channel("room:" + currentRoom, {}));
    // }
    // socket == {} && setSocket(new Socket("wss://sphxchat.herokuapp.com/socket", {}));
    // let socket = new Socket("wss://sphxchat.herokuapp.com/socket", {});
    // socket.connect();
    // var channel = socket.channel("room:" + currentRoom, {});
    // !channel && setChannel(socket.channel("room:" + currentRoom, {}))
  }, []);
  const reloadData = () => {
    setTimeout(() => {
      console.log(pullData());
      setNotes({ Items: pullData() });
    }, 6000);
  };
  // console.log(socket);
  // if (channel) {
  //   console.log(channel);
  //   channel.join().receive("ok", (resp) => {
  //     console.log("Joined successfully", resp);
  //   });
  //   channel.on("notes", function (data) {
  //     console.log(data);
  //     notesdata.push(data);
  //     setNotes({ ...Notes, Items: notesdata });
  //   });
  //   channel.on("editnotes", function (data) {
  //     console.log(data);
  //   });
  //   channel.on("deletenotes", function (data) {
  //     console.log(data);
  //   });
  // }

  const changeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    // setMessage({ ...message, [nam]: val });
    console.log(message);
    setMessage({ ...message, [nam]: val });
  };

  const changeColor = (e) => {
    let bodycolor = e.currentTarget.getAttribute("title");
    console.log(bodycolor);

    setMessage({ ...message, bgcolor: bodycolor });
  };

  const onFileUpload = (e) => {
    const filesList = e.target.files;
    console.log(filesList);
    setMessage({ ...message, image: filesList });
    if (filesList && filesList[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        // setMessage({ ...message, image: e.target.result });
        $(".uploaded").removeAttr("hidden").attr("src", e.target.result);
      };

      reader.readAsDataURL(filesList[0]);
      $(".cstm-close").removeClass("d-none");
    }
  };

  const onFileUpdate = (e) => {
    const filesList = e.target.files;
    console.log(filesList);
    setMessage({ ...message, image: filesList });
    if (filesList && filesList[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $(".uploaded").removeAttr("hidden").attr("src", e.target.result);
      };

      reader.readAsDataURL(filesList[0]);
      $(".cstm-close").removeClass("d-none");
    }
  };

  const removeImage = () => {
    $(".uploaded").removeAttr("src").attr("hidden", "hidden");
    $(".cstm-close").addClass("d-none");
  };

  const removeData = () => {
    setMessage({ ...message, title: "", notes: "", image: "", bgcolor: "" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.notes.length > 0) {
      // console.log(message);
      // setNotes({ Items: [...Notes.Items, message] });
      // console.log(Notes);

      pushData(message);
      reloadData();
      // channel.push("notes", {
      //   name:
      //     message.title && message.title !== "" ? message.title : "Untitled",
      //   notes: message.notes,
      //   created: currentUser,
      //   room: currentRoom,
      //   bgcolor: message.bgcolor,
      // });
    }
    setMessage({ ...message, title: "", notes: "", image: "", bgcolor: "" });
  };

  const onUpdate = (event, i) => {
    event.preventDefault();
    console.log(Notes.Items, i);
    updateData(Notes, i);
    reloadData();
    // channel.push("editnotes", {
    //   name: Notes.Items[i].name || "Untitled",
    //   notes: Notes.Items[i].notes,
    //   updated: currentUser,
    //   created: Notes.Items[i].created,
    //   room: currentRoom,
    //   image: Notes.Items[i].image,
    //   bgcolor: Notes.Items[i].bgcolor,
    //   id: Notes.Items[i].id,
    // });
  };
  const deleteNote = (e, item, i) => {
    console.log(Notes.Items, item);
    // channel.push("deletenotes", item);
    deleteData(item);
    reloadData();
  };

  const duplicateNote = (e, item) => {
    console.log(item);
    // channel.push("notes", {
    //   name: item.name,
    //   notes: item.notes,
    //   created: currentUser,
    //   room: item.room,
    //   image: item.image,
    //   bgcolor: item.bgcolor,
    // });
    duplicateData(item);
    reloadData();
    // Notes.Items.push(item);
  };
  const changeUpdateHandler = (event, i) => {
    let nam = event.target.name;
    let val = event.target.value;
    let newArray = [...Notes.Items];
    newArray[i] = { ...newArray[i], [nam]: val };
    setNotes({ Items: newArray });
  };
  const updateColor = (e, i) => {
    let bodycolor = e.currentTarget.getAttribute("title");
    console.log(bodycolor, i);
    let newArray = [...Notes.Items];
    newArray[i] = { ...newArray[i], bgcolor: bodycolor };
    setNotes({ Items: newArray });
  };
  return (
    <div>
      <div className="container">
        <div className="row">
          <Card
            className={
              message.bgcolor !== ""
                ? message.bgcolor.toLowerCase() +
                  " mt-4 mx-auto border-0 cstm-notes"
                : "mt-4 mx-auto border-0 cstm-notes"
            }
            style={{ width: "50%", borderRadius: "10px" }}
          >
            <Card.Body>
              <form onSubmit={handleSubmit}>
                <button
                  type="button"
                  className="close d-none cstm-close"
                  onClick={removeImage}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <img className="uploaded img-fluid" alt="" hidden />
                <input
                  style={{ outline: "0" }}
                  type="text"
                  name="title"
                  className="border-0 p-2 title w-100 bg-transparent"
                  placeholder="Title"
                  value={message.title}
                  onChange={changeHandler}
                />
                <TextareaAutosize
                  minRows="5"
                  style={textareaStyle}
                  name="notes"
                  className="border-0 p-2 notes w-100 bg-transparent"
                  placeholder="Take a Note..."
                  value={message.notes}
                  onChange={changeHandler}
                />
                <Card.Footer className="bg-none">
                  <div className="d-flex align-items-center">
                    <Dropdown>
                      <Dropdown.Toggle
                        variant=""
                        type="button"
                        className="rounded-circle cstm-btn"
                        id="hoverColors"
                      ></Dropdown.Toggle>
                      <Dropdown.Menu className="w-25 p-3">
                        {colors.map((item, index) => {
                          return (
                            <button
                              key={index}
                              type="button"
                              style={CustomBtn}
                              value={item.code}
                              className={
                                item.name.toLowerCase() +
                                " rounded-circle dropdown-item"
                              }
                              title={item.name}
                              onClick={changeColor}
                            ></button>
                          );
                        })}
                      </Dropdown.Menu>
                    </Dropdown>

                    <div>
                      <input
                        type="file"
                        name="uploadimage"
                        onChange={onFileUpload}
                        hidden
                      />
                      <button
                        id="uplaodimage"
                        className="cstm-btn image-btn"
                        onClick={(event) => {
                          let id = event.currentTarget.getAttribute("id");
                          if (id == "uplaodimage") {
                            $("input[name='uploadimage']").click();
                          }
                        }}
                        type="button"
                      ></button>
                    </div>
                    <div className="ml-auto">
                      <button
                        className="btn custom-btn mx-1 save"
                        type="submit"
                      >
                        Save
                      </button>
                      <button
                        className="btn custom-btn mx-1 cancel"
                        type="button"
                        onClick={removeData}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Card.Footer>
              </form>
            </Card.Body>
          </Card>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row m-3">
          <div className="card-columns">
            {Notes.Items.map((item, index) => {
              return (
                <Card
                  key={index}
                  className={
                    item.bgcolor !== "" && item.bgcolor !== null
                      ? item.bgcolor.toLowerCase() +
                        " mt-4 mx-auto border-0 cstm-notes"
                      : "mt-4 mx-auto border-0 cstm-notes"
                  }
                  style={{ borderRadius: "10px" }}
                >
                  <Dropdown className="menu-section">
                    <Dropdown.Toggle variant="" id="menu" aria-expanded="false">
                      <div className="dot"></div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      className="w-25 p-3"
                      x-placement="bottom-start"
                      style={{
                        position: "absolute",
                        willChange: "transform",
                        top: "0px",
                        left: "0px",
                        transform: "translate3d(0px, 20px, 0px)",
                      }}
                    >
                      <a
                        className="dropdown-item copy"
                        onClick={(e) => duplicateNote(e, item)}
                      >
                        Make a copy
                      </a>
                      <a
                        className="dropdown-item delete"
                        onClick={(e) => deleteNote(e, item, index)}
                      >
                        Delete
                      </a>
                    </Dropdown.Menu>
                  </Dropdown>

                  <Card.Body>
                    <form onSubmit={(e) => onUpdate(e, index)}>
                      <button
                        type="button"
                        className="close d-none cstm-close"
                        onClick={removeImage}
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>

                      <img className=" img-fluid" src={item.image} />
                      <input
                        style={{ outline: "0" }}
                        type="text"
                        name="name"
                        className="border-0 p-2 title w-100 bg-transparent"
                        placeholder="Title"
                        value={item.name}
                        onChange={(e) => changeUpdateHandler(e, index)}
                      />
                      <TextareaAutosize
                        minRows="5"
                        style={textareaStyle}
                        name="notes"
                        className="border-0 p-2 notes w-100 bg-transparent"
                        placeholder="Take a Note..."
                        value={item.notes}
                        onChange={(e) => changeUpdateHandler(e, index)}
                      />
                      <Card.Footer className="bg-none">
                        <div className="d-flex align-items-center">
                          <Dropdown>
                            <Dropdown.Toggle
                              variant=""
                              id="dropdown-basic"
                              className="rounded-circle cstm-btn hoverColors"
                            ></Dropdown.Toggle>
                            <Dropdown.Menu className="w-25 p-3">
                              {colors.map((color, i) => {
                                return (
                                  <button
                                    key={i}
                                    type="button"
                                    value={color.code}
                                    className={
                                      color.name.toLowerCase() +
                                      " rounded-circle cstm-btn dropdown-item"
                                    }
                                    title={color.name}
                                    onClick={(e) => updateColor(e, index)}
                                  ></button>
                                );
                              })}
                            </Dropdown.Menu>
                          </Dropdown>

                          <div>
                            <input
                              type="file"
                              name="updateimage"
                              onChange={(e) => onFileUpdate(e, index)}
                              hidden
                            />
                            <button
                              id="updateimage"
                              className="rounded-circle cstm-btn image-btn"
                              onClick={(event) => {
                                let id = event.currentTarget.getAttribute("id");
                                if (id == "updateimage") {
                                  $("input[name='updateimage']").click();
                                }
                              }}
                              type="button"
                            ></button>
                          </div>
                          <div className="ml-auto">
                            <button
                              className="btn custom-btn mx-1 save"
                              type="submit"
                            >
                              Save
                            </button>
                            <button
                              className="btn custom-btn mx-1 cancel"
                              type="button"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </Card.Footer>
                    </form>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notes;

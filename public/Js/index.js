$(document).ready(function() {
  popFriend();
  popRoomList();
});
let friends = [];

let userDetails = JSON.parse(localStorage.getItem("userData"));

function popRoomList() {
  $.ajax({
    method: "GET",
    url: `https://tokyochatappdb.herokuapp.com/chatroom?adminId=${userDetails.id}`
  }).done(function(result) {
    if (result.length) {
      result.forEach(element => {
        $("#roomList").prepend(
          ` <li class="list-group-item"> <a href="ChatRoom.html"
                                        onclick="storeRoomDetails(${element.id},'${element.roomName}','${element.roomPurpose}')">${element.roomName}</a>
                                </li>`
        );
      });
    } else {
      $.ajax({
        method: "GET",
        url: `https://tokyochatappdb.herokuapp.com/chatroomMembers?memId=${userDetails.id}`
      }).done(function(result) {
        if (result.length) {
          result.forEach(element => {
            $("#roomList").prepend(
              ` <li class="list-group-item"> <a href="ChatRoom.html" onclick="storeRoomDetails(${element.roomId},'${element.roomName}','${element.roomPurpose}')">${element.roomName}</a> </li>`
            );
          });
        }
      });
    }
  });
}

function popFriend() {
  showSpinner();
  $.ajax({
    method: "GET",
    url: `https://tokyochatappdb.herokuapp.com/friends?userId=${userDetails.id}`
  }).done(function(res) {
    if (res.length) {
      $(".empty").hide();
      res.forEach(element => {
        $("#friendList").append(`<li
                                    class="list-group-item d-flex justify-content-between align-items-center"
                                    >
                                    <a href="#" class="chats" onclick="showProfile(${
                                      element.friendId
                                    })" data-toggle="tooltip" data-placement="top"
         title="View profile details"><img
                                            src="../img/login_icon.png" alt="..."
                                            class="profile-img">${
                                              element.name
                                            }</a>

                                    <a href="#" onclick="addToChats(${
                                      element.friendId
                                    })"><span class="badge"
                                            data-toggle="tooltip" data-placement="top" title="Add to chats"><i
                                                class="far fa-comment-alt"></i>
                                        </span></a>
                                    <a href=""><span class="badge" data-toggle="tooltip" data-placement="top"
                                            title="Unfriend" onclick="unfriend(${
                                              element.userId
                                            },${element.friendId},${
          element.id
        },'${element.name.split(" ")[0]}')"> <i
                                                class="fas fa-trash"></i> </span></a>
                                </li>`);
        $("#members").append(
          `<option id="${element.friendId}" value="${element.name}">${element.name}</option>`
        );
        friends.push({ friendName: element.name, friendId: element.friendId });
      });
      $('[data-toggle="tooltip"]').tooltip();
    }
  });
  $.ajax({
    method: "GET",
    url: `https://tokyochatappdb.herokuapp.com/friends?friendId=${userDetails.id}`
  }).done(function(res) {
    if (res.length) {
      $(".empty").hide();
      res.forEach(element => {
        $.ajax({
          method: "GET",
          url: `https://tokyochatappdb.herokuapp.com/users/${element.userId}`
        }).done(function(result) {
          $("#friendList").append(`<li
                                             class="list-group-item d-flex justify-content-between align-items-center"
                                             id="${result.id}" >
                                             <a href="#" class="chats" onclick="showProfile(${result.id})" data-toggle="tooltip" data-placement="top"
         title="View profile details"><img
                                                     src="../img/login_icon.png" alt="..."
                                                     class="profile-img">${result.firstname} ${result.lastname}</a>

                                             <a href="#" onclick="addToChats(${result.id})"><span
                                                     class="badge" data-toggle="tooltip"
                                                     data-placement="top" title="Add to chats"><i
                                                         class="far fa-comment-alt"></i>
                                                 </span></a>
                                             <a href=""><span class="badge" data-toggle="tooltip" data-placement="top"
                                                     title="Unfriend" onclick="unfriend(${element.id},${element.friendId},${element.id},'${result.firstname}')"> 
                                                         <i class="fas fa-trash"></i> </span></a>
                                         </li>`);
          $("#members").append(
            `<option id="${result.id}" value="${result.firstname} ${result.lastname}">${result.firstname} ${result.lastname}</option>`
          );
          friends.push({
            friendName: result.firstname + " " + result.lastname,
            friendId: result.id
          });
          $('[data-toggle="tooltip"]').tooltip();
        });
      });
    }
  });
  // if (document.getElementById(friendList).innerHTML == "") {
  //   $(".empty").hide();
  // }
  $('[data-toggle="tooltip"]').tooltip();
}

$("#menuIcon").click(function() {
  $("#newSide").css("width", "250px");
});
$(".closeNav").click(function() {
  $("#newSide").css("width", "0");
});

var modal = document.getElementById("newSide");
var btn = document.getElementById("menuIcon");

window.onclick = function(event) {
  if (event.target !== modal && event.target !== btn) {
    $("#newSide").css("width", "0");
  }
};

$("#roomForm").submit(function(e) {
  e.preventDefault();
  let name, id, roomName, roomPurpose, roomObj, memData, adminData;
  let selectedFriends = Array.from(document.getElementsByClassName("sFriends"));

  roomName = $("#chatroomName").val();
  roomPurpose = $("#purpose").val();
  roomObj = {
    roomName,
    roomPurpose,
    adminId: userDetails.id
  };
  $.ajax({
    method: "POST",
    url: "https://tokyochatappdb.herokuapp.com/chatroom",
    data: roomObj
  }).done(function(res) {
    adminData = {
      roomId: res.id,
      roomName: res.roomName,
      roomPurpose: res.roomPurpose,
      memName: userDetails.firstname + " " + userDetails.lastname,
      memId: userDetails.id
    };
    $.ajax({
      method: "POST",
      url: "https://tokyochatappdb.herokuapp.com/chatroomMembers",
      data: adminData
    }).done(function() {
      if (selectedFriends.length > 0) {
        for (let friend of selectedFriends) {
          name = friend.textContent.replace(/\u00D7/gi, "").trim();
          mId = friend.id;
          memData = {
            roomId: res.id,
            roomName: res.roomName,
            roomPurpose: res.roomPurpose,
            memName: name,
            memId: mId,
            adminId: userDetails.id
          };
          $.ajax({
            method: "POST",
            url: "https://tokyochatappdb.herokuapp.com/chatroomMembers",
            data: memData
          }).done(function() {
            location.reload();
          });
        }
      }
    });

    $(".createRoom").modal("hide");
    popFriend();
  });
});

function showProfile(id) {
  $.ajax({
    method: "GET",
    url: "https://tokyochatappdb.herokuapp.com/users/" + id,
    success: function(data) {
      $("#pName").text(`Name: ${data.firstname} ${data.lastname}`);
      $("#pLoc").text(`Location: ${data.state}, ${data.city}`);
      $("#pAge").text(`Age: ${data.age}`);
      $("#pStatus").text(`Status: ${data.description}`);
      $("#pGender").text(`Gender: ${data.gender}`);
      $(".details").modal("show");
    }
  });
}

$(".logoutBtn").click(function() {
  $(".logout").modal("show");
});
$(".btn-danger").click(function() {
  $("#index")[0].click();
});

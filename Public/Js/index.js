$(document).ready(function() {
  profileDetalis();
  popFriend();
});

function popFriend() {
  $.ajax({
    method: "GET",
    url: `http://localhost:3000/friends?userId=${userDetails.id}`
  }).done(function(res) {
    if (res.length) {
      $(".empty").hide();
      res.forEach(element => {
        console.log(element);
        $("#friendList").append(`<li
                                    class="list-group-item d-flex justify-content-between align-items-center"
                                    >
                                    <a href="#" class="chats" onclick="showProfile(${
                                      element.friendId
                                    })"><img
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
          `<option id="${element.friendId}">${element.name}</option>`
        );
      });
      $('[data-toggle="tooltip"]').tooltip();
    }
  });
  $.ajax({
    method: "GET",
    url: `http://localhost:3000/friends?friendId=${userDetails.id}`
  }).done(function(res) {
    if (res.length) {
      $(".empty").hide();
      res.forEach(element => {
        $.ajax({
          method: "GET",
          url: `http://localhost:3000/users/${element.userId}`
        }).done(function(result) {
          $("#friendList").append(`<li
                                             class="list-group-item d-flex justify-content-between align-items-center"
                                             id="${result.id}">
                                             <a href="#" class="chats" onclick="showProfile(${result.id})"><img
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
            `<option id="${result.id}">${result.firstname} ${result.lastname}</option>`
          );
          $('[data-toggle="tooltip"]').tooltip();
        });
      });
    }
  });
  $('[data-toggle="tooltip"]').tooltip();
}

function profileDetalis() {
  let userData = JSON.parse(localStorage.getItem("userData"));
  $(".username").text(`Name: ${userData.firstname} ${userData.lastname}`);
  $(".userdes").text(`Description: ${userData.description}     `);
  $(".userdes").append(
    `<a href="editProfile.html"><i class="fas fa-pencil-alt" data-toggle="tooltip" data-placement="top" title="Edit profile"></i></a>`
  );

  // $('[data-toggle="tooltip"]').tooltip();
  $(".userLoc").text(`Location: ${userData.city}, ${userData.state} `);
  $(".userAge").text(`Age: ${userData.age}`);

  //   console.log(userData);
}

function reject(id) {
  $.ajax({
    type: "GET",
    url: `http://localhost:3000/requestsRecieved/${id}`
  }).done(function(res) {
    console.log(res);
    let resEdit = {
      userId: 404,
      senderId: 404,
      firstname: null,
      lastname: null,
      age: null,
      state: null,
      city: null
    };
    $.ajax({
      method: "PATCH",
      url: `http://localhost:3000/requestsRecieved/${id}`,
      data: resEdit
    }).done(function() {
      $.ajax({
        method: "PATCH",
        url: `http://localhost:3000/requestsSent/${id}`,
        data: resEdit
      });
    });
  });
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

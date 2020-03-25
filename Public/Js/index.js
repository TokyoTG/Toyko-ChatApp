$(document).ready(function() {
  profileDetalis();
});

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
    console.log("e");
    $("#newSide").css("width", "0");
  }
};

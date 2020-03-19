$(document).ready(function() {
  profileDetalis();
});
function profileDetalis() {
  let userData = JSON.parse(localStorage.getItem("userData"));
  $(".username").text(`Name: ${userData.firstname} ${userData.lastname}`);
  $(".userdes").text(`Description: ${userData.description}     `);
  $(".userdes").append(
    `<a href="editProfile.html"><i class="fas fa-pencil-alt"ata-toggle="tooltip" data-placement="top" title="Edit profile"></i></a>`
  );
  $("main").append(
    '<a href="editProfile.html" class="editP-link" style="display:none">link</a>'
  );

  // $('[data-toggle="tooltip"]').tooltip();
  $(".userLoc").text(`Location: ${userData.city}, ${userData.state} `);
  $(".userAge").text(`Age: ${userData.age}`);
  //   console.log(userData);
}

// $(".fa-pencil-alt").click(function(e) {
//   e.preventDefault();
//   console.log("ok");
//   $(".editP-link")[0].click();
// });

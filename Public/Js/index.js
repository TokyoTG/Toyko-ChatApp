$(document).ready(function profileDetalis() {
  let userData = JSON.parse(localStorage.getItem("userData"));
  $(".username").text(`Name: ${userData.firstname} ${userData.lastname}`);
  $(".userdes").text(`Description: ${userData.description}     `);
  $(".userdes").append(
    `<i class="fas fa-pencil-alt" data-toggle="tooltip" data-placement="top" title="Edit profile"></i>`
  );
  // $('[data-toggle="tooltip"]').tooltip();
  $(".userLoc").text(`Location: ${userData.city}, ${userData.state} `);
  $(".userAge").text(`Age: ${userData.age}`);
  //   console.log(userData);
});

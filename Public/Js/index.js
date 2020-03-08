$(document).ready(function profileDetalis() {
  let userData = JSON.parse(localStorage.getItem("userData"));
  $(".username").text(`Name: ${userData.firstname} ${userData.lastname}`);
  $(".userdes").text(`Description: ${userData.description}`);
  $(".userLoc").text(`Location: ${userData.state}, ${userData.city}`);
  $(".userAge").text(`Age: ${userData.age}`);
  //   console.log(userData);
});

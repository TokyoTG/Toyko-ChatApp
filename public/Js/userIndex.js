$(document).ready(function() {
  getStates();
});

function getStates() {
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/states",
    success: function(data) {
      data.forEach(element => {
        $("#state").append(`<option value="${element}">${element}</option>`);
      });
    }
  });
}

$.validator.addMethod(
  "emailCustom",
  function(value, element) {
    return (
      this.optional(element) || /[a-z0-9.-]+@[a-z-]+\.(com|ng|net)/i.test(value)
    );
  },
  "Please enter a correct email"
);

$.validator.addMethod("removeSpace", function(value) {
  return (value = $.trim(value));
});
$.validator.addMethod(
  "phoneNG",
  function(value, element) {
    return this.optional(element) || /(081|080|090|070)\d{8}$/.test(value);
  },
  "Please enter a correct number"
);

let selectedState = $("#state");
$("#state").change(function() {
  getCities();
});

function getCities() {
  let state = selectedState[0].value;
  $("#city").html("");
  if (state !== "") {
    $.ajax({
      type: "GET",
      url: "http://localhost:3000/cities",
      success: function(data) {
        data[state].forEach(element => {
          $("#city").append(`<option>${element}</option>`);
        });
      }
    });
  }
}

var checkBox = document.getElementById("check1");
checkBox.addEventListener("change", function(e) {
  e.preventDefault();
  if (checkBox.checked == true) {
    $("#inputPassword").attr("type", "text");
    $("#password").attr("type", "text");
  } else {
    $("#inputPassword").attr("type", "password");
    $("#password").attr("type", "password");
  }
});

$("#userReg").validate({
  rules: {
    firstname: {
      required: true,
      rangelength: [2, 20],
      lettersonly: true,
      normalizer: function(value) {
        return $.trim(value);
      }
    },
    lastname: {
      required: true,
      lettersonly: true,
      rangelength: [2, 20]
    },
    phone: {
      required: true,
      number: true,
      phoneNG: true,
      normalizer: function(value) {
        return $.trim(value);
      }
    },
    email: {
      required: true,
      emailCustom: true,
      normalizer: function(value) {
        return $.trim(value);
      }
    },
    age: {
      required: true,
      number: true,
      range: [10, 90],
      normalizer: function(value) {
        return $.trim(value);
      }
    },
    gender: {
      required: true,
      normalizer: function(value) {
        return $.trim(value);
      }
    },
    state: {
      required: true
    },
    city: {
      required: true
    },
    description: {
      required: true,
      rangelength: [20, 100],
      normalizer: function(value) {
        return $.trim(value);
      }
    },
    password: {
      required: true,
      minlength: 8,
      maxlength: 20,
      nowhitespace: true
    },
    password2: {
      required: true,
      equalTo: "#password"
    }
  },
  submitHandler: function() {
    let data = $("#userReg").serializeArray();
    let res = {};
    let cap;
    data.forEach(el => {
      if (el.name !== "password") {
        res[el.name] = $.trim(el.value.toLocaleLowerCase());
      } else {
        res[el.name] = el.value;
      }
    });
    $.ajax({
      method: "POST",
      url: "http://localhost:3000/users",
      data: res
    });
    return false;
  }
});

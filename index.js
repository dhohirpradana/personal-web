document.addEventListener("DOMContentLoaded", function () {
  // When the user scrolls the page, execute myFunction
  window.onscroll = function () {
    stickyNavBar();
  };

  // Get the navbar
  var navbar = document.getElementById("navbar");

  // Get the offset position of the navbar
  var sticky = navbar.offsetTop;

  // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
  function stickyNavBar() {
    if (window.pageYOffset >= sticky) {
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
    }
  }
});

function submitForm() {
  var mail = "contact@dhohirpradana.com";

  let name = document.getElementById("input-name").value;
  let email = document.getElementById("input-email").value;
  let phone = document.getElementById("input-phone").value;
  let subject = document.getElementById("select-subject").value;
  let message = document.getElementById("input-message").value;

  if (name == "") {
    alert("Name tidak boleh kosong!");
    document.getElementById("input-name").focus();
    return false;
  }
  if (email == "") {
    alert("Email tidak boleh kosong!");
    document.getElementById("input-email").focus();
    return false;
  } else {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(mailformat)) {
      if (phone == "") {
        alert("Number Phone tidak boleh kosong!");
        document.getElementById("input-phone").focus();
        return false;
      }
      if (subject == "") {
        alert("Subject tidak boleh kosong!");
        document.getElementById("select-subject").focus();
        return false;
      }
      if (message == "") {
        alert("Message tidak boleh kosong!");
        document.getElementById("input-message").focus();
        return false;
      }
      sendMail();
    } else {
      alert("Email harus valid!");
      document.getElementById("input-email").focus();
      return false;
    }
  }
  function sendMail() {
    let a = document.createElement("a");
    a.href = "mailto:" + mail + "?subject=" + subject + "&body=" + message;
    a.click();
  }
}

(function () {
  var form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var honey = form.querySelector('[name="company_url"]');
    if (honey && honey.value) return;

    var status = document.getElementById("form-status");
    var name = form.querySelector('[name="name"]').value.trim();
    var email = form.querySelector('[name="email"]').value.trim();
    var subject = form.querySelector('[name="subject"]').value.trim();
    var message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !subject || !message) {
      status.textContent = "Please complete every field before sending.";
      status.classList.add("show");
      return;
    }

    var body = [
      "Name: " + name,
      "Email: " + email,
      "",
      message,
    ].join("\r\n");

    var mailto =
      "mailto:lodigital@support.com?subject=" +
      encodeURIComponent("[LO Digital] " + subject) +
      "&body=" +
      encodeURIComponent(body);

    status.textContent =
      "Your message is ready. Your email application will open so you can send it to lodigital@support.com.";
    status.classList.add("show");
    window.location.href = mailto;
    form.reset();
  });
})();

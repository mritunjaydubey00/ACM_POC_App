export function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll("input[required], select[required]");

  inputs.forEach((input) => {
    const group = input.closest(".input-group");

    if (input.type === "radio") {
      const checkedRadio = form.querySelector(
        `input[name="${input.name}"]:checked`,
      );
      if (!checkedRadio) {
        group.classList.add("invalid");
        isValid = false;
      } else {
        group.classList.remove("invalid");
      }
    } else if (input.id === "phone") {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(input.value.trim())) {
        group.classList.add("invalid");
        isValid = false;
      } else {
        group.classList.remove("invalid");
      }
    } else if (!input.value.trim()) {
      group.classList.add("invalid");
      isValid = false;
    } else {
      group.classList.remove("invalid");
    }
  });

  return isValid;
}

export function clearValidationState(form) {
  form
    .querySelectorAll(".input-group")
    .forEach((group) => group.classList.remove("invalid"));
}

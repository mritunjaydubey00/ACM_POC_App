export function initializeDialog(dialog) {
  dialog
    .querySelector(".dialog-close")
    .addEventListener("click", () => dialog.close());
}

export function showDialog(dialog, message, type) {
  const title = dialog.querySelector("#dialogTitle");
  const content = dialog.querySelector(".dialog-content");

  title.textContent =
    type === "success" ? "Registration successful" : "Registration issue";
  dialog.querySelector("#dialogMessage").textContent = message;
  content.className = `dialog-content ${type}`;

  if (!dialog.open) {
    dialog.showModal();
  }
}

export function setLoadingState(submitButton, loading) {
  const buttonText = submitButton.querySelector(".btn-text");
  const spinner = submitButton.querySelector(".spinner");

  submitButton.disabled = loading;
  buttonText.textContent = loading ? "Submitting..." : "Submit Registration";
  spinner.classList.toggle("hidden", !loading);
}

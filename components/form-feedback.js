export function showToast(toast, message, type) {
  toast.textContent = message;
  toast.className = `toast ${type}`;
}

export function hideToast(toast) {
  toast.className = "toast hidden";
}

export function setLoadingState(submitButton, loading) {
  const buttonText = submitButton.querySelector(".btn-text");
  const spinner = submitButton.querySelector(".spinner");

  submitButton.disabled = loading;
  buttonText.textContent = loading ? "Submitting..." : "Submit Registration";
  spinner.classList.toggle("hidden", !loading);
}

import {
  clearValidationState,
  validateForm,
} from "./form-validation.js";
import {
  hideToast,
  setLoadingState,
  showToast,
} from "./form-feedback.js";

// Replace this with the deployed Google Apps Script web app URL.
const GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzgPCv6JoWDhPH6y1Q9jjlP4niJyJ6ZGESWGO_Lcd9UAWF296smAZ66TTv2wR1htroo/exec";

export function initializeFormSubmission(form) {
  const submitButton = document.getElementById("submitBtn");
  const toast = document.getElementById("statusMessage");
  const branchSelect = document.getElementById("branch");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!validateForm(form)) {
      showToast(
        toast,
        "Please fix the highlighted fields before submitting.",
        "error",
      );
      return;
    }

    if (
      GOOGLE_APPS_SCRIPT_URL.includes(
        "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE",
      )
    ) {
      showToast(
        toast,
        "Deployment Error: Please configure your Google Apps Script Web App URL in form-submission.js",
        "error",
      );
      return;
    }

    setLoadingState(submitButton, true);
    hideToast(toast);

    const formData = new URLSearchParams();
    formData.append("name", document.getElementById("name").value.trim());
    formData.append("phone", document.getElementById("phone").value.trim());
    formData.append("year", document.getElementById("year").value);
    formData.append("section", document.getElementById("section").value.trim());
    formData.append("department", document.getElementById("department").value);
    formData.append("branch", branchSelect.value.trim());

    const acmMemberValue =
      document.querySelector('input[name="acmMember"]:checked')?.value || "No";
    formData.append("acmMember", acmMemberValue);

    try {
      const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.status === "success") {
        showToast(toast, "✓ Successfully registered with ACM MITS!", "success");
        form.reset();
        branchSelect.replaceChildren(
          new Option("Select a department first", "", true, true),
        );
        branchSelect.disabled = true;
        clearValidationState(form);
      } else {
        throw new Error(result.message || "Spreadsheet append failed.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      showToast(
        toast,
        "Submission failed. Please check your network or try again.",
        "error",
      );
    } finally {
      setLoadingState(submitButton, false);
    }
  });
}

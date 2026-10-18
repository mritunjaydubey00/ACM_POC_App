// REPLACE THIS WITH YOUR GOOGLE APPS SCRIPT WEB APP URL
const GOOGLE_APPS_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("acmForm");
  const submitBtn = document.getElementById("submitBtn");
  const btnText = submitBtn.querySelector(".btn-text");
  const spinner = submitBtn.querySelector(".spinner");
  const toast = document.getElementById("statusMessage");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast(
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
        "Deployment Error: Please configure your Google Apps Script Web App URL in script.js",
        "error",
      );
      return;
    }

    setLoadingState(true);
    hideToast();

    // Prepare payload matching URLSearchParams (solves CORS issues seamlessly)
    const formData = new URLSearchParams();
    formData.append("name", document.getElementById("name").value.trim());
    formData.append("phone", document.getElementById("phone").value.trim());
    formData.append("year", document.getElementById("year").value);
    formData.append("section", document.getElementById("section").value.trim());
    formData.append("department", document.getElementById("department").value);
    formData.append("branch", document.getElementById("branch").value.trim());

    const acmMemberVal =
      document.querySelector('input[name="acmMember"]:checked')?.value || "No";
    formData.append("acmMember", acmMemberVal);

    try {
      const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.status === "success") {
        showToast("✓ Successfully registered with ACM MITS!", "success");
        form.reset();
        clearValidationState();
      } else {
        throw new Error(result.message || "Spreadsheet append failed.");
      }
    } catch (err) {
      console.error("Submission Error:", err);
      showToast(
        "Submission failed. Please check your network or try again.",
        "error",
      );
    } finally {
      setLoadingState(false);
    }
  });

  // Basic Validation Logic
  function validateForm() {
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

  function clearValidationState() {
    form
      .querySelectorAll(".input-group")
      .forEach((group) => group.classList.remove("invalid"));
  }

  function setLoadingState(loading) {
    submitBtn.disabled = loading;
    if (loading) {
      btnText.textContent = "Submitting...";
      spinner.classList.remove("hidden");
    } else {
      btnText.textContent = "Submit Registration";
      spinner.classList.add("hidden");
    }
  }

  function showToast(message, type) {
    toast.textContent = message;
    toast.className = `toast ${type}`;
  }

  function hideToast() {
    toast.className = "toast hidden";
  }
});

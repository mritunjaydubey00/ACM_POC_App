import { initializeFormSubmission } from "./components/form-submission.js";
import { showToast } from "./components/form-feedback.js";

const form = document.getElementById("acmForm");
const departmentGroup = document
  .getElementById("department")
  .closest(".input-group");

initializeFormSubmission(form);

let departmentEnhancement;

function loadDepartmentEnhancement() {
  if (!departmentEnhancement) {
    departmentEnhancement = import("./components/department-select.js")
      .then(({ initializeDepartmentSelect }) => {
        initializeDepartmentSelect(
          document.getElementById("department"),
          document.getElementById("branch"),
        );
      })
      .catch((error) => {
        console.error("Department dropdown initialization failed:", error);
        showToast(
          "Department options could not be loaded. Please refresh the page.",
          "error",
        );
      });
  }

  return departmentEnhancement;
}

if ("IntersectionObserver" in window) {
  const departmentObserver = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        departmentObserver.disconnect();
        loadDepartmentEnhancement();
      }
    },
    { rootMargin: "500px" },
  );

  departmentObserver.observe(departmentGroup);
}

if ("requestIdleCallback" in window) {
  window.requestIdleCallback(loadDepartmentEnhancement, { timeout: 2000 });
} else {
  window.setTimeout(loadDepartmentEnhancement, 0);
}

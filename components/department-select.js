import { DEPARTMENT_BRANCHES } from "../department.js";

export function initializeDepartmentSelect(departmentSelect, branchSelect) {
  Object.keys(DEPARTMENT_BRANCHES).forEach((department) => {
    departmentSelect.add(new Option(department, department));
  });

  departmentSelect.addEventListener("change", () => {
    const branches = DEPARTMENT_BRANCHES[departmentSelect.value] || [];
    branchSelect.replaceChildren(
      new Option(
        branches.length ? "Select Branch" : "Select a department first",
        "",
        true,
        true,
      ),
    );
    branchSelect.options[0].disabled = true;

    branches.forEach((branch) => {
      branchSelect.add(new Option(branch, branch));
    });
    branchSelect.disabled = branches.length === 0;

    departmentSelect.closest(".input-group").classList.remove("invalid");
    branchSelect.closest(".input-group").classList.remove("invalid");
  });
}

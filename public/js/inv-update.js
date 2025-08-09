const form = document.querySelector("#updateForm");
if (form) {
  form.addEventListener("change", () => {
    const updateBtn = document.querySelector("#updateBtn");
    if (updateBtn) {
      updateBtn.removeAttribute("disabled");
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search");
  const tableRows = document.querySelectorAll("#accounts-table tbody tr");
  const accountCount = document.getElementById("account-count");

  searchInput.addEventListener("input", function () {
    let searchValue = searchInput.value.toLowerCase();
    let visibleCount = 0;

    tableRows.forEach(row => {
      const lastName = row.cells[1].textContent.toLowerCase();
      if (lastName.includes(searchValue)) {
        row.style.display = "";
        visibleCount++;
      } else {
        row.style.display = "none";
      }
    });

    accountCount.textContent = `${visibleCount} accounts found`;
  });
});


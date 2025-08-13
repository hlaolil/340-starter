document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search");
  const tableRows = document.querySelectorAll("#accounts-table tr");
  const accountCount = document.getElementById("account-count");
  const messageDiv = document.getElementById("message");

  if (searchInput && accountCount) {
    searchInput.addEventListener("input", function () {
      const searchValue = searchInput.value.toLowerCase();
      let visibleCount = 0;

      tableRows.forEach(row => {
        const lastName = row.cells[1]?.textContent.toLowerCase() || "";
        if (lastName.includes(searchValue)) {
          row.style.display = "";
          visibleCount++;
        } else {
          row.style.display = "none";
        }
      });

      accountCount.textContent = `${visibleCount} account${visibleCount === 1 ? "" : "s"} found`;
    });
  }

  window.deleteAccount = async function(accountId) {
    if (confirm('Are you sure you want to delete this account?')) {
      try {
        const response = await fetch('/accounts/delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ account_id: accountId })
        });

        if (response.redirected) {
          window.location.href = response.url; // Follow server redirect
        } else {
          const result = await response.json();
          if (messageDiv) {
            messageDiv.style.display = 'block';
            messageDiv.textContent = result.message;
            messageDiv.className = `message ${result.success ? 'message-success' : 'message-error'}`;
          } else {
            alert(result.message); // Fallback to alert
          }
        }
      } catch (error) {
        console.error('Error deleting account:', error);
        if (messageDiv) {
          messageDiv.style.display = 'block';
          messageDiv.textContent = 'An error occurred while deleting the account.';
          messageDiv.className = 'message message-error';
        } else {
          alert('An error occurred while deleting the account.');
        }
      }
    }
  };
});

const getNav = async () => {
  return [];
};
module.exports = { getNav };

// utilities/index.js
function formatUSD(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value)
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value)
}

function buildVehicleDetailHTML(data) {
  return `
    <div class="vehicle-detail">
      <img src="${data.inv_image}" alt="Image of ${data.inv_make} ${data.inv_model}">
      <h2>${data.inv_year} ${data.inv_make} ${data.inv_model}</h2>
      <p><strong>Price:</strong> ${formatUSD(data.inv_price)}</p>
      <p><strong>Mileage:</strong> ${formatNumber(data.inv_miles)} miles</p>
      <p><strong>Description:</strong> ${data.inv_description}</p>
      <p><strong>Color:</strong> ${data.inv_color}</p>
    </div>
  `
}

module.exports = {
  formatUSD,
  formatNumber,
  buildVehicleDetailHTML
}
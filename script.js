fetch('https://api.exchangerate.host/latest?base=USD')
  .then(response => {
    if (!response.ok) throw new Error("Network error");
    return response.json();
  })
  .then(data => {
    const rate = data.rates.EGP;
    document.getElementById("price").textContent = `1 USD = ${rate.toFixed(2)} EGP`;
  


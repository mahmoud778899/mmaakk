fetch('https://api.exchangerate.host/latest?base=USD')
  .then(response => {
    if (!response.ok) throw new Error("Network error");
    return response.json();
  })
  .then(data => {
    const rate = data.rates.EGP;
    document.getElementById("price").textContent = `1 USD = ${rate.toFixed(2)} EGP`;
  })
  .catch(error => {
    document.getElementById("price").textContent = "تعذر تحميل السعر";
    console.error("Error fetching data:", error);
  });

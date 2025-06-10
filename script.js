
fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://api.exchangerate.host/latest?base=USD'))
  .then(response => {
    if (!response.ok) throw new Error("Network response was not ok.");
    return response.json();
  })
  .then(data => {
    const parsedData = JSON.parse(data.contents);
    const rate = parsedData.rates.EGP;
    document.getElementById("price").textContent = `1 USD = ${rate.toFixed(2)} EGP`;
  })
  .catch(error => {
    document.getElementById("price").textContent = "تعذر تحميل السعر";
    console.error("حدث خطأ أثناء التحميل:", error);
  });

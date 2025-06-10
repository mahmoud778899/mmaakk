async function getRate(from = "USD", to = "EGP") {
  const res = await fetch(`https://api.exchangerate.host/latest?base=USD%27`)
  const data = await res.json();
  return data.rates[to];
}

async function convert() {
  const amount = document.getElementById("amount").value;
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const result = document.getElementById("result");

  if (!amount) {
    result.textContent = "من فضلك أدخل مبلغ صحيح";
    return;
  }

  try {
    const rate = await getRate(from, to);
    const converted = (amount * rate).toFixed(2);
    result.textContent = `${amount} ${from} = ${converted} ${to}`;
  } catch (e) {
    result.textContent = "حدث خطأ في الاتصال";
  }
}

(async () => {
  const rateText = document.getElementById("rate");
  try {
    const rate = await getRate("USD", "EGP");
    rateText.textContent = `💵 1 دولار = ${rate.toFixed(2)} جنيه مصري`;
  } catch {
    rateText.textContent = "تعذر تحميل السعر";
  }
})();

// script.js

const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amountInput = document.getElementById("amount");
const resultBox = document.getElementById("result");

// جلب قائمة العملات المتوفرة من CoinGecko
async function loadCoins() {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/list");
    const coins = await res.json();
    
    coins.forEach(coin => {
        const option1 = document.createElement("option");
        const option2 = document.createElement("option");
        option1.value = coin.id;
        option2.value = coin.id;
        option1.text = coin.name;
        option2.text = coin.name;
        fromCurrency.appendChild(option1);
        toCurrency.appendChild(option2);
    });

    // تحديد افتراضي
    fromCurrency.value = "bitcoin";
    toCurrency.value = "ethereum";
}

// تحويل العملات الرقمية
async function convert() {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amount = parseFloat(amountInput.value);

    if (!amount || amount <= 0) {
        resultBox.innerText = "الرجاء إدخال مبلغ صالح";
        return;
    }

    try {
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${from}&vs_currencies=${to}`;
        const res = await fetch(url);
        const data = await res.json();
        const rate = data[from][to];

        if (rate) {
            const converted = amount * rate;
            resultBox.innerText = `${amount} ${from} = ${converted.toFixed(6)} ${to}`;
        } else {
            resultBox.innerText = "لم يتم العثور على سعر التحويل.";
        }
    } catch (error) {
        console.error(error);
        resultBox.innerText = "حدث خطأ أثناء التحويل.";
    }
}

document.getElementById("convertBtn").addEventListener("click", convert);

loadCoins();
  


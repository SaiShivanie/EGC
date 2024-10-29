const currencyEL_one = document.getElementById("currency-one")
const currencyEL_two = document.getElementById("currency-two")
const amountEL_one = document.getElementById("amount-one")
const amountEL_two = document.getElementById("amount-two")
const rateEL = document.getElementById("rate")
const swap = document.getElementById("swap")

async function calculate() {
    const currency_one = currencyEL_one.value ;
    const currency_two = currencyEL_two.value 

    try {
        const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`) 

        const data = await res.json()

        console.log(data);

        const rate = data.rates[currency_two]
        rateEL.innerHTML = `1 ${currency_one} = ${rate} ${currency_two}`

        amountEL_two.value = (amountEL_one.value * rate).toFixed(2) // 234.33333 =234.33
        
    } catch (error) {
        console.log(error);
        
    }
    
}

currencyEL_one.addEventListener("change",calculate);
currencyEL_two.addEventListener("change",calculate);
amountEL_one.addEventListener("input",calculate);
amountEL_two.addEventListener("input",calculate);

swap.addEventListener("click",()=>{
    const temp = currencyEL_one.value 
    currencyEL_one.value = currencyEL_two.value 
    currencyEL_two.value = temp
    calculate()
})


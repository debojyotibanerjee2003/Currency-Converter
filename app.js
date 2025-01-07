const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdown = document.querySelectorAll('.dropdown select');
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

for (let select of dropdown) {
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }        
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag = (element) =>{
    let currCode = element.value;    
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal ==="" || isNaN(amtVal)|| amtVal<1){
        console.log(amtVal);
        amount.value="1";
        alert("Please enter a valid amount!");
    }

    //console.log(fromCurr.value,toCurr.value);

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    console.log(response.body);
    // try {
    //     const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    //     const response = await fetch(URL);

    //     if (!response.ok) {
    //         throw new Error(`HTTP error! Status: ${response.status}`);
    //     }

    //     const data = await response.json();
    //     console.log(`Conversion rate from ${fromCurr.value} to ${toCurr.value}:`, data[fromCurr][toCurr]);
    // } catch (error){
    //     console.error("Error fetching conversion rate:", error.message);
    // }
});
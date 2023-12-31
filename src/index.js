import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';


function getCrypto(crypto) {
  crypto = crypto.toLowerCase();
  const request = new XMLHttpRequest();
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${crypto}&x_cg_demo_api_key=${process.env.API_KEY}`;

  request.addEventListener("loadend", function(){
    const response = JSON.parse(this.responseText);   /*responseText is a property of XMLHttpRequest*/
    if(this.status === 200){  /*status is also a property of XMLHttpRequest*/
      printElements(response, crypto);
    }
  });
  request.open("GET", url, true);
  request.send();
}


function printElements(apiResponse, crypto){
  const output = document.querySelector('#showResponse');
  output.innerText = `The price for ${crypto} is USD: $${apiResponse[0].current_price}.
  Last updated: ${apiResponse[0].last_updated}`;
  const imgElement = document.createElement('img');
  imgElement.src = apiResponse[0].image;
  imgElement.alt = `${crypto} Image`; 
  output.appendChild(imgElement);
}

function handleFormSubmission(e){
  e.preventDefault();
  const cryptoInput = document.querySelector('#crypto').value;
  
  document.querySelector('#crypto').value = null;
  getCrypto(cryptoInput.toLowerCase());
}

document.querySelector('form').addEventListener("submit", handleFormSubmission);
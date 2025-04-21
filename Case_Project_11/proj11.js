//API credentials. Sensentive data please don't steal. 
const API_KEY = 'PK9J0D8ZDBP977U2WJED';
const SECRET_KEY = 'ODcd4Y2PxBRuXyKObhTzKpbxrupe38c9D5zwoaUV';
const END_POINT = 'https://paper-api.alpaca.markets/v2';
//The header needed to request information from alpaca api.
const headers = {
    'APCA-API-KEY-ID': API_KEY,
    'APCA-API-SECRET-KEY': SECRET_KEY
  };



    function getStockDataXHR() {
        //This function is executed when the 'Get stock info' button is clicked. It uses XHR to retrieve info from Alpaca API
        //First we take the stock name and make it upper case (if user puts lower case) 
        let symbol = document.getElementById("symbolInput").value.toUpperCase();
        //This is the endpoint used to retrieve the information however user needs to specify which stock to get it from.
        const url = `https://data.alpaca.markets/v2/stocks/${symbol}/quotes/latest`;
        //XML request is a bit older then fetch and is more difficult to work with.
        // Here are the steps. 1.make request and open it with endpoint with HTTP get request. Then set header of request
        // to credentials needed to access information.
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.setRequestHeader("APCA-API-KEY-ID", API_KEY);
        xhr.setRequestHeader("APCA-API-SECRET-KEY", SECRET_KEY);
        //Checks state of XML to see if it was successful. If so then use json to parse the raw text string sent to us.
        // than access the attributes of the data like asking price of stock.
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              const data = JSON.parse(xhr.responseText);
              document.getElementById("stockXhrResult").innerHTML = `
                <p><strong>${symbol}</strong></p>
                <p>Bid: $${data.quote.bp}</p>
                <p>Ask: $${data.quote.ap}</p>
                <p>Time: ${new Date(data.quote.t).toLocaleString()}</p>
              `;
            } else {
              document.getElementById("stockXhrResult").innerText = "XHR request failed. Please Enter a valid Stock Symbol. E.G. 'WMT'";
            }
          }
        };
    
        xhr.send();
      }
    
      async function getStockData(UserSymbol, chartName) {
        //same thing as XML request but easier.
        //Endpoint url with STock name inputted
        const response = await fetch(`https://data.alpaca.markets/v2/stocks/${UserSymbol}/bars?timeframe=15Min&limit=30`, {
          headers
        });
        //check to see if it was success if so then parse with json
        const json = await response.json();
        //segment info into bars of time segments making a list of information at different times for chart.
        const bars = json.bars;
        
        const labels = bars.map(bar => bar.t); // times bars
        const prices = bars.map(bar => bar.c); // closing prices
        
        renderChart(labels, prices, UserSymbol, chartName);
      }
    //makes chart using chart.js in html
      function renderChart(labels, data, renderUserSymbol, renderChartName) {
        //uses the canvas element using 2d as the method to display information
        const ctx = document.getElementById(renderChartName).getContext('2d');
        //uses canvas element to host chart.
        new Chart(ctx, {
            //line graph
          type: 'line',
          data: {
            //with labels that correnspond with data
            labels: labels,
            datasets: [{
                
              label: `${renderUserSymbol} Stock Price`,
              //uses the data we parsed puts into graph
              data: data,
              //color of line through the graph
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 2,
              fill: false,
              tension: 0.3,
              pointRadius: 2
            }]
          },
          options: {
            //header for the graph
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: `${renderUserSymbol} Stock Price (Last 7.5 hours)`
              }
            },
            scales: {
              x: {
                //shows the amount of segments used in the graph which is 10. Ticks are the each line mark with information ploted on
                // the x axis or y-axis.
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10
                },
                //title of axis
                title: {
                  display: true,
                  text: 'Date'
                }
              },
              y: {
                beginAtZero: false,
                title: {
                  display: true,
                  text: 'Price (USD)'
                }
              }
            }
          }
        });
      }
    
      getStockData("WMT", "stockChartWalmart");
      getStockData("KR", "stockChartKroger");
      getStockData("TGT", "stockChartTarget");
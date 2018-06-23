const Binance = require('../index')();

(async function () {


    let coinSymbol = process.argv[2];
    let levels = process.argv[3];

    let options = {};

    if(coinSymbol === undefined){
        coinSymbol = 'btcusdt';     // default
    }else if(coinSymbol === "help"){
        console.log("usage: node "+process.argv[1]+" btcusdt");
        console.log("Available levels are as below. Default value is 5");
        console.log("5, 10, 20");
        return;
    }

    if(levels === undefined){
        levels = "5";           // default
    }


    options = {
        streamName: coinSymbol+"@depth"+ levels
    };



    try{
        /* handling wsStream */
        await Binance.setParams(options).then(value => {
            value.on('connect', (connection) => {
                console.log('WebSocket Client Connected');
                connection.on('Error', (error) => {
                    console.log('Connection Error: '+ error.toString());
                });

                connection.on('close', () => {
                    console.log('echo-protocol Connection Closed');
                });


                connection.on('message', (message) => {
                    if(message.type === 'utf8'){
                        console.log("Received: "+ message.utf8Data);
                    }
                });
            });
        }).catch(reason => {
            console.log("wsKlineCandleStick() "+ reason);
        });



    }catch (e) {
        console.log("Error! " +e);
    }



})();


/* sample result



{
  "lastUpdateId": 160,  // Last update ID
  "bids": [             // Bids to be updated
    [
      "0.0024",         // price level to be updated
      "10",             // quantity
      []                // ignore
    ]
  ],
  "asks": [             // Asks to be updated
    [
      "0.0026",         // price level to be updated
      "100",            // quantity
      []                // ignore
    ]
  ]
}



 */
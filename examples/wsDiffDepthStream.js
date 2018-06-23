const Binance = require('../index')();

(async function () {
    let coinSymbol = process.argv[2];


    let options = {};

    if(coinSymbol === undefined){
        coinSymbol = 'btcusdt';     // default
    }else if(coinSymbol === "help"){
        console.log("usage: node "+process.argv[1]+" btcusdt");
        return;
    }



    options = {
        streamName: coinSymbol+"@depth"
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
            console.log("wsDiffDepthStream() "+ reason);
        });



    }catch (e) {
        console.log("Error! " +e);
    }
})();




/* sample result


{
  "e": "depthUpdate", // Event type
  "E": 123456789,     // Event time
  "s": "BNBBTC",      // Symbol
  "U": 157,           // First update ID in event
  "u": 160,           // Final update ID in event
  "b": [              // Bids to be updated
    [
      "0.0024",       // price level to be updated
      "10",
      []              // ignore
    ]
  ],
  "a": [              // Asks to be updated
    [
      "0.0026",       // price level to be updated
      "100",          // quantity
      []              // ignore
    ]
  ]
}



 */
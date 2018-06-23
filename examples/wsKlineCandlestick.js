const Binance = require('../index')();


(async function () {
    let coinSymbol = process.argv[2];
    let interval = process.argv[3];
    let options = {};

    if(coinSymbol === undefined){
        coinSymbol = 'btcusdt';     // default
    }else if(coinSymbol === "help"){
        console.log("usage: node "+process.argv[1]+" btcusdt 1h");
        console.log("Available time interval is as below. Default value is 1h");
        console.log("1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M");
        return;
    }

    if(interval === undefined){
        interval = "1h";
    }


    options = {
        streamName: coinSymbol+"@kline_"+ interval
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
  "e": "kline",     // Event type
  "E": 123456789,   // Event time
  "s": "BNBBTC",    // Symbol
  "k": {
    "t": 123400000, // Kline start time
    "T": 123460000, // Kline close time
    "s": "BNBBTC",  // Symbol
    "i": "1m",      // Interval
    "f": 100,       // First trade ID
    "L": 200,       // Last trade ID
    "o": "0.0010",  // Open price
    "c": "0.0020",  // Close price
    "h": "0.0025",  // High price
    "l": "0.0015",  // Low price
    "v": "1000",    // Base asset volume
    "n": 100,       // Number of trades
    "x": false,     // Is this kline closed?
    "q": "1.0000",  // Quote asset volume
    "V": "500",     // Taker buy base asset volume
    "Q": "0.500",   // Taker buy quote asset volume
    "B": "123456"   // Ignore
  }
}


 */
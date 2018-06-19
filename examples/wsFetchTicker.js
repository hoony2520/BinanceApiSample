const Binance = require('../index')();



(async function(){

    let coinSymbol = process.argv[2];
    let allMarketFlag = false;
    let options = {};

    if(coinSymbol === undefined){
        coinSymbol = 'btcusdt';     // default
    }else if(coinSymbol === "all"){
        allMarketFlag = true;
    }else if(coinSymbol === "help"){
        console.log("usage: node "+process.argv[1]+" btcusdt");
        console.log("usage: node "+process.argv[1]+" all");
        return;
    }

    console.log(coinSymbol);

    if(!allMarketFlag){
        options = {
            streamName: coinSymbol +'@ticker'     // put your interested coin symbol such as btcusdt, ethbtc something like that.
        };
    }else{
        options = {
            streamName: "!ticker@arr"       // all trading pair stream
        }
    }


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
        });



    }catch (e) {
        console.log("Error! " +e);
    }


})();


/* sample result:

{
  "e": "24hrTicker",  // Event type
  "E": 123456789,     // Event time
  "s": "BNBBTC",      // Symbol
  "p": "0.0015",      // Price change
  "P": "250.00",      // Price change percent
  "w": "0.0018",      // Weighted average price
  "x": "0.0009",      // Previous day's close price
  "c": "0.0025",      // Current day's close price
  "Q": "10",          // Close trade's quantity
  "b": "0.0024",      // Best bid price
  "B": "10",          // Best bid quantity
  "a": "0.0026",      // Best ask price
  "A": "100",         // Best ask quantity
  "o": "0.0010",      // Open price
  "h": "0.0025",      // High price
  "l": "0.0010",      // Low price
  "v": "10000",       // Total traded base asset volume
  "q": "18",          // Total traded quote asset volume
  "O": 0,             // Statistics open time
  "C": 86400000,      // Statistics close time
  "F": 0,             // First trade ID
  "L": 18150,         // Last trade Id
  "n": 18151          // Total number of trades
}
*/

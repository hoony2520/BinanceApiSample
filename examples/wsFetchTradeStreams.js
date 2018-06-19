const Binance = require('../index')();

(async function(){

    let coinSymbol = process.argv[2];

    if(coinSymbol === undefined){
        coinSymbol = 'btcusdt';     // default
    }else if(coinSymbol === "help"){
        console.log("usage: node "+process.argv[1]+" btcusdt");
        return;
    }



    let options = {
       streamName: coinSymbol+'@trade'         //args[0] = coin symbol such as ethbtc
    };

    try{
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
        console.log("TradeStreamError! " +e);
    }
})();



/* sample result

{
    "e": "trade",     // Event type
    "E": 123456789,   // Event time
    "s": "BNBBTC",    // Symbol
    "t": 12345,       // Trade ID
    "p": "0.001",     // Price
    "q": "100",       // Quantity
    "b": 88,          // Buyer order Id
    "a": 50,          // Seller order Id
    "T": 123456785,   // Trade time
    "m": true,        // Is the buyer the market maker?
    "M": true         // Ignore.
}

*/
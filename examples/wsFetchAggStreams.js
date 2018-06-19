const Binance = require('../index')();

(async function () {


    let coinSymbol = process.argv[2];

    if(coinSymbol === undefined){
        coinSymbol = 'btcusdt';     // default
    }else if(coinSymbol === "help"){
        console.log("usage: node "+process.argv[1]+" btcusdt");
        return;
    }

    let options = {
        streamName: coinSymbol+'@aggTrade'       // put your interested currency
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
        console.log("AggStreamError! " +e);
    }


})();


/* sample result

{
    "e": "aggTrade",  // Event type
    "E": 123456789,   // Event time
    "s": "BNBBTC",    // Symbol
    "a": 12345,       // Aggregate trade ID
    "p": "0.001",     // Price
    "q": "100",       // Quantity
    "f": 100,         // First trade ID
    "l": 105,         // Last trade ID
    "T": 123456785,   // Trade time
    "m": true,        // Is the buyer the market maker?
    "M": true         // Ignore.
}

*/
const WebSocketClient = require('websocket').client;



const WEB_SOCKET_HOST_URL = "wss://stream.binance.com:9443/ws/";


const client = new WebSocketClient();

client.on('connectFailed', (error) => {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', (connection) => {
    console.log('WebSocket Client Connected');
    connection.on('Error', (error) => {
        console.log('Connection Error: '+ error.toString());
    });

    connection.on('close', () => {
        console.log('echo-protocol Connection Closed');
    });


    connection.on('message', (message) => {
        if(message.type === 'utf8'){
            console.log("Received: '"+ message.utf8Data + "'");
        }
    });
});



let Binance = () => {


    let setting = {
        streamName: 'zilbtc@depth'
    };

    async function connectWebSocket(params){
        try{
            let response = await client.connect(WEB_SOCKET_HOST_URL+params.streamName, '', '', '', '');
            response = JSON.parse(response);

            return response;
        }catch (e) {
            return console.log("connectWebSocket(), Error has been occurred: " + e);
        }

    }



    return {
        setParams: async (params = {}) => {
            setting.streamName = params.streamName;

            return connectWebSocket(setting);
        }
    };



};

module.exports = exports = Binance;
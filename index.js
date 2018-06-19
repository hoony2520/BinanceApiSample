const WebSocketClient = require('websocket').client;



const WEB_SOCKET_HOST_URL = "wss://stream.binance.com:9443/ws/";


const client = new WebSocketClient();

client.on('connectFailed', (error) => {
    console.log('Connect Error: ' + error.toString());
});


let Binance = () => {





    let setting = {
        streamName: ''
    };

    async function connectWebSocket(params){
        try{
            let response = await client.connect(WEB_SOCKET_HOST_URL+params.streamName, '', '', '', '');
            response = JSON.parse(response);

            console.log("asdfasdf\t\t\t" +response);
            return response;
        }catch (e) {
            return console.log("connectWebSocket(), Error has been occurred: " + e);
        }

    }



    return {
        setParams: async (params = {}) => {
            setting.streamName = params.streamName;
            connectWebSocket(setting);
            return client;
        }
    };



};

module.exports = exports = Binance;
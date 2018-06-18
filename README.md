# BinanceApiSample
Binance Websocket Api Examples


<h1>Sample test code run<br>node ./examples/wsFetchTicker.js</h1>

<p>Sample Output</p>
Received: '{"e":"24hrTicker","E":1529302335315,"s":"BTCUSDT","p":"-92.33000000","P":"-1.418","w":"6477.58235133","x":"6511.45000000","c":"6419.12000000","Q":"0.08948500","b":"6419.13000000","B":"0.03000000","a":"6420.99000000","A":"0.00159900","o":"6511.45000000","h":"6589.03000000","l":"6380.00000000","v":"21998.95152500","q":"142500020.14607986","O":1529215935317,"C":1529302335317,"F":51615611,"L":51754094,"n":138484}'
<br/><br/>
<p>

--- Description of Payload Response Parameters ---

{ <br/>
  "e": "24hrTicker",  // Event type <br/>
  "E": 123456789,     // Event time <br/>
  "s": "BTCUSDT",      // Symbol     <br/>
  "p": "0.0015",      // Price change   <br/>
  "P": "250.00",      // Price change percent   <br/>
  "w": "0.0018",      // Weighted average price <br/>
  "x": "0.0009",      // Previous day's close price <br/>
  "c": "0.0025",      // Current day's close price  <br/>
  "Q": "10",          // Close trade's quantity <br/>
  "b": "0.0024",      // Best bid price <br/>
  "B": "10",          // Best bid quantity  <br/>
  "a": "0.0026",      // Best ask price <br/>
  "A": "100",         // Best ask quantity  <br/>
  "o": "0.0010",      // Open price <br/>
  "h": "0.0025",      // High price <br/>
  "l": "0.0010",      // Low price  <br/>
  "v": "10000",       // Total traded base asset volume <br/>
  "q": "18",          // Total traded quote asset volume <br/>
  "O": 0,             // Statistics open time <br/>
  "C": 86400000,      // Statistics close time <br/>
  "F": 0,             // First trade ID <br/>
  "L": 18150,         // Last trade Id <br/>
  "n": 18151          // Total number of trades <br/>
}
</p>


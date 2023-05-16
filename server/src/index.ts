import express from 'express';
import https from 'https';
import bodyParser from 'body-parser';
import cors from 'cors';

const Base_URL = "https://api.freecurrencyapi.com";
const path = "v1/latest?apikey=lN32ljOi4H4Xhfw4ESA2Thgs7MdqhtWD1qLK1nZ7";
const full_url = "https://api.freecurrencyapi.com/v1/latest?apikey=lN32ljOi4H4Xhfw4ESA2Thgs7MdqhtWD1qLK1nZ7"

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

const server = https.createServer(app);

app.listen(8080, () => {
    console.log("listening on port 8080");
})

app.get("/api", function (req, res) {
    res.send("running from server")
})

app.get("/currency", function (req, res) {
    const https = require('https');

    callExternalApiUsingHttp(function (response: any) {
        var currency_data = JSON.parse(response);
        
        var baseCurrency = String(req.query.baseCurrency);
        var targetCurrency = String(req.query.targetCurrency);
        var amount = Number(req.query.amount);

        const baseCurrencyRate = currency_data['data'][baseCurrency];
        const targetCurrencyRate = currency_data['data'][targetCurrency];

        // console.log(amount, baseCurrency,targetCurrency)
        var convertedAmount = amount * (targetCurrencyRate/baseCurrencyRate);
        
        // console.log(convertedAmount)
        res.write(JSON.stringify(convertedAmount));
        res.end();
    });
})

const callExternalApiUsingHttp = (callback: any) => {
    https.get(full_url, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });
   
        resp.on('end', () => {
            return callback(data);
            // console.log(JSON.stringify(data));
        });

    }).on("error", (err) => {

        console.log("Error: " + err.message);
    });

}


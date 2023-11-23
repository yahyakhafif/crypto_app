const PORT = 3000
const express = require('express')
const cors = require('cors')
const app = express()
const axios = require('axios')
require('dotenv').config()
app.use(cors())

app.get('/', (req, res) => {

    fromCurrency = req.query.from_currency;
    toCurrency = req.query.to_currency;

    const options = {
        method: 'GET',
        url: 'https://alpha-vantage.p.rapidapi.com/query',
        params: {
            from_currency: fromCurrency,
            function: 'CURRENCY_EXCHANGE_RATE',
            to_currency: toCurrency
        },
        headers: {
            'X-RapidAPI-Key': '8baf7365e7msh3eb4339a977c6c2p13214ejsn2bd14aceccb4'
            'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
        }
    };

    axios.request(options).then((response) => {
        res.json(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
    }).catch((error) => {
        console.error(error)
    })
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is working on port ${PORT}`)
})
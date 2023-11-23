import ExchangeRate from './ExchangeRate'
import { useState } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
    const currencies = ['BTC', 'ETH', 'XRP', 'BNB', 'LTC', 'ADA', 'USDT']
    const [primaryCurrency, setPrimaryCurrency] = useState('BTC')
    const [secondaryCurrency, setSecondaryCurrency] = useState('BTC')
    const [amount, setAmount] = useState(1)
    const [result, setResult] = useState(0)

    const [exchangedData, setExchangedData] = useState({
        primCurr: primaryCurrency,
        secCurr: secondaryCurrency,
        exchangeRate: 0
    })

    const convert = () => {

        const options = {
            method: 'GET',
            url: 'https://crypto-server-gamma.vercel.app/',
            params: {
                from_currency: primaryCurrency,
                function: 'CURRENCY_EXCHANGE_RATE',
                to_currency: secondaryCurrency
            },
        }
        axios.request(options).then((response) => {
            setResult(response.data * amount)

            setExchangedData({
                primCurr: primaryCurrency,
                secCurr: secondaryCurrency,
                exchangeRate: response.data
            })

        }).catch((error) => {
            console.error(error);
        })
    }
    return (
        <div className="currency-converter">
            <h2>Crypto Dashboard</h2>
            <div className='input-box'>
                <table>
                    <tbody>
                        <tr>
                            <td>Primary currrency:</td>
                            <td>
                                <input
                                    type='number'
                                    name="currency-amount-1"
                                    value={amount}
                                    onChange={(event) => setAmount(event.target.value)}
                                />
                            </td>
                            <td>
                                <select
                                    value={primaryCurrency}
                                    name='currency-option-1'
                                    className='currency-options'
                                    onChange={(event) => setPrimaryCurrency(event.target.value)}
                                >
                                    {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td>secondary currrency:</td>
                            <td>
                                <input
                                    type='number'
                                    name="currency-amount-2"
                                    value={result}
                                    disabled={true}
                                />
                            </td>
                            <td>
                                <select
                                    value={secondaryCurrency}
                                    name='currency-option-2'
                                    className='currency-options'
                                    onChange={(event) => setSecondaryCurrency(event.target.value)}
                                >
                                    {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button id="convert-button" onClick={convert}>Convert</button>
            </div>
            <ExchangeRate
                exchangedData={exchangedData}
            />
        </div>
    );
}

export default CurrencyConverter;

const ExchangeRate = ({ exchangedData }) => {
    return (
        <div className="exchange-rate">
            <h3>Exchange rate</h3>
            <h1>{exchangedData.exchangeRate}</h1>
            <p>{exchangedData.primCurr} to {exchangedData.secCurr}</p>
        </div>
    );
}

export default ExchangeRate;

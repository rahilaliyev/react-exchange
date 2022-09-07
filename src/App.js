import "App.scss";
import axios from "axios";
import Amount from "components/Amount";
import Loading from "components/Loading";
import OtherCurrencies from "components/OtherCurrencies";
import SelectCurrencies from "components/SelectCurrencies";
import axiosInstance from "helpers/axios";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  const [currencyConvert, setCurrencyConvert] = useState({
    to: "AZN",
    from: "USD",
    amount: 1,
  });
  const [resultAmount, setResultAmount] = useState();

  const getCurrencyAmount = async () => {
    const currenctUrl = new URLSearchParams(currencyConvert);
    setLoading(true);
    try {
      const result = await axiosInstance(`/convert?${currenctUrl}`);
      setLoading(false);
      setResultAmount(result.data.result);
    } catch (error) {
      setLoading(false);
    }
  };

  const [otherCurrency, setOtherCurrency] = useState({
    dollar: "",
    euro: "",
    tr: "",
    rubl: "",
  });

  const [otherCurrencyLoading, setOtherCurrencyLoading] = useState(false);

  const getOtherCurrenctAmount = async () => {
    setOtherCurrencyLoading(true);
    const exchanges = ["USD", "EUR", "TRY", "RUB"];

    let axiosFetch = exchanges.reduce((axiosCalls, exchange) => {
      axiosCalls.push(axiosInstance(`/convert?to=${exchange}&from=${currencyConvert.from}&amount=${currencyConvert.amount}`));
      return axiosCalls;
    }, []);

    await axios
      .all(axiosFetch)
      .then((data) => {
        let dataCollected = data.reduce((dataCollected, response) => {
          dataCollected = dataCollected.concat(response.data.result);
          return dataCollected;
        }, []);
        setOtherCurrency(dataCollected);
        setOtherCurrencyLoading(false);
      })
      .catch((error) => {
        setOtherCurrencyLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    getCurrencyAmount();
    getOtherCurrenctAmount();
  }, []);

  return (
    <div className="App">
      <main>
        <SelectCurrencies currencyConvert={currencyConvert} setCurrencyConvert={setCurrencyConvert} />
        {loading ? (
          <Loading />
        ) : (
          <Amount
            currencyConvert={currencyConvert}
            setCurrencyConvert={setCurrencyConvert}
            resultAmount={resultAmount}
            getCurrencyAmount={getCurrencyAmount}
            getOtherCurrenctAmount={getOtherCurrenctAmount}
          />
        )}
        {otherCurrencyLoading ? <Loading /> : <OtherCurrencies currencyConvert={currencyConvert} otherCurrency={otherCurrency} />}
      </main>
    </div>
  );
}

export default App;

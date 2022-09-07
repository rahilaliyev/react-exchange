import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchange } from "@fortawesome/free-solid-svg-icons";
import { useEffect,  useState } from "react";
import Loading from "components/Loading";
import axiosInstance from "helpers/axios";

const SelectCurrencies = ({ currencyConvert, setCurrencyConvert }) => {
  const [loading, setLoading] = useState(false);

  //selectleri acib baglamaq

  const [fromSelect, setFromSelect] = useState(false);
  const [toSelect, setToSelect] = useState(false);

  const handleOpenDropdown = () => setFromSelect(!fromSelect);
  const handleToOpenDropdown = () => setToSelect(!toSelect);

  // valyuta datalarini cekmek ucun

  const [currenciesData, setCurrenciesData] = useState();

  useEffect(() => {
    const getCurrencies = () => {
      setLoading(true);
      axiosInstance("/symbols")
        .then((result) => {
          setCurrenciesData(result.data.symbols);
          setLoading(false);
        })
        .catch((error) => setLoading(false));
    };
    getCurrencies();
  }, []);

  const handleChangeCurrency = () =>
    setCurrencyConvert((prevState) => ({
      ...prevState,
      to: currencyConvert.from,
      from: currencyConvert.to,
    }));

  //filter ucun

  const [filteredData, setfilteredData] = useState([]);
  const [toFilteredData, setTofilteredData] = useState([]);

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    const newFilter = Object.keys(currenciesData)?.filter((value) => value.toUpperCase().includes(searchWord.toUpperCase()));
    if (searchWord === "") {
      setfilteredData([]);
    } else {
      setfilteredData(newFilter);
    }
  };

  const toHandleFilter = (e) => {
    const searchWord = e.target.value;
    const newFilter = Object.keys(currenciesData)?.filter((value) => value.toUpperCase().includes(searchWord.toUpperCase()));
    if (searchWord === "") {
      setTofilteredData([]);
    } else {
      setTofilteredData(newFilter);
    }
  };

  return (
    <section className="select-currencies">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="select">
            <span onClick={handleOpenDropdown}>{currencyConvert.from}</span>
            {fromSelect && (
              <ul className="dropdown">
                <input type={"text"} placeholder="Search currency" onChange={handleFilter} />

                {filteredData.length === 0
                  ? Object.keys(currenciesData).map((symbol, key) => (
                      <li
                        key={key}
                        value={symbol}
                        onClick={() => {
                          setCurrencyConvert((prevState) => ({
                            ...prevState,
                            from: symbol,
                          }));
                        }}
                      >
                        {symbol}
                      </li>
                    ))
                  : filteredData.map((symbol, key) => (
                      <li
                        key={key}
                        value={symbol}
                        onClick={() => {
                          setCurrencyConvert((prevState) => ({
                            ...prevState,
                            from: symbol,
                          }));
                        }}
                      >
                        {symbol}
                      </li>
                    ))}
              </ul>
            )}
          </div>
          <button onClick={handleChangeCurrency} className="change">
            <FontAwesomeIcon icon={faExchange} />
          </button>
          <div className="select">
            <span onClick={handleToOpenDropdown}>{currencyConvert.to}</span>
            {toSelect && (
              <ul className="dropdown">
                <input type={"text"} placeholder="Search currency" onChange={toHandleFilter} />
                {toFilteredData.length === 0
                  ? Object.keys(currenciesData).map((symbol, key) => (
                      <li
                        key={key}
                        value={symbol}
                        onClick={() => {
                          setCurrencyConvert((prevState) => ({
                            ...prevState,
                            to: symbol,
                          }));
                        }}
                      >
                        {symbol}
                      </li>
                    ))
                  : toFilteredData.map((symbol, key) => (
                      <li
                        key={key}
                        value={symbol}
                        onClick={() => {
                          setCurrencyConvert((prevState) => ({
                            ...prevState,
                            to: symbol,
                          }));
                        }}
                      >
                        {symbol}
                      </li>
                    ))}
              </ul>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default SelectCurrencies;

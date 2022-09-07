import { faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Amount = ({ currencyConvert, setCurrencyConvert, resultAmount, getCurrencyAmount, getOtherCurrenctAmount }) => {
  const handleChange = (e) =>
    setCurrencyConvert((prevState) => ({
      ...prevState,
      amount: e.target.value,
    }));

  const reload = () => {
    getCurrencyAmount();
    getOtherCurrenctAmount();
  };

  return (
    <section className="amount">
      <h6>Amount</h6>
      <form>
        <input type={"number"} autoFocus placeholder="Type amount as a number" value={currencyConvert.amount} onChange={(e) => handleChange(e)} />
        <button onClick={reload}>
          <FontAwesomeIcon icon={faSync} />
        </button>
      </form>
      <span className="result">
        {resultAmount?.toFixed(2)} {currencyConvert.to}
      </span>
    </section>
  );
};

export default Amount;

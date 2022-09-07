import { faDollar, faEuro, faLiraSign, faRuble } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OtherCurrencies = ({ otherCurrency }) => {
  const currencies = [
    { icon: <FontAwesomeIcon icon={faDollar} />, name: "Dollar", result: otherCurrency[0]?.toFixed(2) },
    { icon: <FontAwesomeIcon icon={faEuro} />, name: "Euro", result: otherCurrency[1]?.toFixed(2) },
    { icon: <FontAwesomeIcon icon={faLiraSign} />, name: "Tl", result: otherCurrency[2]?.toFixed(2) },
    { icon: <FontAwesomeIcon icon={faRuble} />, name: "Rubl", result: otherCurrency[3]?.toFixed(2) },
  ];

  return (
    <section className="currencies">
      {currencies.map((currency, key) => (
        <div key={key} className="currency">
          <span className="icon">{currency.icon}</span>
          <span className="name">{currency.name}</span>
          <span className="result">{currency.result}</span>
        </div>
      ))}
    </section>
  );
};

export default OtherCurrencies;

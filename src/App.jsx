import { useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";

// آرایه‌ای از نرخ تبدیل  بین ارزها
const ratestatic = [
  { changefrom: "USD", changeto: "IRR", rate: 1010000 },
  { changefrom: "USD", changeto: "EUR", rate: 0.91 },
  { changefrom: "EUR", changeto: "IRR", rate: 1010000 },
  { changefrom: "EUR", changeto: "USD", rate: 1.1 },
  { changefrom: "IRR", changeto: "USD", rate: 1 / 1010000 },
  { changefrom: "IRR", changeto: "EUR", rate: 1 / 1010000 },
];

// لیست ارزهای موجود برای انتخاب
const rates = ["USD", "IRR", "EUR"];

const App = () => {
  let [amount, setamount] = useState(""); // مقدار وارد شده توسط کاربر
  let [from, setFrom] = useState("IRR"); // ارز مبدا به صورت پیش‌فرض IRR
  let [to, setto] = useState("USD"); // ارز مقصد به صورت پیش‌فرض USD

  // تابع محاسبه و تبدیل ارز
  const exchange = () => {
    let money = parseFloat(amount); // تبدیل مقدار ورودی به عدد
    if (!money || money <= 0) return "0"; // اگر عدد وارد شده نامعتبر یا صفر باشد، 0 نمایش بده
    if (from === to) {
      // اگر ارز مبدا و مقصد یکسان باشند، فقط همان مقدار را با فرمت فارسی نمایش بده
      return (
        money.toLocaleString("fa-IR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) +
        " " +
        to
      );
    }
    // پیدا کردن نرخ تبدیل برای ارز انتخاب شده
    const selectedrate = ratestatic.find(
      (e) => e.changefrom === from && e.changeto === to
    );
    const rate = selectedrate ? selectedrate.rate : 1; // اگر نرخ پیدا نشد، 1 در نظر بگیر
    // محاسبه و نمایش نتیجه با فرمت فارسی و دو رقم اعشار
    return (
      (money * rate).toLocaleString("fa-IR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) +
      " " +
      to
    );
  };

  // تابع تعویض ارز مبدا و مقصد
  const swapcurrency = () => {
    setFrom(to);
    setto(from);
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center min-vh-100 p-3"
      style={{ backgroundColor: "#57564F" }}
    >
      {/*جعبه اصلی */}
      <div
        className="border rounded-3 border-black p-5"
        style={{ backgroundColor: "#EEEEEE" }}
      >
        <h4 className="mb-4 text-black text-center fw-bold">
          Check foreign currency exchange rates
        </h4>

        {/* ردیف ورودی‌ها */}
        <div
          className="d-flex flex-column flex-md-row gap-3 align-items-stretch p-5"
          style={{ width: "100%", maxWidth: "900px" }}
        >
          {/* ورودی مقدار پول */}
          <input
            type="text"
            className="form-control flex-grow-1 py-3 px-5"
            value={amount}
            placeholder="Amount..."
            onChange={(e) => setamount(e.target.value)}
          />

          {/* انتخاب ارز مبدا */}
          <select
            className="form-select flex-grow-1"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            {rates.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          {/* دکمه تعویض ارزها */}
          <button className="btn btn-outline-secondary" onClick={swapcurrency}>
            <FaExchangeAlt />
          </button>

          {/* انتخاب ارز مقصد */}
          <select
            className="form-select flex-grow-1"
            value={to}
            onChange={(e) => setto(e.target.value)}
          >
            {rates.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* نمایش نتیجه */}
        <p className="text-center fs-5">result: {exchange()}</p>
      </div>
    </div>
  );
};

export default App;

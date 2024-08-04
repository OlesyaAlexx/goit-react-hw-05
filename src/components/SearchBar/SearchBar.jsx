import s from "./SearchBar.module.css";
import { useState } from "react";

const SearchBar = ({ query, setQuery, handleSearch }) => {
  const [error, setError] = useState("");

  // Функція для валідації запиту та виклику функції пошуку
  const validateAndSearch = () => {
    if (!query.trim()) {
      setError("Please enter a valid search query.");
    } else {
      setError("");
      handleSearch();
    }
  };

  // Обробник натискання клавіші
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      validateAndSearch();
    }
  };

  return (
    <div className={s.container}>
      <div className={s.inputContainer}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Enter search movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown} // Додаємо обробник натискання клавіші
          className={s.input}
        />
        <button
          className={s.search}
          onClick={validateAndSearch} // Виклик функції валідації при натисканні на кнопку
        >
          Search
        </button>
      </div>
      {error && <p className={s.error}>{error}</p>}
    </div>
  );
};

export default SearchBar;

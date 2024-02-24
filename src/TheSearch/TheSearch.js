import { useState } from "react";
import styles from "./TheSearch.module.css";

function TheSearch({ searchItems }) {
  const [text, setText] = useState("");
  const [itemType, setItemType] = useState("price");

  function handleClick(e) {
    e.preventDefault();

    if (!text) return;

    if (itemType === "price") {
      if (isNaN(text)) return;
      searchItems(itemType, Number(text));
      return;
    }

    searchItems(itemType, text);
  }
  return (
    <form onSubmit={handleClick} className={styles.search}>
      <label className={styles["search-label"]}>
        <input
          onChange={(e) => setText(e.target.value.trim())}
          className={styles["inp-search"]}
          type="text"
        />
      </label>
      <select
        onChange={(e) => setItemType(e.target.value)}
        name="choise"
        defaultValue={itemType}
        className={styles["search-options"]}
      >
        <option value={"price"}>Цена</option>
        <option value={"product"}>Название</option>
        <option value={"brand"}>Бренд</option>
      </select>
      <button type="submit" className={styles["btn-find"]}>
        ОК
      </button>
    </form>
  );
}

export default TheSearch;

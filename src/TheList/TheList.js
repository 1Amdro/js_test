import { useEffect, useState } from "react";
import styles from "./TheList.module.css";

function TheList({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsOnPage = 50;
  const totalPages = Math.ceil(data.length / itemsOnPage);
  const indexOfLastItem = currentPage * itemsOnPage;
  const indexOfFirstItem = indexOfLastItem - itemsOnPage;
  let currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  function handlerPrev() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handlerNext() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  useEffect(() => {
    currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  }, [data]);

  return (
    <div>
      <ul className={styles.list}>
        {currentItems.map((item, i) => (
          <li className={styles.item} key={item.id}>
            <h4 className={styles["item-id"]}>id: {item.id}</h4>
            <h3 className={styles["item-title"]}>
              №{i + indexOfFirstItem + 1} {item.product}
            </h3>
            <h3 className={styles["item-price"]}>{item.price} Р</h3>
            <p className={styles["item-brand"]}>{item.brand}</p>
          </li>
        ))}
      </ul>

      <div className={styles["btn-container"]}>
        <button
          disabled={currentPage === 1}
          onClick={handlerPrev}
          className={styles["btn-prev"]}
        >
          ⬅️
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={handlerNext}
          className={styles["btn-next"]}
        >
          ➡️
        </button>
      </div>
      <p className={styles["page-info"]}>
        Страница {currentPage} из {totalPages}
      </p>
    </div>
  );
}

export default TheList;

import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import TheList from "./TheList/TheList";
import "./App.css";
import TheSearch from "./TheSearch/TheSearch";

async function request(body) {
  const today = new Date();
  const year = today.getUTCFullYear();
  const month = (today.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = today.getUTCDate().toString().padStart(2, "0");
  const formattedToday = `${year}${month}${day}`;

  const password = CryptoJS.MD5("Valantis_" + formattedToday);

  try {
    const req = await fetch("//api.valantis.store:40000/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "X-Auth": password,
      },
      body: JSON.stringify(body),
    });

    if (req.status === 500)
      throw new Error("Внутренняя ошибка сервера! Повторите запрос!");

    if (!req.ok) throw new Error("Bad request");

    const answ = await req.json();

    return answ;
  } catch (error) {
    console.error(`Ошибка сети::
    ${error.name}: ${error.message}`);
  }
}

function filterUniqItems(items) {
  return Array.from(new Set(items?.map((item) => item.id))).map((id) =>
    items.find((item) => item.id === id)
  );
}

async function getItems(ids) {
  const getItems = await request({
    action: "get_items",
    params: { ids: ids?.result },
  });

  return filterUniqItems(getItems?.result);
}

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const getIds = await request({
        action: "get_ids",
        params: { offset: 0, limit: 300 },
      });

      const newItems = await getItems(getIds);
      setItems(newItems);
      setLoading(false);
    })();
  }, []);

  async function handleSearch(type, name) {
    setLoading(true);
    const getIds = await request({
      action: "filter",
      params: { [`${type}`]: name },
    });

    const newItems = await getItems(getIds);

    setItems(newItems);
    setLoading(false);
  }

  return (
    <div className="App">
      <h1 className="title">Товары</h1>
      <TheSearch searchItems={handleSearch} />
      {!loading ? (
        <TheList data={items} />
      ) : (
        <h2 className="loading">Загрузка...</h2>
      )}
    </div>
  );
}

export default App;

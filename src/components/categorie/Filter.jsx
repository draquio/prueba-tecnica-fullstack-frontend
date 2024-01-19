import React, { useEffect, useState } from "react";
import "./Filter.scss";
import { useFilters } from "../../hooks/useFilter";
import { Categorie as CategorieSerivce } from "../../services/categorie";
const Filter = () => {
  const [listcategories, setListCategories] = useState();
  const { setFilters } = useFilters();
  useEffect(() => {
    (async () => {
      const categorieController = new CategorieSerivce();
      const response = await categorieController.getCategories();
      setListCategories(response);
    })();
  }, []);
  const handleChangeCategory = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      title: e.target.value,
    }));
  };
  if (!listcategories) return "";
  return (
    <select className="filter" onChange={handleChangeCategory}>
      <option key={"todas"} value="Todas">
        Todas
      </option>
      {listcategories.map((categorie, index) => (
        <option key={index} value={categorie.title}>
          {categorie.title}
        </option>
      ))}
    </select>
  );
};

export default Filter;

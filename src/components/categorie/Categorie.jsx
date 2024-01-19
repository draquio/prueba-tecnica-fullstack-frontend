import React, { useEffect, useState } from "react";
import "./Categorie.scss";
import { Categorie as CategoriaService } from "../../services/categorie";
const Categorie = (props) => {
  const { setCategorie, categorie } = props;
  const [categories, setCategories] = useState();
  useEffect(() => {
    (async () => {
      const categorieController = new CategoriaService();
      const response = await categorieController.getCategories();
      setCategories(response);
    })();
  }, []);
  const handleChangeCategorie = (e) => {
    setCategorie(e.target.value);
  };
  if (!categories) return "";
  return (
    <select
      className="categorie"
      value={categorie}
      onChange={handleChangeCategorie}
    >
      <option value="">Escoge una categoría</option>
      {categories.map((categorieitem) => (
        <option key={categorieitem._id} value={categorieitem.title}>
          {categorieitem.title}
        </option>
      ))}
    </select>
  );
};

export default Categorie;

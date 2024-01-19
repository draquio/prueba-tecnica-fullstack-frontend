import { useContext } from "react";
import { FilterContext } from "../contexts/Filter";

export function useFilters () {
  const {filters , setFilters} = useContext(FilterContext);
    const filterNotes = (notas) => {
      return notas.filter((nota) => {
        return (
          (filters.title === "all" || nota.title === filters.title)
        );
      });
    };  
    return {filters, filterNotes, setFilters }
  }
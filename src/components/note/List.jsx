import "./NoteList.scss";
import React, { useEffect, useState } from "react";
import { Note } from "../../services/note";
import ListItem from "./ListItem";
import { useAuth } from "../../hooks/useAuth";
import Loader from "../loader/Loader";
import Nodata from "../nodata/Nodata";
import { useFilters } from "../../hooks/useFilter";
import { filterNotesByCategorie } from "../../utils/functions";

const ListNote = (props) => {
  const { filters } = useFilters();
  const { active } = props;
  const { user, accessToken } = useAuth();
  const [notes, setNotes] = useState();
  const [reload, setReload] = useState(false);
  const onReload = () => setReload((prevState) => !prevState);

  useEffect(() => {
    (async () => {
      try {
        const NoteController = new Note();
        const response = await NoteController.getMyNotes(
          accessToken,
          user._id,
          active
        );
        if (filters.title !== "Todas") {
          const newList = await filterNotesByCategorie(response, filters.title);
          setNotes(newList);
          return
        }
        setNotes(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [reload, filters]);
  if (!notes) return <Loader />;
  if (notes.length === 0)
    return active ? (
      <Nodata title={"notas"} />
    ) : (
      <Nodata title={"archivados"} />
    );
  return (
    <div className="note_grid">
      {notes.map((note) => (
        <ListItem
          key={note._id}
          note={note}
          onReload={onReload}
          active={active}
        />
      ))}
    </div>
  );
};

export default ListNote;

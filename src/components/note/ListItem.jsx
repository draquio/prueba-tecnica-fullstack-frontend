import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Note } from "../../services/note";
import { useAuth } from "../../hooks/useAuth";
import { DateTime } from "luxon";
const ListItem = (props) => {
  const { note, onReload, active } = props;
  const date = new Date(note.create_at);
  const newDate = DateTime.fromISO(date.toISOString())
    .setLocale("es")
    .toFormat("dd 'de' LLLL 'del' yyyy, HH:mm a");
  const { accessToken } = useAuth();
  const noteController = new Note();

  const handleDeleteNote = async (e) => {
    e.preventDefault();
    const confirm = window.confirm(
      "¿Estás seguro de que quieres eliminar esto?"
    );
    if (!confirm) {
      return;
    }
    try {
      await noteController.deleteNote(accessToken, note._id);
      onReload();
    } catch (error) {
      console.error(error);
    }
  };
  const handleArchiveNote = async () => {
    const confirm = window.confirm(
      active ? "¿Estás seguro de que quieres archivar esto?" : "¿Estás seguro de que quieres desarchivar esto?"
    );
    if (!confirm) {
      return;
    }
    try {
      await noteController.updateNote(accessToken, note._id, {
        ...note,
        active: !note.active,
      });
      onReload();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section className="note_grid_item">
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <div className="item_footer">
        <div className="categories">Categoría: {note.categorie}</div>
        <div className="info">
          <span>{newDate}</span>
          <div className="action">
            {active ? (
              <>
                <Link className="btn btn_edit" to={`/edit/${note._id}`}>
                  Editar
                </Link>
                <button className="btn btn_delete" onClick={handleDeleteNote}>
                  Eliminar
                </button>
              </>
            ) : (
              ""
            )}
            <button className="btn btn_edit" onClick={handleArchiveNote}>
              {active ? "Archivar" : "Desarchivar"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListItem;

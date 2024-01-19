import "./FormNote.scss";
import React, { useEffect, useState } from "react";
import { Note } from "../../services/note";
import { useAuth } from "../../hooks/useAuth";
import Alert from "../alerts/Alert";
import { SaveIcon } from "../icons/Icons";
import Categorie from "../categorie/Categorie";
import Loader from "../loader/Loader";
const EditNoteForm = (props) => {
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [categorie, setCategorie] = useState("");
  const [type, setType] = useState("error");
  const { accessToken } = useAuth();
  const NoteController = new Note();
  const { id } = props;
  useEffect(() => {
    (async () => {
      try {
        const response = await NoteController.getSingleNote(accessToken, id);
        setNote(response)
        setTitle(response.title);
        setContent(response.content);
        setCategorie(response.categorie)
      } catch (error) {
        setMessage(error.msg)
        setType('error')
      }
    })();
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }
  const handleContentChange = (e) => {
    setContent(e.target.value);
  }
  const handleUpdateNote = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setMessage("Título y contenido deben ser llenados");
      setType('error')
      return;
    }
    try {
      const data = {...note, title, content, categorie}
      await NoteController.updateNote(accessToken, note._id, data);
      setMessage('Actualizado exitosamente')
      setType('success')
    } catch (error) {
      console.error(error);
    }
  }

  if (!note) return <Loader />
  return (
    <form className="note">
      <h2>Editar nota: {note.title}</h2>
      <div className="note_block">
        <label>Título de la nota</label>
        <input type="text" placeholder="título" value={title} onChange={handleTitleChange} />
      </div>
      <div className="note_block">
        <label>Contenido de la nota</label>
        <textarea placeholder="Contenido" onChange={handleContentChange} value={content}/>
      </div>
      <div className="note_block">
        <label>Categoria</label>
        <Categorie setCategorie={setCategorie} categorie={categorie} />
      </div>
      <div className="note_block">
        <button className="btn btn_delete" onClick={handleUpdateNote}>
          <SaveIcon /> Guardar
        </button>
      </div>
      {message ?<Alert message={message} type={type} close={setMessage} /> : ""}
    </form>
  );
};

export default EditNoteForm;

import React, { useState } from "react";
import { Note } from "../../services/note";
import { useAuth } from "../../hooks/useAuth";
import "./FormNote.scss";
import Alert from "../alerts/Alert";
import { SaveIcon } from "../icons/Icons";
import Categorie from "../categorie/Categorie";
const CreateNoteForm = () => {
  const { accessToken, user } = useAuth();
  const [title, setTitle] = useState("");
  const [categorie, setCategorie] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("error");
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
  const handleSaveNote = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      if (!title.trim() || !content.trim()) {
        setMessage("Título y contenido deben ser llenados");
        setType("error");
        return;
      } else {
        if (!categorie) {
          setType('error');
          setMessage('Debe seleccionar una categoría');
          return;
        }
        const user_id = user._id;
        const NoteController = new Note();
        const newNote = { title, content, user_id, categorie };
        const response = await NoteController.CreateNote(accessToken, newNote);
        setType('success');
        setMessage('Nota ' + response.title + ' creada exitosamente');
        setTitle('')
        setContent('')
      }
    } catch (error) {
      setMessage(error.msg);
      setType(error)
    }
  };
  return (
    <form className="note">
      <h2>Crear nota</h2>
      <div className="note_block">
        <label>Título de la nota</label>
        <input type="text" placeholder="título" onChange={handleTitleChange} value={title} />
      </div>
      <div className="note_block">
        <label>Contenido de la nota</label>
        <textarea placeholder="Contenido" onChange={handleContentChange}  value={content}/>
      </div>
      <div className="note_block">
        <label>Categoria</label>
        <Categorie setCategorie={setCategorie} />
      </div>
      <div className="note_block">
        <button className="btn btn_save" onClick={handleSaveNote}>
          <SaveIcon /> Guardar
        </button>
      </div>

      {message ?<Alert message={message} type={type} close={setMessage} /> : ""}
    </form>
  );
};

export default CreateNoteForm;

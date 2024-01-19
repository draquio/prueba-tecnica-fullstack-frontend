import React from "react";
import EditNoteForm from "../components/note/Edit";
import { useParams } from "react-router-dom";
const EditNote = () => {
  const { id } = useParams();
  return <EditNoteForm id={id} />;
};

export default EditNote;

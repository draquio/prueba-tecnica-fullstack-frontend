
export const filterNotesByCategorie = async (notes,categorie) => {
  const result = notes.filter(note=> note.categorie === categorie)
  return result;
};


import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

function Todo({ todos, completeTodo, removeTodo, updateTodo }) {
  // State pour gérer l'édition d'un todo
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  const submitUpdate = value => {
   //---------------- Fonction pour soumettre la mise à jour d'un todo
    updateTodo(edit.id, value);
    // Réinitialise l'état d'édition après la mise à jour
    setEdit({
      id: null,
      value: ''
    });
  };

  // Si on clique sur un todo pour le modifoer, renvoie le formulaire d'édition(update) de puit todoform
  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  // Rendu de la liste de todos(map pour parcourir tous le tableau)
  return todos.map((todo, index) => (
    <div className={todo.isComplete ? 'todo-row complete' : 'todo-row'} key={index}>
      {/* -------------------------Affiche le texte du todo ,lorsqu'on clique sur un todo,la fonction completetodo est appelé pour faire un trait sur le todo est le marquer comme fini*/}
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.text}
      </div>
      {/* -------------------Affiche les icônes pour supprimer et éditer un todo */}
      <div className='icons'>
        {/* Icône pour supprimer un todo */}
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className='delete-icon'
        />
        {/* -------------------Icône pour éditer un todo */}
        <TiEdit
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
          className='edit-icon'
        />
      </div>
    </div>
  ));
}

export default Todo;

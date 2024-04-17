import React, { useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

function ToDoList() {
  // État pour gérer la liste des todos,todos est initialement défini comme un tableau vide parce que useState([]) initialise l'état avec un tableau vide.
  //setTodos est une fonction qui, lorsqu'elle est appelée, mettra à jour l'état todos avec une nouvelle valeur.
  //setTodos serait utilisée pour ajouter, supprimer ou mettre à jour des éléments de la liste
  const [todos, setTodos] = useState([]);

  // -----------------------------Fonction pour ajouter un nouveau todo
  const addToDo = (todo) => {
    // Vérifie si le texte du todo est vide ou ne contient que des espaces
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    // Crée un nouveau tableau avec le nouveau todo et les todos existants
    const newTodos = [todo, ...todos];
    // Met à jour l'état avec le nouveau tableau de todos
    setTodos(newTodos);
  };

  //--------------------------------Fonction pour mettre à jour un todo
  const updateTodo = (todoId, newValue) => {
    // Vérifie si le texte du todo mis à jour est vide ou ne contient que des espaces
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    // Met à jour l'état en remplaçant l'ancien todo par le nouveau dans le tableau de todos
    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  //---------------------------------- Fonction pour supprimer un todo
  const removeTodo = (id) => {
    // Crée un nouveau tableau en filtrant les todos pour exclure celui avec l'ID spécifié
    const removeArr = [...todos].filter((todo) => todo.id !== id);
    // Met à jour l'état avec le nouveau tableau de todos
    setTodos(removeArr);
  };

  //---------------------------------- Fonction pour marquer un todo comme complet ou non complet
  const completeTodo = id => {
    // Met à jour l'état en inversant la propriété isComplete du todo avec l'ID spécifié
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    // Met à jour l'état avec le tableau de todos mis à jour
    setTodos(updatedTodos);
  };

  // --------------------------------------Rendu du composant
  return (
    <div>
      <h1>Quel est le plan pour aujourd'hui ?</h1>
      {/* Composant TodoForm pour ajouter de nouveaux todos */}
      <TodoForm onSubmit={addToDo} />
      {/* Composant Todo pour afficher la liste des todos */}
      <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo} />
    </div>
  );
}

export default ToDoList;

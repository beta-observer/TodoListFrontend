import React, { useState } from 'react'
import Todo from './Todo'
import TodoStats from './TodoStats'
import FilterTodos from './FilterTodo'
import useTodoFilterForm from '../../hooks/Todos/useTodoFilterForm'


export default ({activeTodos, fullfilledTodos, todos, theme, yourTodos}) => {
  const [todoToDelete, setTodoToDelete] = useState(null)
  const [todoStats, setTodoStats] = useState({
    completed: fullfilledTodos,
    active: activeTodos
  })
  const [todosToExpose, refs, changeHandlers] = useTodoFilterForm(todos, todoToDelete, _ => setTodoToDelete(null))

  return(
    <>
      <FilterTodos 
        theme={theme}
        ref={refs}
        cHandlers={changeHandlers}
      />
      <TodoStats 
        activeTodos={todoStats.active} 
        fullfilledTodos={todoStats.completed} 
        theme={theme}
      /> 
      <div id="Todos">
        {
          todosToExpose.map((todo, index) => 
            <Todo 
              yourTodo={yourTodos}
              todoData={{
                ...todo,
                createdAt: new Date(todo.createdAt)
              }} 
              key={index+'todo'} 
              theme={theme}
              setTodoToDelete={
                todoId => {
                  setTodoToDelete(todoId)
                  todo.completed
                    ? setTodoStats({...todoStats, completed: todoStats.completed - 1})
                    : setTodoStats({ ...todoStats, active: todoStats.active - 1})
              }}
            />
          )
        }
      </div>
    </>
  )
}
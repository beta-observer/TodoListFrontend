import { useEffect, useState } from 'react'
import fetchTodos from '../api/todos/fetch-todos'
import fetchTodoStats from '../api/todos/fetch-todo-stats'


export default (token, page, setError, newTodo, setNewTodo) => {
  const [fullfilledTodos, setFullfilledTodos] = useState(null)
  const [activeTodos, setActiveTodos] = useState(null)
  const [nextPage, setNextPage] = useState(false)
  const [todos, setTodos] = useState([])
  const [loadingTodos, setLoadingTodos] = useState(false)
  
  const loadTodos = _ => {
    if(!fullfilledTodos && !activeTodos)
      return fetchTodoStats(token)
        .then(res1 => {
          setActiveTodos(res1.data.user.ActiveTodos)
          setFullfilledTodos(res1.data.user.FullfilledTodos)          
          if(res1.data.user.FullfilledTodos + res1.data.user.ActiveTodos !== 0) {
            return fetchTodos(token, page)
              .then(res => {
                setLoadingTodos(false)
                setTodos([...res.data.todos])
                if(res1.data.user.FullfilledTodos + res1.data.user.ActiveTodos > res.data.todos.length) setNextPage(true)
              })
              .catch(err => setError(err.message))
          } else {
            setLoadingTodos(false)
          }
        })
        .catch(err => setError(err.message))
    else return fetchTodos(token, page)
      .then(res => {
        setLoadingTodos(false)
        setTodos([...todos, ...res.data.todos])
        if(fullfilledTodos + activeTodos > todos.length + res.data.todos.length) setNextPage(true)
      })
      .catch(err => setError(err.message))
  }

  useEffect(_ => {
    setLoadingTodos(true)
    loadTodos()
    // eslint-disable-next-line
  }, [page])

  useEffect(_ => {
    if(newTodo){
      setTodos([newTodo, ...todos])
      setNewTodo(null)
    }
  }, [newTodo, setNewTodo, todos])

  return [fullfilledTodos, activeTodos, nextPage, setNextPage, todos, loadingTodos]
}
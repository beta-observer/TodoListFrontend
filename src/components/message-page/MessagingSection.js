import React, { useState, useEffect, useCallback } from 'react'
import useMessages from '../../hooks/Messaging/useMessages'
import Spinner from '../spiners/BigSpinner'
import WriteMessage from './WriteMessage'
import Message from './Message'
import * as Ctx from '../../utils/contexts'


export default ({ convId, markMessages }) => {
  const [ page, setPage ] = useState(1)
  const [ msgToEditLocally, setMsgToEditLocally ] = useState(null)
  
  const [ messages, loading, hasNextPage, setHasNextPage, setMessageToAdd, setMessageToDelete, setMessageToEdit ] = useMessages(page, convId, val => {})
  
  const definePosition = useCallback(e => {
    if(e.target.scrollTop === 0 && hasNextPage){
      setPage(page + 1)
      setHasNextPage(false)
    }
    // eslint-disable-next-line 
  }, [ page, setHasNextPage, hasNextPage ])
  
  useEffect(_ => {
    const messageList = document.getElementById('reversed-ScrollableList')
    messageList.scrollTop = messageList.scrollHeight
    messageList.addEventListener('scroll', definePosition)
    return _ => messageList.removeEventListener('scroll', definePosition)
  })

  useEffect(_ => {
    markMessages()
  }, [ markMessages ])

  return(    
    <Ctx.SetMessageContext.Provider value={
      { 
        edit: setMessageToEdit, 
        delete: setMessageToDelete, 
        add: setMessageToAdd 
      }
    }>
      <Ctx.SetMessageToEditLocallyContext.Provider value={{ set: val => setMsgToEditLocally(val), value: msgToEditLocally }}>
        <>
          <div id="reversed-ScrollableList">
            { loading && <Spinner/> }
            {messages.length > 0 &&
              messages.map(m => <Message key={m._id} info={m}/>)
            }
          </div>
          <WriteMessage/>
        </>
      </Ctx.SetMessageToEditLocallyContext.Provider>
    </Ctx.SetMessageContext.Provider>
  )
}
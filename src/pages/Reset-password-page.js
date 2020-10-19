import React, { memo } from 'react'
import Navbar from '../components/navbar/index'
import { BrightThemeContext } from '../utils/contexts'
import RequestPasswordResetForm from '../forms/RequestPasswordResetForm'


export default memo(_ => {
  document.title = 'MyDiary - Request password reset'

  return (
    <>
      <Navbar/>
      <BrightThemeContext.Consumer>
        {theme =>
          <div className={`formPage ${theme? 'Bright' : 'Dark'}Page`}>
            <h2 
              id="headline"
            >
              Request password reset
            </h2>
            <RequestPasswordResetForm theme={theme}/>
          </div>
        }
      </BrightThemeContext.Consumer>
    </>
  )
})

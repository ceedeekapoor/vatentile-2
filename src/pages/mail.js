import React from 'react'
import Popup from '../components/Popup';
import { Helmet } from 'react-helmet';

const Mail = () => {
    return (
        <div className="App">
          <Helmet>
            <title>Mail Box</title>
          </Helmet>
      <Popup />
    </div>
  )
}

export default Mail

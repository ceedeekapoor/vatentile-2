import React from 'react'
import Question from '../components/Questions'
import { Helmet } from 'react-helmet'
const questions = () => {
  return (
    <div>
      <Helmet>
        <title>Questions</title>
      </Helmet>
      <Question />
    </div>
  )
}

export default questions

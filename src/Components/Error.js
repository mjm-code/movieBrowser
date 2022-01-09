import React from 'react'
import { Message } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFrown  } from '@fortawesome/free-solid-svg-icons'

const Error = ({error}) => (
  <Message>
    <Message.Header>< FontAwesomeIcon icon={faFrown} size={'lg'}/> <span> </span>Something went wrong, try again.</Message.Header>
    <p>
      {error}
    </p>
  </Message>
)

export default Error
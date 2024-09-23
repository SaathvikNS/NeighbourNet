import React, { useContext } from 'react'
import { MyContext } from '../../Global/Context';
import Notloggedin from './Notloggedin';
import Loggedin from './Loggedin';

const Users = () => {
  const { loggedIn } = useContext(MyContext);
  return (
    <div style={{height: '100vh', width: '100vw', display: 'flex'}}>
      {loggedIn || true ? (
        <Loggedin />
      ) : (
        <Notloggedin />
      )}
    </div>
  )
}

export default Users
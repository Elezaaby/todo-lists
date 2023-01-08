import React from 'react'
import { Link } from 'react-router-dom'

const Notfund = () => {
  return (
    <div style={{ position: 'absolute', top: '40%', right: '50%', transform: 'translate(50%, -50% )', textAlign: 'center' }}>
      <h5 style={{ color: '#5f6368', fontSize: '35px', marginBottom: '10px' }}>Page Notfund</h5>
      <button style={{ width: '80%', fontSize: '20px', backgroundColor: 'rgb(25, 223, 157)', padding: '10px', borderRadius: '10px' }}>
        <Link to='todo-lists/home' style={{ color: '#fff' }}>
          back to home
        </Link>
      </button>
    </div>
  )
}

export default Notfund
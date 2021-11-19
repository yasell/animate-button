import React from 'react'
import { Button } from './components/button'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <p>Version 1 – Web Animations API</p>
          <Button variant='waapi'>Lets start!</Button>
          {/*<p>Version 2 – requestAnimationFrame Animate</p>*/}
          {/*<Button variant='js'>Get my sleepscape</Button>*/}
      </header>
    </div>
  )
}

export default App;

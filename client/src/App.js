import React from 'react'
import Pages from './components/Mainapages/Pages'
import Header from './components/NavBar/Header'
import { BrowserRouter as Router } from 'react-router-dom'
import { DataProvider } from './GlobalState'


function App() {
  return (
    <DataProvider>
      <Router>
        <div className='App'>
          <Header/>
          <Pages/>
        </div>
    </Router>
   </DataProvider>
  )
}

export default App
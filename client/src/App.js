import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Users from './components/Users'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  typography:{
    fontFamily: '"Inder", system-ui', 
    h1: { fontSize: '3.5em', fontWeight: 'bold' },
    h2: { fontSize: '3em', fontWeight: 'bold' },
    h3: { fontSize: '2.5em', fontWeight: 'bold' },
    h4: { fontSize: '2em', fontWeight: 'bold' },
    h5: { fontSize: '1.5em', fontWeight: 'bold' },
    h6: { fontSize: '1em', fontWeight: 'bold' }
  }
})

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/user" element={<Users />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
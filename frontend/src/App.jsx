import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Box, Button } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';

function App() {
  return(
    <Box minH={"100vh"}>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/create" element={<CreatePage/>}/>
      </Routes>
    </Box>
  )
}

export default App

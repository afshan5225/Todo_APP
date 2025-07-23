import React from 'react'
import Navbar from '../components/Navbar.jsx'
import TodoCards from '../components/TodoCards.jsx'


const Home = () => {
  return (
    <>
   
    <Navbar/>
    <main className="max-w-4xl mx-auto p-4">
      <TodoCards />
    </main>

    </>
  )
}

export default Home
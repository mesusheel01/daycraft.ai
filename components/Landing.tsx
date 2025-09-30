import React from 'react'
import { Navbar } from './subcomponent/Navbar'
import { Hero } from './subcomponent/Hero'
import { Footer } from './subcomponent/Footer'

export const Landing = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Footer />
    </div>
  )
}

import React from "react";
import Header from '../components/Header'
import Hero from '../components/Hero'
import Steps from '../components/Steps'
import Jobs from '../components/Jobs'
import Features from '../components/Features'
import Cta from '../components/Cta'
import About from "../components/About";
import Partners from '../components/Partners'
import Footer from '../components/Footer';


export default function LandingPage() {
    return (
      <>
        <Header />
        <Hero />
        <Steps />
        <Jobs />
        <Features />
        <Cta /> 
        <About />
        <Partners />
        <Footer /> 
      </>
    )
}
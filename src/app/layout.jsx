"use client";

import Header from "./components/header"
import Footer from "./components/footer"
import "./styles/styles.scss"
import localFont from 'next/font/local'
import { useState, useEffect } from "react";

const openSans = localFont({ src: './styles/fonts/OpenSans-VariableFont_wdth,wght.ttf' })

export default function RootLayout({ children }) {
  const [personalVisibility, setPersonalVisibility] = useState("hidden")

  const listener = () => {
    setPersonalVisibility(localStorage.getItem("personal"))
  }

  const resetListener = () => {
    setPersonalVisibility("hidden")
  }

  useEffect(() => {
    setPersonalVisibility(localStorage.getItem("personal"))

    window.addEventListener("personal", listener)
    window.addEventListener("reset", resetListener)

    return () => {
      window.removeEventListener('personal', listener)
      window.removeEventListener("reset", resetListener)
    }
    
  },[])


  return (
    <html lang="en">
      <body className={openSans.className}>
        <Header personal={personalVisibility}/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}

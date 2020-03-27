import React from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'


export default function Background() {
  function toggleTheme() {
    document.body.classList.toggle('dracula')

    const buttonColor = document.querySelectorAll('.ColorTheme')

    for (let e of buttonColor) {
      e.classList.toggle('hide')
    }
  }

  return (
    <div className="Edit-Theme">
      <FiMoon size={25} className="ColorTheme" onClick={toggleTheme} />
      <FiSun size={25} className="ColorTheme hide sun" onClick={toggleTheme} />
    </div>
  )
}

import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api'

import './style.css'

import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

export default function Logon() {
  const [ id, setId ] = useState('')
  const history = useHistory()

  // Se a ong ja tiver feito o login e voltar para pagina inicial sera enviada para profile
  if(localStorage.getItem('ongId')) {
    history.push('/profile')
  }

  async function handleLogin(e) {
    e.preventDefault()

    try {
      const res = await api.post('sessions', { id })

      localStorage.setItem('ongId', id)
      localStorage.setItem('ongName', res.data.name)

      history.push('/profile')
    } catch (err) {
      alert("Id informado está incorreto!")
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero"/>

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input
            placeholder="Sua Id"
            value={id}
            onChange={e => setId(e.target.value)}
          />

          <button className="button" type="submit">Entrar</button>

          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#E02041"/>
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes" className="heroes" />
    </div>
  )
}

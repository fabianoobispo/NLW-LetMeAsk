import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import {FormEvent, useState } from 'react';
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import '../styles/newRooms.scss';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase'

import { verifyStringIsEmpty } from '../utils/validators';

export function NewRoom() {
  
  const history = useHistory()
  const { user, signOut } = useAuth()
  const [newRoom, setNewRoom] = useState('');
  

  async function handleSignOut() {
    if(user) {
      await signOut()
    }
   
    history.push('/')
  }


  const  handleCreateRoom = async (event : FormEvent) => {
    event.preventDefault();
    if (verifyStringIsEmpty(newRoom)) {
			return;
		}

    // roomRef Refere-se a um objeto / entidade do banco de dados em tempo real do firebase 
		const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
			title: newRoom,
			authorId: user?.id
		});

		 history.push(`/rooms/${firebaseRoom.key}`);


    
  } 


  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>
          Tire as dúvidas da sua audiência em tempo-real
        </p>
      </aside>

      <main>

        <div className="main-content">
         <img src={logoImg} alt="Letmeask" />

          <h2>Criar uma nova sala</h2>

          <form  onSubmit={handleCreateRoom}>
            <input 
              type="text" 
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <div className="DivButtons">
            <Button type="submit">
              Criar sala
            </Button>

            <button onClick={handleSignOut} className="SignOut" >Sair</button>
            </div>
          
          </form>
          
          
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}

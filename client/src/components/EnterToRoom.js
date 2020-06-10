import React, { useState } from 'react';
// import socket from '../socket'
import axios from 'axios';


function EnterToRoom({ onLogin }) {
    const [roomId, setRoomId] = useState('')
    const [userName, setUserName] = useState('')
    const [isLoading, setLoading] = useState(false)

    const onSubmit = async () => {
        if (!roomId || !userName) {
            return alert('Неверные данные')
        }
        const obj = {
            roomId,
            userName,
        }
        setLoading(true)
        await axios.post('/rooms', obj)
        onLogin(obj)

    }

    return (
        <div className="row">
            <div className='col s6 offset-s3' style={{ paddingTop: '6rem' }}>
                <div className='card blue darken-1'>
                    <div className='card-content white-text'>
                        <div className='input-field'>
                            <input className='yellow-input'
                                value={roomId}
                                onChange={(e) => setRoomId(e.target.value)}
                                type="text"
                                placeholder='Room ID' />
                        </div>
                        <div className='input-field'>
                            <input className='yellow-input'
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                type="text"
                                placeholder='Name' />
                        </div>
                        <div className='card-action' onClick={onSubmit}>
                            <button className='btn yellow darken-4' disabled={isLoading} style={{ display: 'block', width: '100%' }}>
                                {isLoading ? 'Вход...' : 'Войти'}</button></div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default EnterToRoom;

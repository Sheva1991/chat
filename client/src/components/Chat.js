import React, { useState, useRef, useEffect } from 'react'
import socket from '../socket';

const Chat = ({ users, messages, userName, roomId, onAddMessage }) => {
    const [messageValue, setMessageValue] = useState('')
    const messagesRef = useRef(null)

    const onSendMessage = () => {
        socket.emit('ROOM:NEW_MESSAGE', {
            userName,
            roomId,
            text: messageValue
        })
        onAddMessage({ userName, text: messageValue })
        setMessageValue('')
    }

    useEffect(() => {
        messagesRef.current.scrollTo(0, 99999)
    }, [messages]);

    return (
        <div className="row">
            <div className='col s10 offset-s1' style={{ paddingTop: '6rem' }}>
                <div className='chat'>
                    <aside className='sidebar'>
                        <div><p>Комната {roomId}</p></div>
                        <hr />
                        <div>
                            Online ({users.length}):
                        </div>
                        <ul>
                            {users.map((name, index) => {
                                return (
                                    <li key={index + 1}>{name}</li>
                                )
                            })}
                        </ul>
                    </aside>
                    <div className='chat_content'>
                        <div ref={messagesRef} className='chat_messages'>
                            {
                                messages.map((message, index) => (
                                    <div key={index + 1} className='chat_message'>
                                        <p>{message.text}</p>
                                        <span>{message.userName}</span>
                                    </div>
                                ))
                            }
                        </div>
                        <form className="chat_form">
                            <div className="input-field">
                                <textarea
                                    className="materialize-textarea"
                                    value={messageValue}
                                    onChange={(e) => setMessageValue(e.target.value)}
                                    rows='3'
                                ></textarea>
                                <button type='button' onClick={onSendMessage} className='btn yellow darken-4'>Send</button>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default Chat

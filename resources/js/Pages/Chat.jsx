import React, { useState, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';

export default function Chat() {

    const { auth } = usePage().props;
    const user = auth?.user;

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {

        if (user) {

            getMessages();
            getUsers();

            const interval = setInterval(() => {

                getMessages();
                getUsers();

            }, 2000);

            return () => clearInterval(interval);
        }

    }, []);

    const getMessages = async () => {

        try {

            const res = await axios.get('/chat/messages');
            setMessages(res.data);

        } catch (err) {

            console.error(err);

        }

    };

    const getUsers = async () => {

        try {

            const res = await axios.get('/chat/users');
            setUsers(res.data);

        } catch (err) {

            console.error(err);

        }

    };

    const sendMessage = async (e) => {

    e.preventDefault();

    if (!message.trim()) return;

    try {

        await axios.post('/chat/send', {
            message: message
        });

        setMessage('');

        getMessages();

    } catch (err) {

        console.error(err);

        alert('Gagal mengirim pesan');

    }

};

const logout = async () => {

    try {

        await axios.post('/logout');

        window.location.href = '/login';

    } catch (err) {

        console.error(err);

    }

};
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Head title="Campus Chat" />

            <div
                style={{
                    display: 'flex',
                    height: '100vh',
                    background: '#f3f4f6',
                    fontFamily: 'Arial'
                }}
            >

                {/* SIDEBAR */}

                <div
                    style={{
                        width: 280,
                        background: 'linear-gradient(to bottom, #0f172a, #1e3a8a)',
                        color: 'white',
                        padding: 20,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}
                >

                    <div>

                        <h1
                            style={{
                                fontSize: 42,
                                fontWeight: 'bold',
                                marginBottom: 40
                            }}
                        >
                            Campus Chat
                        </h1>

                        <p
                            style={{
                                marginBottom: 15,
                                opacity: .8,
                                fontSize: 18
                            }}
                        >
                            Online Users
                        </p>

                        {users.map((u) => (

                            <div
                                key={u.id}
                                onClick={() => setSelectedUser(u)}
                                style={{
                                    background:
                                        selectedUser?.id === u.id
                                            ? '#2563eb'
                                            : 'rgba(255,255,255,.1)',

                                    padding: 15,
                                    borderRadius: 15,
                                    marginBottom: 12,
                                    cursor: 'pointer'
                                }}
                            >

                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }}
                                >

                                    <span
                                        style={{
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {u.name}
                                    </span>

                                    <span
                                        style={{
                                            width: 10,
                                            height: 10,
                                            background: '#4ade80',
                                            borderRadius: '50%',
                                            display: 'inline-block'
                                        }}
                                    />

                                </div>

                                <small style={{ opacity: .7 }}>
                                    Online
                                </small>

                            </div>

                        ))}

                    </div>

                    {/* LOGOUT */}

                    <button
                        type="button"
                        onClick={logout}
                        style={{
                            width: '100%',
                            padding: 15,
                            borderRadius: 15,
                            border: 'none',
                            background: '#ef4444',
                            color: 'white',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            fontSize: 18
                        }}
                    >
                        Logout
                    </button>

                </div>

                {/* CHAT AREA */}

                <div
                 style={{
                 flex: 1,
                 display: 'flex',
                 flexDirection: 'column',
                 position: 'relative',
                 zIndex: 1
           }}
         >

                    {/* HEADER */}

                    <div
                        style={{
                            background: 'white',
                            padding: 20,
                            borderBottom: '1px solid #ddd',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >

                        <h2>
                            {selectedUser
                                ? `Chat dengan ${selectedUser.name}`
                                : 'SI Semester 4'}
                        </h2>

                        <div
                            style={{
                                background: '#f3f4f6',
                                padding: '10px 15px',
                                borderRadius: 10,
                                fontWeight: 'bold'
                            }}
                        >
                            {user.name}
                        </div>

                    </div>

                    {/* MESSAGE */}

                    <div
                        style={{
                            flex: 1,
                            padding: 20,
                            overflowY: 'auto'
                        }}
                    >

                        {messages.map((msg, i) => (

                            <div
                                key={i}
                                style={{
                                    display: 'flex',
                                    justifyContent:
                                        msg.sender_id === user.id
                                            ? 'flex-end'
                                            : 'flex-start',

                                    marginBottom: 20
                                }}
                            >

                                <div
                                    style={{
                                        background:
                                            msg.sender_id === user.id
                                                ? '#2563eb'
                                                : 'white',

                                        color:
                                            msg.sender_id === user.id
                                                ? 'white'
                                                : 'black',

                                        padding: 15,
                                        borderRadius: 20,
                                        maxWidth: 320,
                                        boxShadow: '0 2px 5px rgba(0,0,0,.1)'
                                    }}
                                >

                                    <div
                                        style={{
                                            fontWeight: 'bold',
                                            marginBottom: 5
                                        }}
                                    >
                                        {msg.sender_name}
                                    </div>

                                    <div>
                                        {msg.message}
                                    </div>

                                    <div
                                        style={{
                                            marginTop: 5,
                                            fontSize: 12,
                                            opacity: .7,
                                            textAlign: 'right'
                                        }}
                                    >
                                        {msg.time}
                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                    {/* INPUT */}

                    <form
                        onSubmit={sendMessage}
                        style={{
                            display: 'flex',
                            padding: 20,
                            gap: 10,
                            background: 'white',
                            borderTop: '1px solid #ddd'
                        }}
                    >

                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Ketik pesan..."
                            style={{
                                flex: 1,
                                padding: 15,
                                borderRadius: 15,
                                border: '1px solid #ddd',
                                outline: 'none'
                            }}
                        />

                        <button
                            type="submit"
                            style={{
                                padding: '15px 30px',
                                background: '#2563eb',
                                color: 'white',
                                border: 'none',
                                borderRadius: 15,
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            Kirim
                        </button>

                    </form>

                </div>

            </div>
        </>
    );
}
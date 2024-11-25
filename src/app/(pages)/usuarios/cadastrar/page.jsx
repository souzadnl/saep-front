'use client';

import axios from "axios";
import { use, useState } from "react";

export default function Page() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [goodMessage, setgoodMessage] = useState('')
    const [badMessage, setbadMessage] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:8000/api/usuarios/', {
            name: username,
            email: email
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(function (response) {
                setgoodMessage("O usuário foi cadastrado com sucesso!")
                console.log('Usuário criado:', response);
            })
            .catch(function (error) {
                setbadMessage("Algo deu errado.")
                console.error('Erro ao criar o usuário:', error);
            });
    };

    return (
        <>
            <div className="text-center w-1/4 m-auto align-middle mt-20">
                <div className="py-10">
                    <h1 className="text-3xl text-zinc-700">Cadastro de Usuários</h1>
                </div>

                <div>
                    <form onSubmit={handleSubmit}>
                        <label className="input input-bordered flex items-center gap-2 mb-5">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                            </svg>
                            <input
                                type="text"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                className="grow"
                                placeholder="Username"
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 mb-5">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path
                                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input
                                type="text"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                className="grow"
                                placeholder="Email"
                            />
                        </label>
                        <div>
                            <button className="btn flex m-auto mb-5" type="submit">Cadastrar</button>
                            <div>
                                {goodMessage ?
                                    <span className="text-green-500">{goodMessage}</span>
                                    :
                                    <span className="text-red-500">{badMessage}</span>
                                }
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
}

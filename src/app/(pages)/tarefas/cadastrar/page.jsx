'use client'

import { useState, useEffect } from "react";
import axios from "axios";

export default function Page() {

    const [description, setDescription] = useState('');
    const [setor, setSetor] = useState('');
    const [priority, setPriority] = useState('');
    const [linked, setLinked] = useState('');
    const [users, setUsers] = useState([]);
    const [goodMessage, setGoodMessage] = useState('');
    const [badMessage, setBadMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/api/usuarios/')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Erro ao carregar os usuários:', error);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:8000/api/tarefas/', {
            description: description,
            setor: setor,
            priority: priority,
            linked: linked
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(function (response) {
                setGoodMessage("A tarefa foi cadastrada com sucesso!");
                setBadMessage('');
                console.log('Tarefa criada:', response);
            })
            .catch(function (error) {
                setBadMessage("Algo deu errado.");
                setGoodMessage('');
                console.error('Erro ao criar a tarefa:', error);
            });
    };

    return (
        <>
            <div className="text-center w-1/4 m-auto align-middle mt-20">
                <div className="py-10">
                    <h1 className="text-3xl text-zinc-700">Cadastro de Tarefas</h1>
                </div>

                <div>
                    <form onSubmit={handleSubmit}>
                        <label className="input input-bordered flex items-center gap-2 mb-5">
                            <input
                                required
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="grow"
                                placeholder="Descrição"
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 mb-5">
                            <input
                                required
                                type="text"
                                value={setor}
                                onChange={(e) => setSetor(e.target.value)}
                                className="grow"
                                placeholder="Setor"
                            />
                        </label>
                        <div className="flex gap-5 mb-5">
                            <select
                                required
                                className="select select-bordered flex items-center gap-2 mb-5"
                                value={linked}
                                onChange={(e) => setLinked(e.target.value)}
                            >
                                <option value="" disabled>Usuário</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>

                            <select
                                required
                                className="select select-bordered flex items-center gap-2 mb-5"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                            >
                                <option value="" disabled>Prioridade</option>
                                <option value="baixa">Baixa</option>
                                <option value="media">Média</option>
                                <option value="alta">Alta</option>
                            </select>
                        </div>
                        {goodMessage && <div className="text-green-500 mb-5">{goodMessage}</div>}
                        {badMessage && <div className="text-red-500 mb-5">{badMessage}</div>}
                        <button className="btn" type="submit">Cadastrar</button>
                    </form>
                </div>
            </div>
        </>
    );
}

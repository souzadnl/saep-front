'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import Card from "@/app/components/card";

export default function Page() {

    const [tarefas, setTarefas] = useState({
        fazer: [],
        fazendo: [],
        pronto: [],
    });

    const handleDeleteTask = (taskId) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    };

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/tarefas/')
            .then(function (response) {
                const data = response.data;

                const groupedTarefas = {
                    fazer: data.filter(tarefa => tarefa.status === 'A Fazer'),
                    fazendo: data.filter(tarefa => tarefa.status === 'Fazendo'),
                    pronto: data.filter(tarefa => tarefa.status === 'Pronto'),
                };

                setTarefas(groupedTarefas);
            })
            .catch(function (error) {
                console.error("Erro ao buscar tarefas:", error);
            });
    }, []);

    return (
        <>
            <div className="text-center w-1/4 m-auto align-middle mt-20">
                <div className="py-10">
                    <h1 className="text-3xl text-zinc-700">Gerenciamento de Tarefas</h1>
                </div>
            </div>

            <div>
                <div className="grid grid-cols-3 gap-4">

                    <div id="fazer">
                        <h1 className="text-center mb-10 text-3xl text-zinc-700">A Fazer</h1>
                        <div className="flex flex-col items-center">
                            {tarefas.fazer.length > 0 ? (
                                tarefas.fazer.map(tarefa => (
                                    <Card
                                        key={tarefa.id}
                                        id={tarefa.id}
                                        description={tarefa.description}
                                        setor={tarefa.setor}
                                        priority={tarefa.priority}
                                        linked={tarefa.linked}
                                        status={tarefa.status}
                                        onDelete={handleDeleteTask}
                                    />
                                ))
                            ) : (
                                <p>Sem tarefas nesta coluna.</p>
                            )}
                        </div>
                    </div>

                    <div id="fazendo">
                        <h1 className="text-center mb-10 text-3xl text-zinc-700">Fazendo</h1>
                        <div className="flex flex-col items-center">
                            {tarefas.fazendo.length > 0 ? (
                                tarefas.fazendo.map(tarefa => (
                                    <Card
                                        key={tarefa.id}
                                        id={tarefa.id}
                                        description={tarefa.description}
                                        setor={tarefa.setor}
                                        priority={tarefa.priority}
                                        linked={tarefa.linked}
                                        status={tarefa.status}
                                        onDelete={handleDeleteTask}
                                    />
                                ))
                            ) : (
                                <p>Sem tarefas nesta coluna.</p>
                            )}
                        </div>
                    </div>

                    <div id="pronto">
                        <h1 className="text-center mb-10 text-3xl text-zinc-700">Pronto</h1>
                        <div className="flex flex-col items-center">
                            {tarefas.pronto.length > 0 ? (
                                tarefas.pronto.map(tarefa => (
                                    <Card
                                        key={tarefa.id}
                                        id={tarefa.id}
                                        description={tarefa.description}
                                        setor={tarefa.setor}
                                        priority={tarefa.priority}
                                        linked={tarefa.linked}
                                        status={tarefa.status}
                                        onDelete={handleDeleteTask}
                                    />
                                ))
                            ) : (
                                <p>Sem tarefas nesta coluna.</p>
                            )
                            }
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

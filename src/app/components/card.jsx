import { useState, useEffect } from "react";
import axios from "axios";

export default function Card(props) {
    const [status, setStatus] = useState(props.status);
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState(props.description);
    const [setor, setSetor] = useState(props.setor);
    const [priority, setPriority] = useState(props.priority);
    const [responsible, setResponsible] = useState(props.linked);
    const [responsibles, setResponsibles] = useState([]);
    const [responsibleName, setResponsibleName] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8000/api/usuarios/")
            .then((response) => {
                setResponsibles(response.data);
                const responsibleUser = response.data.find(r => r.id === responsible);
                if (responsibleUser) {
                    setResponsibleName(responsibleUser.name);
                }
            })
            .catch((error) => {
                console.error("Erro ao carregar responsáveis:", error);
            });
    }, [responsible]);

    const handleStatusChange = (event) => {

        if (!isEditing) {
            const newStatus = event.target.value;
            setStatus(newStatus);

            axios.patch(`http://localhost:8000/api/tarefas/${props.id}/`, {
                status: newStatus,
            })
            .then(response => {
                console.log("Status alterado com sucesso:", response.data);
                window.location.reload();
            })
            .catch(error => {
                console.error("Erro ao atualizar status:", error);
            });
        }
    };

    const handleEdit = () => {
        if (isEditing) {
            axios.patch(`http://localhost:8000/api/tarefas/${props.id}/`, {
                description,
                setor,
                priority,
                linked: responsible,
            })
            .then(response => {
                console.log("Tarefa atualizada com sucesso:", response.data);
                setIsEditing(false);
                window.location.reload();
            })
            .catch(error => {
                console.error("Erro ao atualizar tarefa:", error);
            });
        } else {
            setIsEditing(true);
        }
    };

    const handleDelete = () => {
        if (window.confirm("Tem certeza que deseja excluir esta tarefa?")) {
            axios.delete(`http://localhost:8000/api/tarefas/${props.id}/`)
                .then(response => {
                    console.log("Tarefa excluída com sucesso:", response.data);
                    props.onDelete(props.id);
                    window.location.reload();
                })
                .catch(error => {
                    console.error("Erro ao excluir tarefa:", error);
                });
        }
    };

    return (
        <div className="rounded-xl w-80 border border-solid border-1 p-5 border-gray-400 bg-white my-5">
            <div className="mb-5">
                <h1 className="text-xl text-zinc-700 text-center mb-3">
                    {isEditing ? (
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="input input-bordered w-full"
                        />
                    ) : (
                        description
                    )}
                </h1>

                {isEditing ? (
                    <input
                        type="text"
                        value={setor}
                        onChange={(e) => setSetor(e.target.value)}
                        className="input input-bordered w-full mb-2"
                    />
                ) : (
                    <p className="text-zinc-700">Setor: {setor}</p>
                )}

                {isEditing ? (
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="select select-bordered w-full mb-2"
                    >
                        <option value="Baixa">Baixa</option>
                        <option value="Média">Média</option>
                        <option value="Alta">Alta</option>
                    </select>
                ) : (
                    <p className="text-zinc-700">Prioridade: {priority}</p>
                )}

                {isEditing ? (
                    <select
                        value={responsible}
                        onChange={(e) => setResponsible(e.target.value)}
                        className="select select-bordered w-full mb-2"
                    >
                        {responsibles.map((resp) => (
                            <option key={resp.id} value={resp.id}>
                                {resp.name}
                            </option>
                        ))}
                    </select>
                ) : (
                    <p className="text-zinc-700">
                        Vinculado a: {responsibleName || 'Responsável não encontrado'}
                    </p>
                )}
            </div>

            <form action="">
                <div className="flex justify-between">
                    <select
                        required
                        className="select select-bordered flex items-center gap-2 mb-5"
                        value={status}
                        onChange={handleStatusChange}
                        disabled={isEditing}
                    >
                        <option value="A Fazer">A Fazer</option>
                        <option value="Fazendo">Fazendo</option>
                        <option value="Pronto">Pronto</option>
                    </select>
                </div>

                <div className="flex mb-3 justify-end">
                    <button className="btn mr-5" type="button" onClick={handleEdit}>
                        {isEditing ? 'Salvar' : 'Editar'}
                    </button>
                    <button className="btn" type="button" onClick={handleDelete}>Excluir</button>
                </div>
            </form>
        </div>
    );
}

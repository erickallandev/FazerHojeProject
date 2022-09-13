import { useEffect, useState } from 'react';

const App = () => {
    const [novaAtividade, setNovaAtividade] = useState('');
    const [listaAtividades, setListaAtividades] = useState(['']);

    const getAtividades = async () => {
        try {
            const response = await fetch('http://localhost:3001/atividades');
            const jsonData = await response.json();

            setListaAtividades(jsonData.atividades);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getAtividades();
    }, []);

    const onSubmeterForm = async (e) => {
        e.preventDefault();
        try {
            const body = { atividade: novaAtividade };
            await fetch("http://localhost:3001/atividades", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            window.location.reload();
        } catch (err) {
            console.error(err.message);
        }
    }

    const deletarAtividade = async (id) => {
        try {
            await fetch(`http://localhost:3001/atividades/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-type': 'application/json'
                }
            });
            window.location.reload();
        } catch (err) {
            console.error(err.message);
        }
}

const atualizarEstado = async (id, estado) => {
        try {
            const body = { estado: estado ? false : true };
            await fetch(`http://localhost:3001/atividades/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            window.location.reload();
        } catch (err) {
            console.error(err.message);
        }
    }

return (
    <div className="flex flex-col bg-gray-700 box-border min-h-screen justify-start items-center">
        <div className='w-9/12'>

            <div className='font-black font-lobster text-3xl md:text-6xl italic text-center text-white tracking-wide mt-12'>O que temos para hoje?</div>

            {/* Adicionar nova atividade */}

            <div className='flex mt-16 h-12 mb-12'>
                <form onSubmit={onSubmeterForm} className='flex flex-1'>
                    <input type='text' placeholder='Insira aqui a sua nova atividade' value={novaAtividade} className='flex flex-1 outline-none text-center bg-white rounded-full' onChange={(e) => setNovaAtividade(e.target.value)}></input>
                    <button className='rounded-full hover:bg-white hover:text-gray-700 bg-gray-700 text-white ml-5 justify-center flex items-center text-sm cursor-pointer p-4 border-2 ease-in duration-200'>Confirmar</button>
                </form>
            </div>

            {/* Listar atividades */}

                        {listaAtividades.map((item, index) => (
                            <div key={index} className={`flex h-12 border-4 border-gray-700 rounded-full`}>
                                <div className='mr-2 flex justify-center items-center'>
                                    <input className='w-8 h-8 bg-red-500' type='checkbox' checked={item.estado} onClick={() => atualizarEstado(item.id, item.estado)}>
                                    </input>
                                </div>
                                <div className={`rounded-full flex flex-1 justify-center items-center ${item.estado ? 'bg-gray-600' : 'bg-white'} ${item.estado ? 'text-gray-700' : 'text-black'} hover:bg-gray-400`}>{item.atividade}</div>
                                <div className={`ml-2 flex justify-center items-center rounded-full ${item.estado ? 'bg-red-900' : 'bg-red-600'} text-white cursor-pointer w-10 h-10`} onClick={() => deletarAtividade(item.id)}>X</div>
                            </div>
                        ))}
        </div>

    </div>
)

}

export default App;
import { useEffect, useState } from 'react';
import Axios from 'axios';

const App = () => {
    const [novaAtividade, setNovaAtividade] = useState('');
    const [listaAtividades, setListaAtividades] = useState(['']);
    const [registrarEmail, setRegistrarEmail] = useState('');
    const [registrarSenha, setRegistrarSenha] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputSenha, setInputSenha] = useState('');
    const [loginStatus, setLoginStatus] = useState(localStorage.getItem("token") ? true : false);
    const [criarConta, setCriarConta] = useState(false);
    const [user, setUser] = useState('');


    const registrarConta = () => {
        Axios.post("/novaconta", {
            email: registrarEmail,
            senha: registrarSenha
        }).then((response) => {
            if (!response.data.sucess) {
                alert("Erro! Por favor, tente novamente.")
            } else {
                if (response.data.sucess) {
                    console.log(response)
                    setInputEmail(response.data.usuario.email)
                    setCriarConta(false)
                } else {
                    console.log(response)
                }
            }

        })
    }

    const obterUser = async () => {
        try {
            let token = localStorage.getItem("token");
            const response = await Axios.get('/obterusuario', { headers: { Authorization: token } });
            setUser(response.data)
        } catch (err) {
            console.error(err.message);
        }
    }

    const handleCriarConta = () => {
        setCriarConta(true)
    }

    const fazerLogin = () => {
        Axios.post("/login", {
            email: inputEmail,
            senha: inputSenha
        }).then((response) => {
            if (!response.data.sucess) {
                setLoginStatus(false)
                alert(response.data.message)
            } else {
                localStorage.setItem("token", response.data.token)
                setLoginStatus(true);
                setUser(response.data.email);
                getAtividades();
            }
        })
    }


    const getAtividades = async () => {
        try {
            obterUser();
            let token = localStorage.getItem("token");
            const response = await Axios.get('/atividades', { headers: { Authorization: token } });
            setListaAtividades(response.data.atividades);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getAtividades();
    }, [listaAtividades]);

    const onSubmeterForm = async (e) => {
        e.preventDefault();
        try {
            let token = localStorage.getItem("token");
            const body = { atividade: novaAtividade };
            await fetch("/atividades", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${token}`
                },
                body: JSON.stringify(body)
            });
            setNovaAtividade('');
        } catch (err) {
            console.error(err.message);
        }
    }

    const deletarAtividade = async (id) => {
        try {
            let token = localStorage.getItem("token");
            await fetch(`/atividades/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-type': 'application/json',
                    "Authorization": `${token}`
                }
            });

        } catch (err) {
            console.error(err.message);
        }
    }

    const atualizarEstado = async (id, estado) => {
        try {
            let token = localStorage.getItem("token");
            const body = { estado: estado ? false : true };
            await fetch(`/atividades/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${token}`
                },
                body: JSON.stringify(body)
            });

        } catch (err) {
            console.error(err.message);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        setLoginStatus(false)
    }

    return (
        <div className="flex flex-col bg-gray-700 box-border min-h-screen justify-between items-center">
            <div className='flex flex-col w-10/12'>
                {loginStatus &&
                    <div className='flex justify-end items-center mt-3'>
                        <div className='text-white mr-5'>Olá, {user}</div>
                        <div className='inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out cursor-pointer' onClick={handleLogout}> Sair </div>
                    </div>
                }
                <div className='flex flex-col md:flex-row justify-center items-center'>

                    <div className='font-black font-lobster text-4xl md:text-6xl italic text-center drop-shadow-md text-white tracking-wide mt-12'>O que temos para hoje?</div>
                </div>
                {!loginStatus && (
                    <div className='flex flex-col justify-center items-center mt-12 text-1xl md:text-2xl mb-10'>
                        <div className='text-white'>
                            Já tenho conta:
                        </div>

                        <div className='text-white'>
                            <div className='flex flex-col text-center text-black w-64 mt-2 mb-2'>
                                <input className='text-base p-2' type='text' placeholder='usuário123' value={inputEmail} onChange={(e) => { setInputEmail(e.target.value) }}>
                                </input>

                                <input className='text-base p-2' type='password' placeholder='senha123' onChange={(e) => setInputSenha(e.target.value)}></input>
                            </div>
                        </div>

                        <div className='text-white'>
                            <div className='text-base mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer' onClick={fazerLogin}>
                                Fazer login
                            </div>
                        </div>
                    </div>
                )}
                {!loginStatus && !criarConta && (

                    <div className='bg-green-500 text-center hover:bg-green-700 w-4/10 mx-auto text-white font-bold py-2 px-4 rounded-full cursor-pointer' onClick={handleCriarConta}> Ainda não tenho conta </div>

                )}
                {criarConta && (
                    <div className='flex flex-col justify-center items-center mt-12 text-1xl md:text-2xl placeholder'>
                        <div className='text-white'>
                            Cadastrar nova conta:
                        </div>

                        <div className='text-white mt-2 mb-2'>
                            <div className='flex flex-col text-center text-black w-64'>
                                <input className='text-base p-2' type='text' placeholder='usuário123' onChange={(e) => { setRegistrarEmail(e.target.value) }}>
                                </input>

                                <input className='text-base p-2' type='password' placeholder='senha123' onChange={(e) => setRegistrarSenha(e.target.value)}></input>
                            </div>
                        </div>

                        <div className='text-white'>
                            <div className='text-base bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer' onClick={registrarConta}>
                                Registrar conta
                            </div>
                        </div>
                    </div>
                )}

                {/* Adicionar nova atividade */}
                {loginStatus &&
                    <div className='flex mt-12 md:mt-16 mb-12'>
                        <form onSubmit={onSubmeterForm} className='flex w-full flex-col md:flex-row justify-center items-center'>

                            <input type='text' placeholder='Insira aqui a sua nova atividade' value={novaAtividade} className='flex w-full md:flex-1 outline-none text-center bg-white rounded-full p-2 md:p-4' onChange={(e) => setNovaAtividade(e.target.value)}></input>

                            <button className='flex rounded-full w-full md:w-auto hover:bg-white hover:text-gray-700 bg-gray-700 text-white md:ml-2 justify-center items-center font-bold text-sm cursor-pointer p-2 md:p-4 border-2 ease-in duration-200 mt-2 md:mt-0'>Inserir</button>
                        </form>
                    </div>
                }

                {/* Listar atividades */}

                {loginStatus && listaAtividades.length > 0 &&
                    <div>
                        {listaAtividades.map((item, index) => (
                            <div key={index} className={`flex items-center justify-center min-h-12 border-4 border-gray-700 rounded-full`}>
                                <div className='mr-2 flex justify-center items-center'>
                                    <input className='w-8 h-8 accent-gray-900 hover:accent-gray-500' type='checkbox' checked={item.estado} onChange={() => atualizarEstado(item.id, item.estado)}>
                                    </input>
                                </div>

                                <div className={`rounded-full flex flex-1 justify-center items-center ${item.estado ? 'bg-gray-600' : 'bg-white'} ${item.estado ? 'text-gray-700' : 'text-gray-900'} ${item.estado ? 'hover:none' : 'hover:bg-gray-400'} text-center py-2 px-3`}>{item.atividade}</div>

                                <div className={`ml-2 flex justify-center items-center rounded-full ${item.estado ? 'bg-red-900' : 'bg-red-600'} text-white cursor-pointer w-10 h-10 hover:scale-125 ease-in duration-100`} onClick={() => deletarAtividade(item.id)}>X</div>
                            </div>
                        ))}
                    </div>
                }


            </div>
            <footer className='w-full bg-gray-600 text-white text-sm flex justify-center p-4 mt-6'>Developed by <a href='https://www.eawebdev.com' target='_blank' rel='noreferrer' className='mx-1 hover:text-yellow-500 hover:text ease-in duration-100'>EA WebDev</a> 2022</footer>
        </div>
    )

}

export default App;
import { useState } from "react"
import axios from "axios"

export default function LoginModal({onClose, onLoginSuccess}){
    const [isLogin, setIsLogin] = useState(true)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false)
    const [err, setErr] = useState('')
    const [msg, setMsg] = useState('')

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const endpoint = isLogin ? '/api/login' : '/api/register'
            const response = await axios.post(endpoint, { username, password}, {withCredentials:true})

            if(isLogin){
                setErr('')
                console.log('logged in')
                const res = await axios.get('/api/me', { withCredentials: true });
                onLoginSuccess(res.data.username);
                onClose()
            } else {
                setErr('')
                setMsg('Registered! You can now log in.')
                setIsLogin(true)
            }

        } catch (err) {
            console.error('Login error:', err.response?.data || err.message);
            setErr(err.response?.data?.error || 'Something went wrong');
        }
    }

    const handleClose = () => {
        setIsClosing(true)
        setTimeout(() => {
            onClose()
        }, 100)
    }

    return (
        <div className="font-atma fixed inset-0 flex justify-center items-center bg-black/50 transition-opacity">
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow relative">
                <button onClick={handleClose} className="font-mono absolute top-2 right-3 text-2xl font-bold text-gray-500 hover:text-black">×</button>
                <h2 className="text-xl font-bold mb-4">{isLogin ? 'Sign In To Review' : 'Register'}</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">                   
                    <div className="w-full max-w-sm mb-2">
                        <label className="block mb-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border border-black rounded-md px-3 py-2"
                        />
                    </div>

                    <div className="w-full max-w-sm mb-4">
                        <label className="block mb-1">Password</label>
                        <div className="flex items-center border border-black rounded-md overflow-hidden">
                            <input
                                type={isPasswordVisible ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 outline-none"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-black bg-transparent"
                            >
                            {isPasswordVisible ? 'HIDE' : 'SHOW'}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mt-3">
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                    {msg && (
                        <p className="text-green-500 text-sm text-center mt-2">{msg}</p>
                    )}
                    {err && (
                        <p className="text-red-500 text-sm text-center mt-2">{err}</p>
                    )}

                    <p className="text-sm text-center text-gray-600">
                        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                        <button
                            type="button"
                            onClick={() => {
                                setIsLogin(!isLogin)
                                setErr('')
                                setMsg('')
                            }}
                            className="text-blue-500 underline hover:text-blue-700"
                        >
                        {isLogin ? 'Register' : 'Login'}
                        </button>
                    </p>
                </form>
                <div>
                    <p>
                        
                    </p>
                </div>
            </div>
            
        </div>
    )
}





// {onClose}
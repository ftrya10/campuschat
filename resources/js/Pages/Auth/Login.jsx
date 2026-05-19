import { Head, useForm } from '@inertiajs/react';

export default function Login() {

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post('/login');
    };

    return (
        <>
            <Head title="Login" />

            <div
                style={{
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: '#f3f4f6'
                }}
            >

                <form
                    onSubmit={submit}
                    style={{
                        background: 'white',
                        padding: 40,
                        borderRadius: 20,
                        width: 350,
                        boxShadow: '0 5px 20px rgba(0,0,0,.1)'
                    }}
                >

                    <h1
                        style={{
                            fontSize: 30,
                            fontWeight: 'bold',
                            marginBottom: 30,
                            textAlign: 'center'
                        }}
                    >
                        Campus Chat
                    </h1>

                    <input
                        type="email"
                        placeholder="Email"
                        value={data.email}
                        onChange={(e) =>
                            setData('email', e.target.value)
                        }
                        style={{
                            width: '100%',
                            padding: 15,
                            marginBottom: 15,
                            borderRadius: 10,
                            border: '1px solid #ddd'
                        }}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={data.password}
                        onChange={(e) =>
                            setData('password', e.target.value)
                        }
                        style={{
                            width: '100%',
                            padding: 15,
                            marginBottom: 20,
                            borderRadius: 10,
                            border: '1px solid #ddd'
                        }}
                    />

                    {errors.email && (
                        <div style={{ color: 'red', marginBottom: 10 }}>
                            {errors.email}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={processing}
                        style={{
                            width: '100%',
                            padding: 15,
                            background: '#2563eb',
                            color: 'white',
                            border: 'none',
                            borderRadius: 10,
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: 16
                        }}
                    >
                        LOGIN
                    </button>

                </form>

            </div>
        </>
    );
}
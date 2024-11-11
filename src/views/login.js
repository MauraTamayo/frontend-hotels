"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Checkbox, Button, Typography, Box, Link, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { login } from '@/apiFunctions/authServices';


const ContainerBoxStyled = styled(Box)(() => ({
    flexGrow: 1,
    backgroundColor: '#070F1B',
    height: 'calc(100vh - 2px)',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
}));

const BodyBoxStyled = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    backgroundColor: '#050E18',
    borderRadius: '8px',
    border: '0.5px solid #212938',
    width: '30rem'
}));

const FormBoxStyled = styled(Box)(() => ({
    width: '100%',
    margin: 'auto',
    flexDirection: 'column',
    justifyContent: 'center',
    display: 'flex',
    height: '70%',
}));

const TextFieldBoxStyled = styled(TextField)(() => ({
    margin: "3% 0",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    "& .MuiOutlinedInput-root": {
        color: "#f5f5f5", // Color del texto en el campo
        "& fieldset": {
            borderColor: "#b3b3b3", // Color del borde en estado desenfocado
        },
        "&:hover fieldset": {
            borderColor: "#80d8ff", // Color del borde al pasar el cursor
        },
        "&.Mui-focused fieldset": {
            borderColor: "#40c4ff", // Color del borde cuando está seleccionado
        },
    },
    "& .MuiInputLabel-root": {
        color: "#b3b3b3", // Color del label en estado desenfocado
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: "#40c4ff", // Color del label cuando el campo está enfocado
    },
    "& .MuiOutlinedInput-root input": {
        color: "#f5f5f5", // Color del texto del placeholder y el input
    },
}));

const ButtomStyled = styled(Button)(() => ({
    backgroundColor: '#EFF1F7',
    color: '#002A88'
}));

const ButtomStyledLink = styled(Button)(() => ({
    backgroundColor: '#0B0E14',
    margin: '2% 0',
    color: '#fff',
    width: '100%'
}));

const CustomCheckbox = styled(Checkbox)({
    color: "white", // Color del checkbox antes de hacer clic
    "&.Mui-checked": {
        color: "#1976d2", // Color del checkbox después de hacer clic
    },
});

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState(null);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Activa el estado de carga
        try {
            await login(credentials);
            router.push('/hotels');
        } catch (error) {
            setError('Error al iniciar sesión. Verifica tus credenciales.');
        } finally {
            setLoading(false); // Desactiva el estado de carga
        }
    };

    return (
        <ContainerBoxStyled>
            <BodyBoxStyled>
                <h1 style={{ justifyContent: 'center', display: 'flex' }}>Bienvenido!</h1>
                <Typography variant="body4" gutterBottom>
                    Iniciar sesión para continuar
                </Typography>
                <FormBoxStyled component="form" onSubmit={handleSubmit}>
                    <TextFieldBoxStyled
                        label="username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        placeholder="tu@correo.com"
                        name="username"
                        onChange={handleChange}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                        <Link
                            component="button"
                            type="button"
                            variant="body2"
                            sx={{ alignSelf: 'baseline' }}
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </Box>
                    <TextFieldBoxStyled
                        label="Contraseña"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        placeholder="••••••"
                        name="password"
                        onChange={handleChange}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', margin: '1rem 0' }}>
                        <CustomCheckbox />
                        <Typography variant="body2">Acuérdate de mi</Typography>
                    </Box>
                    <ButtomStyled type="submit" fullWidth variant="contained" disabled={loading}>
                        {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                    </ButtomStyled>
                    {/* <Typography variant="body2" sx={{ margin: '1rem 0' }}>
                        ¿No tienes una cuenta?<Link href="/signup">Regístrate</Link>
                    </Typography> */}
                    <Divider sx={{ '&::before': { background: "#B3B3B3" }, '&::after': { background: "#B3B3B3" } }}> or</Divider >
                    <ButtomStyledLink variant="outlined" fullWidth>
                        Sign in with Google
                    </ButtomStyledLink>
                    <ButtomStyledLink variant="outlined" fullWidth>
                        Sign in with Facebook
                    </ButtomStyledLink>
                </FormBoxStyled>
                {error && <Typography color="error" sx={{ marginTop: '1rem' }}>{error}</Typography>}
            </BodyBoxStyled>
        </ContainerBoxStyled>
    );
};

export default Login;

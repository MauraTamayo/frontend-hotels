const baseUrlApi = process.env.NEXT_PUBLIC_API_URL

export const register = async (data) => {
    try {
        console.log("ENTROregistro")
        const response = await fetch(`${baseUrlApi}/signup`, {
            method: "POST",
            body: credentials
        })
        console.log("RES", response)
        return await response.json()
    } catch (error) {
        // Verificar si el error tiene respuesta y si es un error de cliente (400)
        if (error.response && error.response.status === 400) {
            throw new Error("El nombre de usuario ya está en uso");
        } else {
            throw new Error("Ocurrió un problema al procesar el registro. Intente más tarde.");
        }
    }
};

// export const login = async (credentials) => {
//     const temp = JSON.stringify(credentials)
//     console.log("credenciales desde back del front temp: ", temp)
//     try {
//         const response = await fetch(`${baseUrlApi}/login`, {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: temp
//         })
//         console.log("credenciales desde back del front response.body: ", response.body)
//         return response.json()
//     } catch (error) {
//         console.log(error)
//         return []
//     }
// }


export const login = async (credentials) => {
    console.log("credentials login", credentials)
        try {
            const data = await fetch('http://localhost:3500/api/login', {
                method: "POST",
                body: JSON.stringify(credentials)
            })
            const posts = await data.json()
            console.log("credenciales desde back del front posts: ", posts)

            return posts
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }
    }
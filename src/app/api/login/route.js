export async function POST(req) {
    try {
        // Asegúrate de que credentials sea un objeto plano
        const plainCredentials = await req.json();
        console.log("credenciales desde back del server credentials: ", plainCredentials);

        const data = JSON.stringify(plainCredentials);
        console.log("dataPost: ", data);

        const response = await fetch('http://localhost:8080/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Establece el tipo de contenido como JSON
            },
            body: data,
        });

        // Comprueba si la respuesta fue exitosa
        if (!response.ok) {
           console.log("Res Exitosa:" , response);
        }

        // Devuelve la respuesta en JSON
        const responseData = await response.json();
        console.log("responseData:" , responseData);
        return Response.json(responseData);
    
    } catch (error) {
        console.error("Error en la solicitud POST:", error);
        // Devuelve una respuesta con un mensaje de error y el código de estado 500
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
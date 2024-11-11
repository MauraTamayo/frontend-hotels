"use server"

// export async function GET() {
//     return fetch('http://localhost:8088/api/hotels', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': '*'
//         },
//     }).then(async (res) => Response.json(await res.json())).catch((error) => { throw new Error(error) });
// }

export async function POST(req) {
    const data = await req.json();
    console.log("dataPost: ", data) 
    return fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(data)
    }).then(async (res) => Response.json(await res.json())).catch((error) => { throw new Error(error) });
}



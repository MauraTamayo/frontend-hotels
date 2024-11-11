/* const dummyData = {
  id: 1,
  username: "mod",
  email: "mod@pica.com",
  roles: ["ROLE_USER", "ROLE_MODERATOR"],
}
 */
export async function POST(req) {
  try {
    const plainCredentials = await req.json()
    console.log(
      "credenciales desde back del server credentials: ",
      plainCredentials
    )

    const data = JSON.stringify(plainCredentials)
    console.log("dataPost: ", data)

    const response = await fetch("http://localhost:8080/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })

    if (!response.ok) {
      throw new Error(error)
    }

    const responseData = await response.json()
    console.log("responseData:", responseData)
    return Response.json(responseData)
  } catch (error) {
    console.error("Error en la solicitud POST:", error)
    throw new Error(error)
  }
}

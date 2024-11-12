import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const plainPayment = await req.json()
    console.log(
      "Pago desde back del server reservas: ",
      plainPayment
    )

    const data = JSON.stringify(plainPayment)
    console.log("dataPost: ", data)

    const response = await fetch("http://localhost:8088/api/availability/reservation/pay/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })

    if (!response.ok) {
        return new NextResponse("error",{status:response.status})
    }

    const responseData = await response.json()
    console.log("responseData:", responseData)
    return Response.json(responseData)
  } catch (error) {
    console.log("Entro en el catch")
    return new NextResponse("Internal server error",{status:500})
   
  }
}

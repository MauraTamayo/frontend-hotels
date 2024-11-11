// FUNCIONES DE COMUNICACIONES DE API INTERNA 
const baseUrlApi = process.env.NEXT_PUBLIC_API_URL

export const listHotels = async () => {
    try {
        const response = await fetch('http://localhost:3500/api/hotels')
        console.log(response.json())
        return await response.json()
    } catch (error) {
        return []
    }
  }


//   export const saveHotel = async (params) =>  {
//     try {
//         const response = await fetch(`${baseUrlApi}/hotels`, {
//             method: "POST",
//             body: params
//         })
//         return await response.json()
//     } catch (error) {
//         console.log(error)
//         return []
//     }
//   }
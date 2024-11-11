import { listHotels } from "@/apiFunctions/hotels"

export async function Hotels() {


    const result = await listHotels()
    return (
        <div>Cantidad de hoteles {result.length}</div>
      )
}

export default Hotels 
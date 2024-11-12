// Apifunctions/paymentSewrvices.js
const baseUrlApi = process.env.NEXT_PUBLIC_API_URL

export const bookingPayment = async (data) => {
    try {
        const response = await fetch(`${baseUrlApi}/payment`, {
            method: "POST",
            body: JSON.stringify(data)
        })
        const posts = await response.json()
        console.log("pago de reserva desde back del front posts: ", posts)
        return posts
    } catch (error) {
        throw new Error(error);
    }
}
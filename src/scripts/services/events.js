import { baseUrl, repositoriesQuantity } from "../variables.js"

async function events(userName){

    const response = await fetch(`${baseUrl}/${userName}/events?per_page=${repositoriesQuantity}`)
    return await response.json()

    // const token = import.meta.env.VITE_GITHUB_TOKEN;
    // const response = await fetch(`https://api.github.com/users/${userName}/events`, {
    //     headers: {
    //         Authorization: `token ${token}`
    //     }
    // })
    // return await response.json()
}

export {events}
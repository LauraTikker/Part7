import axios from 'axios'

export const getCountry = async (name) => {
    const url = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`

    const response = await axios.get(url)
    console.log(response)
    return response
}

export default { getCountry }

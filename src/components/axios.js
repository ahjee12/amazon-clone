import axios  from 'axios'

const instance = axios.create({
    //The API (cloud function) URL
    // baseURL: 'https://us-central1-clone-3cea9.cloudfunctions.net/api'
    // baseURL: 'http://localhost:5001/clone-3cea9/us-central1/api'
    baseURL: 'http://localhost:5001/clone-3cea9/us-central1/api'
})

export default instance
import handleApiErrors from './scripts'
import "./scripts"

const fetchCalls = {
  fetchData: (path) => {
    return fetch(`http://localhost:3001/api/v1/${path}`)
      .then(response => response.json())
      .catch(err => handleApiErrors(err))
  },

  postData: (url, dataObject) => {
  fetch (url, {
    method: 'POST',
    body: JSON.stringify(dataObject),
    headers:{
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    console.log('RESPONSE>>>>>', response)
    if(!response.ok){
      throw new Error('Please select a date.')
    } else {
      response.json()
    }
  })
  .then(data => console.log(data))
  .catch(err => {
    console.log(err)
    dateError.classList.remove('hidden')
    dateError.innerText = err
    setTimeout (function() {
      requestConfirmation.classList.add('hidden')
      }, 3000)
    })
  },
};


export default fetchCalls;

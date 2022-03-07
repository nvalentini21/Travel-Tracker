import handleApiErrors from './scripts'

const fetchCalls = {
  fetchData: function (path) {
    return fetch(`http://localhost:3001/api/v1/${path}`)
      .then(response => response.json())
      .catch(err => handleApiErrors(err))
  },

  postData: function (url, dataObject) {
  fetch (url, {
    method: 'POST',
    body: JSON.stringify(dataObject),
    headers:{
      'Content-Type': 'application/json'
      }
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => handleApiErrors(err))
  },
};


export default fetchCalls;

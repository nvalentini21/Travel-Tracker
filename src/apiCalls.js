const fetchCalls = {
  fetchData: function (path) {
    return fetch(`http://localhost:3001/api/v1/${path}`)
      .then(response => response.json())
      .catch(err => handleApiErrors(err))
  },

postData: function (url, someData) {
  fetch (url, {
    method: 'POST',
    body: JSON.stringify(someData),
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

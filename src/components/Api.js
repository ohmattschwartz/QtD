let Api = {
  url: 'https://beoderp.herokuapp.com',
  bearer_token: 'Bearer question-the-day',
  access: (url, method, body) => {
    // Combine any supplied headers with the default ones
    let headers = { 'Authorization': Api.bearer_token, 'Content-Type': 'application/json' }

    return window.fetch(`${Api.url}/${url}`, {
      method: method,
      headers: headers,
      body: body}).then((response) => response.json())
  }
}

export default Api

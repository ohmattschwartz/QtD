let Api = {
  url: 'https://beoderp.herokuapp.com',
  bearer_token: 'Bearer question-the-day',
  access: (url, method, body) => {
    // Combine any supplied headers with the default ones
    let headers = { 'Authorization': Api.bearer_token, 'Content-Type': 'application/json' }

    return window.fetch(`${Api.url}/${url}`, {
      method: method,
      headers: headers,
      body: JSON.stringify(body)}).then((response) => {
        let contentType = response.headers.get('content-type')
        if (contentType && contentType.indexOf('application/json') !== -1) {
          return response.json()
        }
      })
  }
}

export default Api

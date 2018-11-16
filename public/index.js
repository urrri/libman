(async () => {
  const fetchJson = async (url, opts = {}) => {

    try {
      Object.assign(opts || {}, {
        headers: Object.assign(opts.headers || {}, {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        })
      });
      const rawResponse = await fetch(url, opts);
      const content = await rawResponse.json();
      console.log(opts.method, url, content);
      return content;
    } catch (e) {
      console.error("Error", e || e.message)
    }
  };

  const book = await fetchJson('/api/v1/books', {
    method: 'POST',
    body: JSON.stringify({book: {title: 'book1', author: 'author1', published: 1999}})
  });

  const id = book._id;

  const books = await fetchJson('/api/v1/books', {method: 'GET'});

  await fetchJson(`/api/v1/books/${id}`, {method: 'GET'});

  let bookMod = await fetchJson(`/api/v1/books/${id}`, {
    method: 'PUT',
    body: JSON.stringify({book: {title: 'book222', published: 8888}})
  });

  await fetchJson(`/api/v1/books/${id}/borrow/I am`, {method: 'PATCH'});
  console.log('next should fail')
  await fetchJson(`/api/v1/books/${id}/borrow/I am`, {method: 'PATCH'});

  await fetchJson(`/api/v1/books/${id}/return`, {method: 'PATCH'});
  console.log('next should fail')
  await fetchJson(`/api/v1/books/${id}/return`, {method: 'PATCH'});

  await fetchJson(`/api/v1/books/${id}`, {method: 'DELETE'});
  console.log('next should fail')
  await fetchJson(`/api/v1/books/${id}`, {method: 'DELETE'});

})();
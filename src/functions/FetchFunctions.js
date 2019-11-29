export const getFetch = url => methodFetch(url, {}, 'GET');

export const postFetch = (url, body) => methodFetch(url, body, 'POST');

const methodFetch = (url, body, method) =>
	fetch(url, {
		method: method,
		body: body,
		headers: { 'Content-Type': 'application/json' },
	})
		.then(res => res.json())
		.then(res => res)
		.catch(err => err);

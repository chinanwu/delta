export const getFetch = url =>
	fetch(url)
		.then(res => res.json())
		.then(res => res)
		.catch(err => err);

export const postFetch = (url, body) =>
	fetch(url, {
		method: 'POST',
		body: body,
		headers: { 'Content-Type': 'application/json' },
	})
		.then(res => res.json())
		.then(res => res)
		.catch(err => err);

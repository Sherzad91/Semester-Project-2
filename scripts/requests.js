import { API_URL } from './common.js';

export async function post(url, body, otherHeaders = {}, otherConfig = {}) {
	const headers = {
		'Content-Type': 'application/json',
		...otherHeaders,
	};

	const config = {
		headers,
		method: 'POST',
		body: JSON.stringify(body),
		...otherConfig,
	};
	const response = await fetch(API_URL + url, config);
	const data = await response.json();

	if (data.errors || data.error) {
		return alert(data.errors[0].message || data.error);
	}

	return data;
}

export async function get(url, otherHeaders = {}, otherConfig = {}) {
	const headers = {
		'Content-Type': 'application/json',
		...otherHeaders,
	};

	const config = {
		headers,
		method: 'GET',
		...otherConfig,
	};

	const response = await fetch(API_URL + url, config);
	const data = await response.json();

	if (data.errors || data.error) {
		return alert(data.errors[0].message || data.error);
	}

	return data;
}

export async function put(url, body, otherHeaders = {}, otherConfig = {}) {
	const headers = {
		'Content-Type': 'application/json',
		...otherHeaders,
	};

	const config = {
		headers,
		method: 'PUT',
		body: JSON.stringify(body),
		...otherConfig,
	};
	const response = await fetch(API_URL + url, config);
	const data = await response.json();

	if (data.errors || data.error) {
		return alert(data.errors[0].message || data.error);
	}

	return data;
}

export async function Delete(url, otherHeaders = {}, otherConfig = {}) {
	const headers = {
		'Content-Type': 'application/json',
		...otherHeaders,
	};

	const config = {
		headers,
		method: 'DELETE',
		...otherConfig,
	};

	const response = await fetch(API_URL + url, config);
	// const data = await response.json();

	// console.log(data);

	// if (data.errors || data.error) {
	// 	return alert(data.errors[0].message || data.error);
	// }

	// return data;
}

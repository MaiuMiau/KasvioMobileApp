const url = 'http://localhost:8080';

export function haeKaikkiKasvit(callback) {
	fetch(url + "/kasvi/all", {
		method: "GET"
	})
	.then ((response) => response.json())
	.then ((responseJson) => {
		callback(responseJson, responseJson.status);
	})
	.catch(function(error)	{
		callback(null, 503);
	})
}

export function lisaaKasviKantaan(kasvi, callback) {
	fetch(url + "/kasvi/add", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(kasvi)
	})
	.then (function (response) {
		callback(response.status);
	})
	.catch(function(error)	{
		callback(503);
	})
}

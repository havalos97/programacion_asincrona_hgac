const axios = require('axios');
const request = require('request');
const API_URL = 'https://restcountries.eu/rest/v2/all';

function with_callback() {
	request(API_URL, (error, response) => {
		if (error) {
			console.error(error);
			return;
		}
		let country_list = JSON.parse(response.body);
		country_list = country_list.map((country) => {
			return {
				name: country.name,
				capital: country.capital,
				population: country.population,
				flag: country.flag,
			}
		});

		console.log(country_list);
	});
}

function with_promises() {
	return axios({
		url: API_URL,
		type: "GET",
	});
}

function with_await() {
	return new Promise((resolve, reject) => {
		axios({
			url: API_URL,
			type: "GET",
		}).then((response) => {
			const country_list = response.data.map((country) => {
				return {
					name: country.name,
					capital: country.capital,
					population: country.population,
					flag: country.flag,
				}
			});
			resolve(country_list);
		});
	});
}

async function main(option) {
	switch (option) {
		case 'callback':
			with_callback();
			break;
		case 'promise':
			with_promises()
			.then((axios_response) => {
				const country_list = axios_response.data.map((country) => {
					return {
						name: country.name,
						capital: country.capital,
						population: country.population,
						flag: country.flag,
					}
				});
				console.log(country_list);
			});
			break;
		case 'await':
			const await_response = await with_await();
			console.log(await_response);
			break;
		default:
			console.log("Invalid option, try again...");
	}
}

main('promise');

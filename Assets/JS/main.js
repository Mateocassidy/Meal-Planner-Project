const fetch = require('node-fetch');

const url = 'https://fitness-calculator.p.rapidapi.com/dailycalorie?age=25&gender=male&height=180&weight=70&activitylevel=level_1';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'ceed8a4d73msh1142c0e1390fe75p1d66e0jsn8150be0070fe',
    'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
  }
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

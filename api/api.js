const express = require('express');
const api = express();
const port = process.env.PORT || 3000;

api.get('/', (req, res) => {
	res.send(process.env);
});

api.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
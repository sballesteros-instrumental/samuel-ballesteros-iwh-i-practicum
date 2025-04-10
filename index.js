const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();

app.use(express.json());
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

const PRIVATE_APP_ACCESS = process.env.PRIVATE_APP_ACCESS;

app.get('/', async (req, res) => {
    
    const bachelorsEndpoint = 'https://api.hubspot.com/crm/v3/objects/2-43174658';
    const headers = { Authorization: `Bearer ${PRIVATE_APP_ACCESS}`, 'Content-Type': 'application/json'};
    const params = { properties: 'name,description,university'};
    
    try {
        
        const response = await axios.get(bachelorsEndpoint, { headers, params });
        res.render('home-page', { title: 'Custom Object Table', bachelors: response.data.results });

    } catch (error) { res.status(500).send('Error loading data') }
});

// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.

app.get('/update-cobj', async (req, res) => {
    res.render('updates', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum' });
});

// * Code for Route 2 goes here

// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

// * Code for Route 3 goes here

// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));
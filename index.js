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

app.get('/update-cobj', async (req, res) => {
    res.render('updates', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum' });
});

app.post('/update-cobj', async (req, res) => {
    
    const createBachelorEndpoint = 'https://api.hubapi.com/crm/v3/objects/2-43174658';
    const headers = { Authorization: `Bearer ${PRIVATE_APP_ACCESS}`, 'Content-Type': 'application/json' };
    const { name, description, university } = req.body;
    const newBachelor = { properties: { name, description, university } };
    try {
        await axios.post(createBachelorEndpoint, newBachelor, { headers });
        res.redirect('/');
    } catch (error) { res.status(500).send('Failed to create Bachelor'); }
});

// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));
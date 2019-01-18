const express = require('express');
const knex = require('knex');

const knexConfig = require('./knexfile');

const db = knex(knexConfig.development)('cohorts');

const server = express();

server.use(express.json());

// cohorts

// lists all cohorts
server.get('/api/cohorts', async (req, res) => {
    try {
        const cohorts = await db.select().from('cohorts');
        res.status(200).json(cohorts);
    } catch (err) {
        res.status(500).json(err);
    }
});

// students

// lists all students
server.get('/api/students', async (req, res) => {
    try {
        const cohorts = await db.select().from('students');
        res.status(200).json(cohorts);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = server;
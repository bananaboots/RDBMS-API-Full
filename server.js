const express = require('express');
const knex = require('knex');

const knexConfig = require('./knexfile');
const errorHandler = require('./errorhandler');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());

// cohorts

server.route('/api/cohorts')
    .get(async (req, res) => {
        try {
            const cohorts = await db.select().from('cohorts');
            res.status(200).json(cohorts);
        } catch (err) {
            errorHandler(err);
        }
    })
    .post(async (req, res) => {
        try {
            const newCohortId = await db.insert(req.body).into('cohorts');
            res.status(201).json(newCohortId);
        } catch (err) {
            errorHandler(err);
        }
    });

server.route('/api/cohorts/:id')
    .get(async (req, res) => {
        const { id } = req.params;
        try {
            const cohort = await db.select().from('cohorts').where({ id });
            if (cohort.length) {
                res.status(200).json(cohort);
            } else {
                res.status(404).json({
                    message: 'Sorry, ths cohort with this ID could not be found.'
                });
            }
        } catch (err) {
            errorHandler(err);
        }
    })
    .put(async (req, res) => {
        // const { id } = req.params;
        const { name } = req.body;
        if (name) {
            try {
                const changeCount = db.update({ name }).from('cohorts').where('id', req.params.id);
                if (changeCount) {
                    res.status(201).json({
                        message: 'Successfully updated.'
                    });
                    console.log(changeCount);
                } else {
                    res.status(404).json({
                        message: 'Sorry, the cohort with this ID could not be found.'
                    });
                }
            } catch (err) {
                errorHandler(err);
            }
        } else {
            res.status(400).json({
                message: 'Sorry, please enter a valid cohort name.'
            });
        }
    })
    .delete(async (req, res) => {
        const { id } = req.params;
        try {
            const cohort = await db.select().from('cohorts').where({ id });
            if (cohort.length) {
                db.delete().from('cohorts').where({ id });
                res.status(201).json({
                    message: 'Cohort deleted.'
                });
            } else {
                res.status(404).json({
                    message: 'Sorry, the cohort with this ID was not found.'
                });
            }            
        } catch (err) {
            errorHandler(err);
        }
    });

server.get('/api/cohorts/:id/students', async (req, res) => {
    const { id } = req.params;
    try {
        const students = await db.select().from('students').where('cohort_id', id);
        res.status(200).json(students);
    } catch (err) {
        errorHandler(err);
    }
});

// students

// lists all students
server.route('/api/students')
    .get(async (req, res) => {
        try {
            const cohorts = await db.select().from('students');
            res.status(200).json(cohorts);
        } catch (err) {
            errorHandler(err);
        }
    })
    .post(async (req, res) => {
        try {
            const newStudentId = await db.insert(req.body).into('students');
            res.status(201).json(newStudentId);
        } catch (err) {
            errorHandler(err);
        }
    });

server.route('/api/students/:id')
    .get(async (req, res) => {
        const { id } = req.params;
        try {
            const student = await db.select().from('students').where({ id });
            if (student.length) {
                res.status(200).json({
                    message: 'Student found'
                });
            } else {
                res.status(404).json({
                    message: 'Sorry, ths student with this ID could not be found.'
                });
            }
        } catch (err) {
            errorHandler(err);
        }
    })
    .put(async (req, res) => {
        const { id } = req.params;
        const { name } = req.body;
        if (name) {
            try {
                const student = await db.select().where({ id });
                if (student.length) {
                    const changeCount = await db.update({ name }).from('students').where({ id });
                    res.status(201).json({
                        message: 'Successfully updated.'
                    });
                } else {
                    res.status(404).json({
                        message: 'Sorry, the student with this ID could not be found.'
                    });
                }
            } catch (err) {
                errorHandler(err);
            }
        } else {
            res.status(400).json({
                message: 'Sorry, please enter a valid student name.'
            });
        }
    })
    .delete(async (req, res) => {
        const { id } = req.params;
        try {
            const student = await db.select().from('students').where({ id });
            if (student.length) {
                db.delete().from('students').where({ id });
                res.status(201).json({
                    message: 'Student deleted.'
                });
            } else {
                res.status(404).json({
                    message: 'Sorry, the student with this ID was not found.'
                });
            }            
        } catch (err) {
            errorHandler(err);
        }
    });

module.exports = server;
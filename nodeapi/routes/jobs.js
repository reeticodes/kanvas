// Routes for the job API

const express = require('express')
const router = express.Router()
const {getJobs} = require('../controllers/jobs')

router.post('/jobs', getJobs)

module.exports = router

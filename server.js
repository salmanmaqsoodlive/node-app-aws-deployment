const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const TodoTask = require('./Models/TodoTask.js');

dotenv.config();
const app = express();
const PORT = 8080;

app.use(express.json());


function main(propertyId = 'G-3PR2LJH8PZ') {
  
  const {BetaAnalyticsDataClient} = require('@google-analytics/data');

  const analyticsDataClient = new BetaAnalyticsDataClient();

  // Runs a simple report.
  async function runReport() {
    // [START analyticsdata_run_report]
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: '2020-03-31',
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: 'city',
        },
      ],
      metrics: [
        {
          name: 'activeUsers',
        },
      ],
    });
    // [END analyticsdata_run_report]

    // [START analyticsdata_run_report_response]
    console.log('Report result:');
    response.rows.forEach(row => {
      console.log(row.dimensionValues[0], row.metricValues[0]);
    });
    // [END analyticsdata_run_report_response]
  }

  runReport();
  // [END analyticsdata_quickstart]
}


app.get("/google", async (req, res) => {
  main()
  // res.send().status(200)
  
  });


app.get("/health", async (req, res) => {
  res.send().status(200)
  });

app.get("/", async (req, res) => {
    const todos = await TodoTask.find();
    res.send(todos).status(200)
    });

    app.get("/test", async (req, res) => {
      res.send('Hello i am working').status(200)
      });
  

app.post('/', async (req, res) => {
  const todoTask = new TodoTask({
    content: req.body.content
  }); 
  try {
    await todoTask.save();
    res.send().status(200)

  } catch (err) {
    res.send().status(404)
  }
});

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
  console.log('Connected to db!');
  app.listen(PORT, () => console.log('Server Up and running'));
});

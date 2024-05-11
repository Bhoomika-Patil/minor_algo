const express=require("express");
const cors=require("cors");
const bodyParser = require('body-parser');
// const objs = require("C:/Users/bhoom/minor/tt-full/TimeTrek/navigation/screens/Questions.js");
const app=express();
app.use(cors());
app.use(express.json());

// console.log(objs);
//getting req from frontend:
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8082 });

wss.on('connection', (ws) => {
  console.log('WebSocket connected');

  ws.on('message', (message) => {
    const jsonStr = message.toString('utf-8'); // Convert Buffer to string
const jsonObj = JSON.parse(jsonStr); // Parse JSON string to object

console.log(jsonObj);
    // Handle the received message here
  


  //ALGORRITHM

  function between(min, max) {  
    return Math.floor(
        Math.random() * (max - min + 1) + min
    );
  }
  
  // Function to generate random numbers with constraints
  function generateSumEqualToX(total1, remainingHours) {
    let sum = 0;
    let numbers = [];
    for (let j = 0; j < 7; j++) {
        let max = Math.max(0, Math.min(remainingHours, total1 - sum - (7 - j) * 10));
        let min = Math.max(0, Math.min(remainingHours, total1 - sum - (7 - j)));
        let randomNum = between(min, max);
        sum += randomNum;
        numbers.push(randomNum);
    }
    return numbers;
  }
  
  let  p1 = jsonObj.percentages.map(function(percentage) {
    return parseInt(percentage, 10); // Convert to integer
});
  const q1 = parseInt(jsonObj.q1);
  const q2 = parseInt(jsonObj.q2);
  const q3 = parseInt(jsonObj.q3);
  const hrs = 24 - (q1 + q2 + q3);
  console.log("\nTotal hours per day: " + hrs);
  
  let x = new Array(7).fill(0).map(() => new Array(3).fill(0));
  
  // Calculate remaining hours after distributing hours for each subject
  let remainingHours = hrs - Math.min(...x.map(arr => arr.reduce((acc, curr) => acc + curr, 0)));
  
  // Generate hours for each subject
  for (let i = 0; i < 3; i++) {
    let total = hrs * (p1[i] / 100);
    let total1 = total * 7;
    console.log("total1 is:"+total1);
    // Generate hours for each day
    let numbers = generateSumEqualToX(total1, remainingHours);
    for (let k = 0; k < 7; k++) {
        x[k][i] = numbers[k];
    }
  }
  
  // Display hours for each subject
  for (let i = 0; i < 3; i++) {
    let total = hrs * (p1[i] / 100);
    console.log("Hours of subject " + (i + 1) + " per day: " + total);
    console.log("Total hrs per week after priority for subject " + (i + 1) + ": " + total * 7);
  }
  
  console.log("\nFinally all of the timetable:");
  console.log(x);
  ws.send(JSON.stringify(x));
});

ws.on('close', () => {
  console.log('WebSocket closed');
});

ws.on('error', (error) => {
  console.error('WebSocket error:', error);
});
});
app.listen(8081, () => {
  console.log('listening...');
})
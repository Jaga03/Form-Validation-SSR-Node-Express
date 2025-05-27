import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const app =  express();
const port = 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
let  submittedData = [];
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
});

app.post("/submit",(req,res)=>{
   const { name, email, gender, number, password, terms } = req.body;

  if (
    name.trim() &&
    email.includes('@') &&
    gender &&
    number.length === 10 &&
    !isNaN(number) &&
    password.length >= 6 &&
    terms === 'accepted'
  ) {
    submittedData.push({ name, email, gender, number, password });
    

    res.send(`
      <h1>Form Submitted Successfully</h1>
      <p><strong>Total Submissions:</strong> ${submittedData.length}</p>
      <a href="/">Go Back</a>
    `);
  } else {
    res.send('<h1>Invalid submission. Please go back and try again.</h1><a href="/">Back</a>');
  }
})

app.get('/data', (req, res) => {
  let html = '<h2>Submitted Users</h2><table border="1"><tr><th>Name</th><th>Email</th><th>Gender</th><th>Phone</th></tr>';
submittedData.forEach(d => {
  html += `<tr><td>${d.name}</td><td>${d.email}</td><td>${d.gender}</td><td>${d.number}</td></tr>`;
});
html += '</table><br><a href="/">Back to Form</a>';
res.send(html);

});


app.listen(port,()=>{
    console.log(`Server is running at Port ${port}`)
})

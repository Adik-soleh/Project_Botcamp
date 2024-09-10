const express = require('express')
const app = express()
const port = 3000
const path = require("path");
const { title } = require('process');
const db = require('./db');

app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, "./views"))


app.use("/assets", express.static(path.join(__dirname, "assets")))

app.use(express.urlencoded({extended: true}));

// routing
app.get('/', home);
app.get('/project', project)
app.get('/add-project', addProject)
app.get('/testimonial', testi)
app.get("/project/details/:id", detail);
app.get('/contac', contacMe);
app.get('/crate-blog', createBlog)


app.get('/io', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM public.dw');
    res.json(result.rows);

    console.log(result.rows);

    
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});



const blog =[]

async function home(req, res) {
  res.render('index')


}

function project(req, res) {
  res.render('project', {blog},)
}

function addProject(req, res) {
  res.render('add-project')
}
function createBlog(req, res) {
  res.render('add-project')
}


app.post("/add-project", (req, res) => {
  const {title, content, sDate, eDate, Cbx1, Cbx2, Cbx3, Cbx4} = req.body;
  
  const data = {
    title,
    content,
    sDate,
    eDate,
    Cbx1,
    Cbx2,
    Cbx3,
    Cbx4,
    image:"",
  };
  
  blog.unshift(data);
  console.log("isi blog sekarang: ",blog);
  
})


function testi(req, res) {
  res.render('testimonial')
}

function detail(req, res) {
  res.render('details')
}

function contacMe(req, res) {
  res.render('contac')
}




app.listen(port, () => {
  console.log(`Server berjalan di port ${port} 😁😁`)
})
const express = require('express')
const app = express()
const port = 3000
const path = require("path");
const { title } = require('process');
const config = require("./config/config.json");
const { Sequelize, QueryTypes } = require("sequelize");
const blogs = require('./models/blogs');
const sequelize = new Sequelize(config.development);





//set ve
app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, "./views"))


app.use("/assets", express.static(path.join(__dirname, "assets")))

app.use(express.urlencoded({extended: true}));

// routing
app.get('/', home);
app.get('/project', project)
app.get('/add-project', addProject)
app.get('/delete-project/:index', deleteProject)
app.get('/edit-project/:index', editProject)
app.post('/edit-project/:index', edit)
app.get('/testimonial', testi)
app.get('/project/details/:index', detail);
app.get('/contac', contacMe);
app.get('/add-project', createBlog)

 
// ambil data user dan masuk ke array kosong
const blog =[]


function home(req, res) {
  res.render('index')
}
async function project(req, res) {
  const query = `SELECT * FROM public.blogs`;
  const result = await sequelize.query(query, { type: QueryTypes.SELECT });

  res.render("project", { blogs: result });

}



function project(req, res) {
  res.render('project', {blog:blog},)
}

function deleteProject(req, res) {
  const index = req.params.index;
  blog.splice(index,1)
  res.redirect("/project")
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
    
    
  };
  
  blog.unshift(data);
  console.log("isi blog sekarang: ",blog);
  res.redirect('project')
  
})


function edit(req, res) {
  const index = req.params.index;
  const {
    title, 
    content, 
    sDate,
    eDate,
    Cbx1,
    Cbx2,
    Cbx3,
    Cbx4,
    image
  } = req.body

  blog[index] = {
    title : title,
    content : content,
    sDate : sDate,
    eDate : eDate,
    Cbx1 : Cbx1,
    Cbx2 : Cbx2,
    Cbx3 : Cbx3,
    Cbx4 : Cbx4,
    image: 'https://t3.ftcdn.net/jpg/03/86/83/28/360_F_386832865_KzXYSvOLzUhztbeVD5d6pi2MBMqwBGAL.jpg'
   
    


  }

  res.redirect('/project')
}
function editProject(req, res) {
  const index = req.params.index;

  res.render('edit-project', {blog : blog[index], index : index});
}

function testi(req, res) {
  res.render('testimonial')
}

function detail(req, res) {
  const {index} = req.params;
  res.render('details', {blog : blog[index]});
}

function contacMe(req, res) {
  res.render('contac')
}




app.listen(port, () => {
  console.log(`Server berjalan di port ${port} 😁😁`)
})
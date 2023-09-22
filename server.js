const express = require("express");
const { PORT } = require("./src/config/constants");
const cors = require("cors");
const errorHandler = require("./src/middlewares/error-handler");
const notFound = require("./src/middlewares/not-found");
const {Group} = require("./src/models/index")

const app = express();
const {
  Group
} = require('./src/models/index')

app.use(cors());
// these already do the work of bodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//bring in the routes
const user = require('./src/routes/user');
// const auth = require("./src/routes/auth");
const group = require('./src/routes/group');
const events = require('./src/routes/event');
const comment = require('./src/routes/comments');
const upload = require('./src/routes/upload');
const getGroup = require('./src/controller/group');


app.use("/api/groups/:groupid",async(req,res)=>{
  try{
    let group =await Group.findOne({where:{id:req.params.groupid}})
    res.send(group)
  }catch(err){
    res.send(err.message)
  }
})

app.use("/api/groups",getGroup)

app.use('/api/users', user);
app.use('/api/events', events);
app.use('/api/group', group);

app.use('/api/comment', comment);
app.use('/api/upload', upload);

app.use(errorHandler);
app.use(notFound);

const server = app.listen(PORT, () => {
  console.log(`App started at port: ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  server.close(() => process.exit(1));
});

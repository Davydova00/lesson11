const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());// спарсить

let usersBD = [
  {
  id:1,
  name:"Nastya",
  age:34,
},
{
  id:2,
  name:"Bober",
  age:666,
}
];

app.get('/users', (req,res)=>{
  res.json(usersBD);
});


app.get('/users/:id', (req,res)=>{
  let {id} = req.params;
  let rez = {statusCode:200, data : usersBD[id-1]}
  res.json(rez);
});


app.post('/user', (req,res)=>{
  usersBD.push(req.body)
  res.json({statusCode:200,message:`User was added`,usersBD});
});

app.put('/user/:id', (req,res)=>{
 // try{
    let {id} = req.params; //получаем номер юзера 

  // if(typeof id != number){
  //   throw new Error ("Provide pls number")
  // }
  let {name} = req.body;
  // if(typeof name != string){
  //   throw new Error ("Provide pls srting")
  // }
  usersBD[id-1].name = name; //фильтруем массив, мими удаленного юзера
  res.json({statusCode:200,message:`User ${name} was update`});

  // }catch(e){
  //   res.json({statusCode:400,message: e.message});
  // }
  
});




app.delete('/user/:id', (req,res)=>{
  let {id} = req.params; //получаем номер юзера 
  let name = usersBD[id - 1].name;
  usersBD = usersBD.filter(obj=>obj.id!=id); //фильтруем массив, мими удаленного юзера
  res.json({statusCode:200,message:`User ${name} was delete`});
});


app.listen(PORT,()=>{
  console.log('Listening on port 3000');
})


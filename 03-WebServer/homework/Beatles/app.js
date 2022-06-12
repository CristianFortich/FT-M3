var http = require('http');
var fs   = require('fs');
const henryReadingTime = require('henry-reading-time');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
];

http.createServer((req,res)=>{
  let url = req.url;
  if(req.url === '/'){
    fs.readFile(`${__dirname}/index.html`,(err,data)=>{
      if(err){
        res.writeHead(404, {'Content-type':'text/plain'})
        res.end('Error for some reason')
      }else{
        res.writeHead(200, {'Content-type':'text/html'})
        res.end(data)
      }
    });
  }else if(beatles.find(e=>url.replace('%20', ' ')=='/'+e.name)){
    fs.readFile(`${__dirname}/beatle.html`,'utf-8',(err,data)=>{
      if(err){
        res.writeHead(404, {'Content-type':'text/plain'})
        res.end('Error for some reason')
      }else{
        let person;
        beatles.forEach(e=>{
          if('/'+e.name==url.replace('%20', ' ')){
            person =e;
          }
        });
        res.writeHead(200, {'Content-type':'text/html'})
        data = data.replaceAll('{name}',person.name);
        data = data.replace('{birth}',person.birthdate);
        data = data.replace('{profilePic}',person.profilePic);
        res.end(data)
      }
    });
  }else {
    res.writeHead(404, {'Content-type':'text/plain'});
    res.end('Beatle not found');
  }

  if(req.url === '/api'){
    res.writeHead(200, {'Content-type':'application/json'});
    res.end(JSON.stringify(beatles));
  } else if(req.url.substring(0,5) === '/api/' && req.url.length >5){
    let bName = req.url.split('/').pop();
    if(beatles.find(e=>bName.replace('%20', ' ')==e.name)){
      let name;
      beatles.forEach(e=>{
        if(e.name==bName.replace('%20', ' ')){
          name =e;
        }
      });
      res.writeHead(200, {'Content-type':'application.json'});
      res.end(JSON.stringify(name));
    }else {
      res.writeHead(404, {'Content-type':'text/plain'});
      res.end('Beatle not found');
    }
  }
  // } else if(req.url === '/api/John%20Lennon'){
  //   res.writeHead(200, {'Content-type':'application/json'});
  //   res.end(JSON.stringify(beatles[0]));
  // }
}).listen(3000, '127.0.0.1');

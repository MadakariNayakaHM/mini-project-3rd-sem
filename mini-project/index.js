const fs=require('fs');
const http=require('http');
const url=require('url');

// const slugify=require('slugify');

 const templateCard=fs.readFileSync(`${__dirname}/templates/cards.html`,'utf-8');
 const templateOverview=fs.readFileSync(`${__dirname}/templates/index.html`,'utf-8');
 const templateProduct=fs.readFileSync(`${__dirname}/templates/product.html`,'utf-8');

 const data=fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj=JSON.parse(data);

// const slugs=dataObj.map(e=>slugify(e.productName,{lower:true}))
// console.log(slugs);

 
const replaceTemplate=(temp,resu)=>{
   let output=temp.replace(/{%ID%}/g,resu.id);
   output=output.replace(/{%TAB-NAME%}/g,resu.tab_name);
   output=output.replace(/{%TAB-COMP%}/g,resu.company);
   output=output.replace(/{%USED-FOR%}/g,resu.use);
   output=output.replace(/{%PRICE%}/g,resu.price);
  
   output=output.replace(/{%CONTENT%}/g,resu.diseaseName);
   
  
  return output;
 }
const server=http.createServer((req,res)=>{
    
    const { query, pathname } = url.parse(req.url, true);

if(pathname==='/'||pathname==='/overview'){res.writeHead(200,{'content-type':'text/html'})
const cardHTML=dataObj.map(el=> replaceTemplate(templateCard,el)).join('');
const output=templateOverview.replace(' {%TABLEROW%}',cardHTML)
res.end(output)}


else if(pathname==='/product'){
    res.writeHead(200, {
        'Content-type': 'text/html'
      });
      const product = dataObj[query.id];
      const output = replaceTemplate(templateProduct, product);
      res.end(output);
}

else if(pathname==='/api'){res.writeHead(200,{'content-type':'application/json'})
res.end(data)}

else{res.writeHead(400,{'content-type':'text/html'})
res.end('<h1>PAGE NOT FOUND</h1>')}
  


});



server.listen(8000,'127.0.0.1',()=>{console.log("app is running at the port 8080")})
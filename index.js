const express = require('express');
const mysql = require('mysql');
const PORT = process.env.PORT || 5000;
const app = express();
//app.use(express.logger());

const connectionString = mysql.createPool({
	//db connection details
	connectionLimit : 10,
	host : 'us-cdbr-iron-east-05.cleardb.net',
	user : 'b686ade786fe7c',
	password : 'd59ed826',
	database : 'heroku_373b41bf2fad8f1'
});

connectionString.getConnection(function(err,connection){
	if(err) console.log("Error: ",err);
	else console.log("Conectado a la Base de Datos");
});

app.get('/test',function(request,response){
	connectionString.query("Select * from canton",function(error,rows,fields){
		if(error) 
		{
			console.log("Error al extraer datos!");
			throw error;
		}
		response.send(rows);
	});
});
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

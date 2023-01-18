import express from 'express';
import connect  from "./config/config"
import orders from "./routes/order";
import vendors from "./routes/vendor";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require( "dotenv" ).config();
const PORT = process.env.PORT || 8080; 

app.use('/orders', orders);
app.use('/vendor',vendors)
app.get('/', (req, res) => {
    res.send('Well done!');
})

app.listen(PORT, async() => {
     await connect();
    
 console.log('The application is listening on port 8080!');
})

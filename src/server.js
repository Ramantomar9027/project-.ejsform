const PORT = 3000;
const app = express();
app.listen(PORT, () =>{
    console.log('server running on http://localhost:${PORT}');
});
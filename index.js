const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express()
const port = process.env.PORT || 5000

var cors = require ('cors')

app.use(cors())


//middleware
app.use(express.json());

// mode; and schema

const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String
});

const Product = mongoose.model('product', productSchema);


// connect mongo
async function main() {
    try {
        await mongoose.connect(`mongodb+srv://rifat:g92lYOtb3F5JVcKN@bengal.jfb9kcz.mongodb.net/?retryWrites=true&w=majority`);
        console.log("DB is Connected");
    } catch (error) {
        console.log(error.message)
    }

}


// product post route
app.post('/products', async (req, res) => {
    try {
        console.log("hit")
        const addProduct = Product({
            title: req.body.title,
            price: req.body.price,
            description: req.body.description
        })
        const productsData = await addProduct.save();
        res.send(productsData)
    } catch (error) {
        console.log({ message: error.message });
    }
})



// product get route
app.get('/products', async (req, res) => {
    try {
        const getProducts = await Product.find();
        res.send(getProducts)
    } catch (error) {
        console.log({ message: error.message })
    }
})

app.get('/', (req, res) => {
    res.send('Server is running')
})

app.listen(port, () => {
    console.log(`Running ${port}`)
    main();
})


//username: rifat
//password:
//mongodb+srv://rifat:g92lYOtb3F5JVcKN@bengal.jfb9kcz.mongodb.net/?retryWrites=true&w=majority
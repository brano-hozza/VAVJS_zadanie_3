const express = require('express');
const db = require('./models');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({dest: 'tmp/'});
const fs = require('fs');
const PORT = 5050;

app.use(bodyParser.json());

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

(async () => {
  await db.sequelize.sync();
  const products = await db.Product.findAll({});
  if (products.length >= 3) {
    console.log('Database is already populated');
    return;
  }
  console.log('Populating database...');
  await db.Product.create({
    product_name: 'Furik',
    price: '10',
    description: 'Furik is a product',
    image: 'furik.jpg',
  });
  await db.Product.create({
    product_name: 'Lopata',
    price: '5',
    description: 'Lopata is a product',
    image: 'lopata.jpg',
  });
  await db.Product.create({
    product_name: 'Noznice',
    price: '8',
    description: 'Noznice is a product',
    image: 'noznice.jpg',
  });
  console.log('Database is populated');
})();


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/order/:id', async (req, res) => {
  return res.status(200).json(await db.Order.findOne({
    where: {id: req.params.id},
    include: [db.Product, db.User],
  }));
});
app.post('/order', async (req, res) => {
  const {products, user} = req.body;
  const order = await db.Order.create({});
  await order.setUser(user);
  await order.addProducts(products);
  return res.status(200).json(order);
});
app.put('/order', async (req, res) => {
  const {status, id} = req.body;
  const order = await db.Order.findOne({
    where: {id},
  });
  await order.update({status});
  return res.status(200).json({message: 'Order updated'});
});

app.post('/pay', async (req, res) => {
  const {
    first_name,//eslint-disable-line
    last_name,//eslint-disable-line
    email,
    phone,
    street,
    city,
    zip,
    products,
  } = req.body;
  try {
    const user = await db.User.create({
      first_name, //eslint-disable-line
      last_name,//eslint-disable-line
      email,
      phone,
      street,
      city,
      zip,
    });
    const order = await db.Order.create({
      total_price: products.reduce((acc, product) => acc + (product.price*product.amount), 0),
      status: 'paid',
    });
    const promises = [];
    for (let i = 0; i < products.length; i++) {
      promises.push(db.OrderProduct.create({
        amount: products[i].amount,
        product_id: products[i].id,
        order_id: order.id,
      }));
    }
    await Promise.all(promises);

    await order.setUser(user);
  } catch (e) {
    console.log(e);
    return res.status(500).json({message: 'Error'});
  }
  return res.status(200).json({message: 'Order created'});
});

app.delete('/order/:id', async (req, res) => {
  const order = await db.Order.findOne({
    where: {id: req.params.id},
    include: [db.Product, db.User],
  });
  await order.destroy();

  return res.status(200).json({message: 'Order deleted'});
});

app.get('/orders', async (req, res) => {
  return res.status(200).json(await db.Order.findAll({
    include: [db.Product, db.User],
  }));
});

app.get('/product/:id', async (req, res) => {
  return res.status(200).json(await db.Product.findOne({
    where: {id: req.params.id},
  }));
});

app.post('/product', async (req, res) => {
  const product = await db.Product.create({
    product_name: req.body.product_name,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image,
  });
  console.log(product);
  return res.status(200).json({message: 'Product created'});
});

app.delete('/product/:id', async (req, res) => {
  const product = await db.Product.findOne({
    where: {id: req.params.id},
  });
  await product.destroy();

  return res.status(200).json({message: 'Product deleted'});
});

app.get('/products', async (req, res) => {
  return res.status(200).json(await db.Product.findAll({}));
});

app.get('/user/:id', async (req, res) => {
  return res.status(200).json(await db.User.findOne({
    where: {id: req.params.id},
  }));
});

app.post('/user', async (req, res) => {
  const user = await db.User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
  });
  console.log(user);
  return res.status(200).json({message: 'User created', id: user.id});
});


app.delete('/user/:id', async (req, res) => {
  const user = await db.User.findOne({
    where: {id: req.params.id},
  });
  await user.destroy();

  return res.status(200).json({message: 'User deleted'});
});

app.get('/users', async (req, res) => {
  return res.status(200).json(await db.User.findAll({}));
});

app.use('/images', express.static('assets'));

app.post('/images', upload.single('image'), (req, res) =>{
  const tmp = req.file.path;
  const targePath = './assets/' + req.file.originalname;
  fs.rename(tmp, targePath, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({message: 'Error saving image on server'});
    }
    return res.status(200).json({message: 'Image saved'});
  });
});

app.get('/advertisement', async (req, res) => {
  return res.status(200).json( await db.Advertisement.findOne({
    order: db.sequelize.random(),
  }));
});

app.post('/advertisement', async (req, res) => {
  const id = req.body.id;
  const advertisement = await db.Advertisement.findOne({
    where: {id: id},
  });
  if (!advertisement) {
    return res.status(500).json({message: 'Advertisement not found'});
  }
  advertisement.counter += 1;
  await advertisement.save();
  return res.status(200).json({message: 'Advertisement clicked'});
});

app.put('/advertisement/:id', async (req, res) => {
  const id = req.params.id;
  const link = req.body.link;
  const advertisement = await db.Advertisement.findOne({
    where: {id: id},
  });
  if (!advertisement) {
    return res.status(500).json({message: 'Advertisement not found'});
  }
  advertisement.link = link;
  await advertisement.save();
  return res.status(200).json({message: 'Advertisement updated'});
});

app.post('/advertisement/new', async (req, res) => {
  // eslint-disable-next-line
  const advertisement = await db.Advertisement.create({
    image: req.body.image,
    link: req.body.link,
    counter: 0,
  });
  return res.status(200).json({message: 'Advertisement created'});
});
app.post('/advertisement/image', upload.single('image'), async (req, res) => {
  const tmp = req.file.path;
  const targePath = './adds/' + req.file.originalname;
  fs.rename(tmp, targePath, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({message: 'Error saving image on server'});
    }
    return res.status(200).json({message: 'Image saved'});
  });
});

app.get('/advertisements', async (req, res) => {
  return res.status(200).json(await db.Advertisement.findAll({}));
});

app.use('/adds', express.static('adds'));


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT} in mode: ${process.env.DEV ? 'DEV' : 'PROD'}`);
});

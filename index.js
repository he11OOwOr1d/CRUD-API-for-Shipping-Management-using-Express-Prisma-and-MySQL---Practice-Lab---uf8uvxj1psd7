const dotenv = require('dotenv');
dotenv.config();
const {prisma} = require('./db/config');
const express = require('express');
const verify = require('./verifySecret');

const app = express();
app.use(express.json());
app.use(verify);
const PORT = process.env.PORT || 3001;

app.post('/api/shipping/create', async(req, res) => {
  const {userId, productId, count} = req.body;
  if(!userId || !productId || !count){
    return res.status(404).json({
      error: "All fields required"
    })
  }
  const create = await prisma.shipping.create({
    data: {
      userId,
      productId,
      count
    }
  });
  return res.status(201).json(create);
});

app.put('/api/shipping/cancel', async(req,res)=>{
  const {shippingId} = req.body
  if (!shippingId){
    return res.status(404).json({
      error: "Missing shippingId"
    })
  }
  const cancel = await prisma.shipping.update({
    where: {id: shippingId},
    data:{
      status: "cancelled"
    }
  })
  return res.status(200).json(cancel)
})

app.get('/api/shipping/get', async(req,res)=>{
  const {userId} = req.query;
  if(!userId){
  const get = await prisma.shipping.findMany()
  return res.status(200).json(get)
  }
  const hi = await prisma.shipping.findMany({
    where: {userId: Number(userId)}
  })
  return res.status(200).json(hi)
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 
module.exports = app;
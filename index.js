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
  const create = await prisma.shipping.create({
    data: {
      userId,
      productId,
      count
    }
  });
  return res.status(201).json(create);
});

app.put("/api/shipping/cancel", async(req,res)=>{
  const {shippingId} = req.body
  const cancel = await prisma.shipping.update({
    where: {id: shippingId},
    data:{
      status: "cancelled"
    }
  })
  res.status(200).json(cancel)
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 
module.exports = app;
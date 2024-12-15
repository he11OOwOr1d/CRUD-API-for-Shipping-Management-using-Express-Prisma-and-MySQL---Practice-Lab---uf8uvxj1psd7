const express = require('express');
const dotenv = require('dotenv');
const verify = require('./verifySecret')
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post('/api/shipping/create',verify, async(req,res)=>{
  const {userId, productId, count} = req.body
  const create = await prisma.shipping.create({
    data:{
      userId,
      productId,
      count
    }
  })
  return res.status(201).json(create)
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 
module.exports = app;
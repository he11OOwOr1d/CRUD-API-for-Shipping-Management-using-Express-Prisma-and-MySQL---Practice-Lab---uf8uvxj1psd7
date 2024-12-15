SHIPPING_SECRET_KEY = process.env.SHIPPING_SECRET_KEY;

const verfiySecret = (req,res,next)=>{
  apikey = req.headers['SHIPPING_SECRET_KEY']
  if (!apikey){
    return res.status(403).json({ 
      "error": "SHIPPING_SECRET_KEY is missing or invalid"
   })
  }
  if (apikey !== SHIPPING_SECRET_KEY){
    return res.status(403).json({ 
      "error": "Failed to authenticate SHIPPING_SECRET_KEY"
   })
  }
}
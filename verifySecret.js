const SHIPPING_SECRET_KEY = process.env.SHIPPING_SECRET_KEY;

const verifySecret = (req, res, next) => {
  const headerSecret = req.headers['shipping_secret_key'];
  
  if (!headerSecret) {
    console.log("headerSecret is missing")
    return res.status(403).json({ 
      "error": "SHIPPING_SECRET_KEY is missing or invalid"
    });
  }
  else if (SHIPPING_SECRET_KEY !== headerSecret) {
    return res.status(403).json({ 
      "error": "Failed to authenticate SHIPPING_SECRET_KEY"
    });
  }
  next();
};

module.exports = verifySecret;
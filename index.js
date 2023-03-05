// sk_test_51MKfmNSFEgTvHh3fMTPs1wI9PlFSPfVKuNh5Z4I5hR6tgokGu2WTwy4h5qthGwz47J3M3BJXNcsK5cr9p6T3qlyj00T97royYi

// Iphone : price_1MKfqwSFEgTvHh3fz0uP79OO
// MacBook: price_1MKfsMSFEgTvHh3fzekFhfBR
// CannonM50 : price_1MKfshSFEgTvHh3fMADKVYxz
// Denim Jacket : price_1MKftASFEgTvHh3fiJovZVhK
// LED Light Strips : price_1MKftVSFEgTvHh3fmi3Uxu77
// LS TEE: price_1MKg8zSFEgTvHh3fuqgaMP5t
// GOLF WANG: price_1MKg9HSFEgTvHh3fXS4HO5FX
// HAT: price_1MKg9VSFEgTvHh3f2hfy3Jjz

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/checkout", async (req, res) => {
  const priceID = [
    "price_1MKfqwSFEgTvHh3fz0uP79OO",
    "price_1MKfsMSFEgTvHh3fzekFhfBR",
    "price_1MKfshSFEgTvHh3fMADKVYxz",
    "price_1MKftASFEgTvHh3fiJovZVhK",
    "price_1MKftVSFEgTvHh3fmi3Uxu77",
    "price_1MKg8zSFEgTvHh3fuqgaMP5t",
    "price_1MKg9HSFEgTvHh3fXS4HO5FX",
    "price_1MKg9VSFEgTvHh3f2hfy3Jjz",
  ];

  // console.log(req.body.items);
  const items = req.body.items;

  let lineItems = [];
  priceID.forEach((priceID) => {
    if (items[priceID] !== 0) {
      lineItems.push({
        price: priceID,
        quantity: items[priceID],
      });
    }
  });

  console.log(lineItems);

  const serverUrl = process.env.SERVER_URL || "http://localhost:3000";
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: serverUrl + "/success.html",
    cancel_url: serverUrl + "/cancel.html",
  });

  res.json({
    url: session.url,
  });
});

app.listen(3001, () => console.log("Server running in 3001!!!"));

const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
let api = {};

api.subscription = (req, res, next) => {
  let firstName = req.body.firstName || "";
  let lastName = req.body.lastName || "";
  let email = req.body.email;
  let description = req.body.description || undefined;
  let source = req.body.source || undefined;
  let subscription = req.body.subscription || "";

  return stripe.customers.create(
    {
      email: email,
      source: source,
      metadata: {
        firstName: firstName,
        lastName: lastName,
        email: email
      },
      description: description
    },
    (err, customer) => {
      stripe.subscriptions.create(
        {
          customer: customer.id,
          items: [
            {
              plan: subscription
            }
          ]
        },
        (err, subscription) => {
          if (err) {
            return res.status(404).send(err);
          }

          return res.status(200).send({
            subscription: subscription,
            redirect_uri: process.env.REDIRECT_URI
          });
        }
      );
    }
  );
};

router.post("/subscription", api.subscription);

module.exports = router;

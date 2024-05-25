var express = require("express");
var router = express.Router();
const Razorpay = require("razorpay");

var instance = new Razorpay({
  key_id: "rzp_test_eg9LS878y0rWim",
  key_secret: "aaybsgIBoN11pIMkFbAdupgy",
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.post("/create/orderId", (req, res) => {
  var options = {
    amount: 6900, // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
    payment_capture: 1,
  };
  instance.orders.create(options, function (err, order) {
    console.log(order);
    res.send(order);
  });
});

router.post("/api/payment/verify", (req, res) => {
  const razorpayOrderId = req.body.response.razorpay_order_id;
  const razorpayPaymentId = req.body.response.razorpay_payment_id;
  const signature = req.body.response.razorpay_signature;
  const secret = "aaybsgIBoN11pIMkFbAdupgy";

  var {
    validatePaymentVerification,
    validateWebhookSignature,
  } = require("../node_modules/razorpay/dist/utils/razorpay-utils");
  const result = validatePaymentVerification(
    { order_id: razorpayOrderId, payment_id: razorpayPaymentId },
    signature,
    secret
  );

  res.send(result);
});

module.exports = router;

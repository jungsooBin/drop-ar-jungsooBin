const router = require("express").Router();

router.use("/art", require("./art"));
router.use("/user", require("./user"));
router.use("/likes", require("./likes"));

// Handle 404s
router.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handling endware
router.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message || "Internal server error");
});

module.exports = router;

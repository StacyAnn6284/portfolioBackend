//Centralized error handling

const errorHandling = (err, req, res, next) => {
  console.error("Unhandled Error:", err.stack);
  if (err.code === "23505") {
    return res.status(409).json({
      success: false,
      message: "A record with this data already exists.",
    });
  }
  res.status(500).json({
    status: 500,
    message: "Something went wrong",
    error: err.message,
  });
};

export default errorHandling;

export const notFound = (err, _req, res, _next) => {
  console.error(err);
  const status = err.statusCode || 500;
  res.status(status).json({ error: err.message || "Server error" });
};
const notFound = (req, res) => {
  // add that message to constants
  if (!err.statusCode) err.statusCode = 500;

  res.status(404).json({ message: 'Route Doesnt Exist' });
};
module.exports = notFound;

const notFound = (req, res) => {
  // add that message to constants
  return res.status(404).json({ message: "Route Doesnt Exist" });
};
module.exports = notFound;

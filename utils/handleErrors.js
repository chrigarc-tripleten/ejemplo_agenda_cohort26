const handleFailError = () => {
  const error = new Error("NOT FOUND");
  error.statusCode = 404;
  throw error;
};

const handleError = (error, res) => {
  res.status(error.statusCode ? error.statusCode : 500).send({
    status: false,
    error: error.message,
  });
};


module.exports = {handleError, handleFailError}
const AddressModel = require("../models/address");
const { handleFailError, handleError } = require("../utils/handleErrors");

const getAllAddresses = (req, res) => {
  AddressModel.find({}).populate('owner')
    .then((addresses) => {
      res.send(addresses);
    })
    .catch(error => handleError(error, res));
};

const getAddress = (req, res) => {
  const id = req.params.id;
  AddressModel.findById(id).populate('owner')
    .orFail(handleFailError)
    .then((address) => {
      res.send(address);
    })
    .catch(error => handleError(error, res));
};

const storeAddress = (req, res) => {
  const user = req.user;
  const { street, ext, state, municipality, zipcode } = req.body;
  AddressModel.create({
    street,
    ext,
    state,
    municipality,
    zipcode,
    owner: user._id
  })
    .then((address) => {
      res.send(address);
    })
    .catch(error => handleError(error, res));
};

module.exports = { getAllAddresses, getAddress, storeAddress };

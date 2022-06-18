const Currency = require('../model/currency');

exports.create = async (req, res) => {
  const {
    code,
    name,
    iconName,
    min = null,
    max = null,
    availableCurrencies,
    wallet = null,
    message = null,
  } = req.body;

  try {
    await Currency.create({
      code,
      name,
      iconName,
      min,
      max,
      availableCurrencies,
      message,
      wallet
    });
    res.status(200).json({ isSuccess: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ isSuccess: false });
  }
};
exports.get = async (req, res) => {
  try {
    const currencies = await Currency.find();
    res.status(200).json(
      currencies.map(
        ({code, name, iconName, min, max, availableCurrencies, message}) => 
        ({code, name, iconName, min, max, availableCurrencies, message})));
  } catch (e) {
    console.error(e);
    res.status(500).json([]);
  }
};
exports.update = async (req, res) => {
  const id = req.params['id'];
  const updatingBody = req.body;

  try {
    const currency = (await Currency.findById(id))?._doc;

    if (currency) {
      const updatedCurrency = { ...currency, ...updatingBody };
      try {
        await Currency.findByIdAndUpdate(
          id,
          {
            ...updatedCurrency,
          },
          { new: true }
        );
        res.status(200).json({ isSuccess: true });
      } catch (e) {
        console.error(e);
        res.status(500).json({ isSuccess: false });
      }
      return;
    }
    res.status(404).json({ isSuccess: false });
  } catch (e) {
    console.error(e);
    res.status(500).json({ isSuccess: false });
  }
};
exports.delete = async (req, res) => {
  try {
    const id = req.params?.id;
    await Currency.findByIdAndDelete(id);
    res.status(200).json({ isSuccess: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ isSuccess: false });
  }
};

exports.getWalletByCurrencyCode = async (req, res) => {
  try {
    const currencyCode = req.params?.id;
    const currency = await Currency.findOne({ code: currencyCode })
    if (currency) {
      res.status(200).json({ wallet: currency?.wallet || null });
    } else {
      res.status(404).json({ wallet: null });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ isSuccess: false });
  }
}

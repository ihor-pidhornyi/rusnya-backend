const Order = require('../model/order');

exports.create = async (req, res) => {
  const {
    from,
    to,
    dateStart = new Date(Date.now()),
    dateEnd = new Date(Date.now() + 1800 * 1000),
    status = 'onCheck',
    requisites,
    userName,
    email,
  } = req.body;

  try {
    const order = await Order.create({
      from,
      to,
      requisites,
      dateStart,
      dateEnd,
      status,
      userName,
      email,
    });
    res.status(200).json({ isSuccess: true, orderId: order._id });
  } catch (e) {
    console.error(e);
    res.status(500).json({ isSuccess: false, orderId: null });
  }
};
exports.getById = async (req, res) => {
  const id = req.params?.id;

  try {
    const order = await Order.findById(id);

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ errors: 'Not found' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ errors: 'Server error' });
  }
};
exports.get = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (e) {
    console.error(e);
    res.status(500).json({ errors: 'Server error' });
  }
};
exports.update = async (req, res) => {
  const id = req.params['id'];
  const updatingBody = req.body;

  try {
    const order = (await Order.findById(id))?._doc;

    if (order) {
      const updatedOrder = { ...order, ...updatingBody };
      try {
        await Order.findByIdAndUpdate(
          id,
          {
            ...updatedOrder,
          },
          { new: true }
        );
        res.status(200).json({ isSuccess: true });
        return;
      } catch (e) {
        console.error(e);
        res.status(500).json({ isSuccess: false });
        return;
      }
    }
    res.status(404).json({ isSuccess: false });
  } catch (e) {
    console.error(e);
    res.status(500).json({ isSuccess: false });
  }
};
exports.delete = (req, res) => {};

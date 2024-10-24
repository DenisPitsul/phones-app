const _ = require('lodash');

const { Phone, Preorder, Brand } = require('../db/models');

module.exports.getPreorders = async (req, res, next) => {
  const { query } = req;

  try {
    const where = {};
    if (query.status) {
      where.status = query.status;
    }

    const preorders = await Preorder.findAll({
      raw: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: {
        model: Phone,
        attributes: ['id', 'model'],
        include: {
          model: Brand,
          attributes: ['name'],
        },
      },
      where,
    });

    const preparedPreorders = preorders.map(p => {
      let preparedPreorder = { ...p };
      preparedPreorder.phone = {
        id: p['Phone.id'],
        brand: p['Phone.Brand.name'],
        model: p['Phone.model'],
      };

      preparedPreorder = _.omit(preparedPreorder, [
        'phoneId',
        'Phone.id',
        'Phone.Brand.name',
        'Phone.model',
      ]);

      return preparedPreorder;
    });

    res.status(200).send({ data: preparedPreorders });
  } catch (err) {
    next(err);
  }
};

const _ = require('lodash');
const createHttpError = require('http-errors');
const { Phone, Brand } = require('../db/models');

module.exports.createPhone = async (req, res, next) => {
  const { body, file } = req;

  try {
    if (file) {
      body.image = file.filename;
    }

    const createdPhone = await Phone.create(body);

    if (!createdPhone) {
      return next(createHttpError(400, 'Something went wrong'));
    }

    const phoneBrand = await Brand.findByPk(createdPhone.get().brandId, {
      raw: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
    const shortedPhone = _.omit(createdPhone.get(), [
      'brandId',
      'createdAt',
      'updatedAt',
    ]);
    const phoneWithBrand = {
      ...shortedPhone,
      image: shortedPhone.image
        ? `http://${process.env.HOST}:${process.env.PORT}/images/${shortedPhone.image}`
        : null,
      brand: phoneBrand,
    };

    res.status(201).send({ data: phoneWithBrand });
  } catch (err) {
    next(err);
  }
};

module.exports.getPhones = async (req, res, next) => {
  const { page, limit, offset } = req.pagination;

  try {
    const totalPhoneCount = await Phone.count();
    const foundPhones = await Phone.findAll({
      raw: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: {
        model: Brand,
        attributes: ['id', 'name'],
      },
      limit,
      offset,
      order: ['id'],
    });

    const phonesWithBrand = foundPhones.map(phone => ({
      id: phone.id,
      model: phone.model,
      manufacturedYear: phone.manufacturedYear,
      ram: phone.ram,
      cpu: phone.cpu,
      screenSize: phone.screenSize,
      hasNfc: phone.hasNfc,
      image: phone.image
        ? `http://${process.env.HOST}:${process.env.PORT}/images/${phone.image}`
        : null,
      brand: {
        id: phone['Brand.id'],
        name: phone['Brand.name'],
      },
    }));

    const totalPages = Math.ceil(totalPhoneCount / limit);

    res.status(200).send({
      page,
      totalPages,
      data: phonesWithBrand,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getPhoneById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const foundPhone = await Phone.findByPk(id, {
      raw: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: {
        model: Brand,
        attributes: ['id', 'name'],
      },
    });

    if (!foundPhone) {
      return next(createHttpError(404, 'Phone Not Found'));
    }

    const phoneWithBrand = {
      id: foundPhone.id,
      model: foundPhone.model,
      manufacturedYear: foundPhone.manufacturedYear,
      ram: foundPhone.ram,
      cpu: foundPhone.cpu,
      screenSize: foundPhone.screenSize,
      hasNfc: foundPhone.hasNfc,
      image: foundPhone.image
        ? `http://${process.env.HOST}:${process.env.PORT}/images/${foundPhone.image}`
        : null,
      brand: {
        id: foundPhone['Brand.id'],
        name: foundPhone['Brand.name'],
      },
    };

    res.status(200).send({ data: phoneWithBrand });
  } catch (err) {
    next(err);
  }
};

module.exports.updatePhoneById = async (req, res, next) => {
  const {
    body,
    file,
    params: { id },
  } = req;

  try {
    if (file) {
      body.image = file.filename;
    }

    const [updatedPhonesCount, [updatedPhone]] = await Phone.update(body, {
      raw: true,
      where: { id },
      returning: true,
    });

    console.log(updatedPhone);
    if (!updatedPhonesCount) {
      return next(createHttpError(404, 'Phone Not Found'));
    }

    const phoneBrand = await Brand.findByPk(updatedPhone.brandId, {
      raw: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
    const shortedPhone = _.omit(updatedPhone, [
      'brandId',
      'createdAt',
      'updatedAt',
    ]);
    const phoneWithBrand = {
      ...shortedPhone,
      image: shortedPhone.image
        ? `http://${process.env.HOST}:${process.env.PORT}/images/${shortedPhone.image}`
        : null,
      brand: phoneBrand,
    };

    res.status(200).send({ data: phoneWithBrand });
  } catch (err) {
    next(err);
  }
};

module.exports.deletePhoneById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedPhonesCount = await Phone.destroy({ where: { id } });
    if (!deletedPhonesCount) {
      return next(createHttpError(404, 'Phone Not Found'));
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

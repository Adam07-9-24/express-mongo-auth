import User from '../models/User.js';

const getAll = async () => User.find();

const getById = async (id) => User.findById(id);

const create = async (data) => User.create(data);

const update = async (id, data) =>
  User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });

const remove = async (id) => User.findByIdAndDelete(id);

export default { getAll, getById, create, update, remove };

import userRepository from '../repositories/userRepository.js';

const getAll = async () => userRepository.getAll();

const getById = async (id) => userRepository.getById(id);

const create = async (data) => userRepository.create(data);

const update = async (id, data) => userRepository.update(id, data);

const remove = async (id) => userRepository.remove(id);

export default { getAll, getById, create, update, remove };

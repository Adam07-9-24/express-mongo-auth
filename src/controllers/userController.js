import mongoose from 'mongoose';
import userService from '../services/userService.js';

const sendError = (res, error) => {
  if (error?.code === 11000) {
    return res.status(409).json({ message: 'Email already exists' });
  }

  if (error instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({ message: error.message });
  }

  console.error('Unexpected user operation error:', error.message);
  return res.status(500).json({ message: 'Internal server error' });
};

const hasValidId = (id) => mongoose.isObjectIdOrHexString(id);

const getAll = async (req, res) => {
  try {
    const users = await userService.getAll();
    return res.status(200).json(users);
  } catch (error) {
    return sendError(res, error);
  }
};

const getById = async (req, res) => {
  if (!hasValidId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const user = await userService.getById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return sendError(res, error);
  }
};

const create = async (req, res) => {
  try {
    const user = await userService.create(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return sendError(res, error);
  }
};

const update = async (req, res) => {
  if (!hasValidId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const user = await userService.update(req.params.id, req.body);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return sendError(res, error);
  }
};

const remove = async (req, res) => {
  if (!hasValidId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const user = await userService.remove(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(204).send();
  } catch (error) {
    return sendError(res, error);
  }
};

export default { getAll, getById, create, update, remove };

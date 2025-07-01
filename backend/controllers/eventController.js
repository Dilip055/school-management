import Event from '../models/event.model.js';
import User from '../models/user.model.js';
import CustomError from '../utils/customError.js';

export const createEvent = async (req, res) => {
  const { title, description, startDate, endDate, location } = req.body;
  const createdBy = req.user.id;

  const event = await Event.create({
    title,
    description,
    startDate,
    endDate,
    location,
    createdBy,
  });

  res.status(201).json({ message: 'Event created successfully' });
};

export const getAllEvents = async (req, res) => {
  const events = await Event.findAll({
    include: [
      {
        model: User,
        as: 'creator',
        attributes: ['username'],
      },
    ],
  });

  res.status(200).json(events);
};

export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const event = await Event.findByPk(id);
  if (!event) throw new CustomError('Event not found', 404);

  await event.update(updates);

  res.status(200).json({
    message: 'Event updated successfully',
    data: event,
  });
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  const event = await Event.findByPk(id);
  if (!event) throw new CustomError('Event not found', 404);

  await event.destroy();

  res.status(200).json({ message: 'Event deleted successfully' });
};

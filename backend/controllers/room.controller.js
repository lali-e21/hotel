import Room from '../models/room.model.js';

export const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find({ isActive: true });
        res.status(200).json({
            status: 'success',
            results: rooms.length,
            data: { rooms },
        });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

export const getRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.status(200).json({
            status: 'success',
            data: { room },
        });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

export const createRoom = async (req, res) => {
    try {
        if (req.files) {
            req.body.images = req.files.map(file => file.path);
        }

        const newRoom = await Room.create(req.body);
        res.status(201).json({
            status: 'success',
            data: { room: newRoom },
        });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

export const updateRoom = async (req, res) => {
    try {
        const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.status(200).json({
            status: 'success',
            data: { room },
        });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

export const deleteRoom = async (req, res) => {
    try {
        const room = await Room.findByIdAndUpdate(req.params.id, { isActive: false });
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

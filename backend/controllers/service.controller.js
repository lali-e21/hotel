import Service from '../models/service.model.js';

export const getAllServices = async (req, res) => {
    try {
        const services = await Service.find({ isActive: true });
        res.status(200).json({
            status: 'success',
            results: services.length,
            data: { services },
        });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

export const getService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.status(200).json({
            status: 'success',
            data: { service },
        });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

export const createService = async (req, res) => {
    try {
        if (req.file) {
            req.body.image = req.file.path;
        }
        const newService = await Service.create(req.body);
        res.status(201).json({
            status: 'success',
            data: { service: newService },
        });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

export const updateService = async (req, res) => {
    try {
        if (req.file) {
            req.body.image = req.file.path;
        }
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.status(200).json({
            status: 'success',
            data: { service },
        });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

export const deleteService = async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, { isActive: false });
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

import PromoCode from '../models/promocode.model.js';

export const getAllPromos = async (req, res) => {
    try {
        const promos = await PromoCode.find().sort({ createdAt: -1 });
        res.status(200).json({
            status: 'success',
            results: promos.length,
            data: { promos }
        });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

export const createPromo = async (req, res) => {
    try {
        const { code, discountType, discountValue, expirationDate } = req.body;
        const promo = await PromoCode.create({ code, discountType, discountValue, expirationDate });
        res.status(201).json({
            status: 'success',
            data: { promo }
        });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

export const togglePromo = async (req, res) => {
    try {
        const promo = await PromoCode.findById(req.params.id);
        if (!promo) return res.status(404).json({ message: 'Promo code not found' });

        promo.isActive = !promo.isActive;
        await promo.save();

        res.status(200).json({
            status: 'success',
            data: { promo }
        });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

export const deletePromo = async (req, res) => {
    try {
        const promo = await PromoCode.findByIdAndDelete(req.params.id);
        if (!promo) return res.status(404).json({ message: 'Promo code not found' });

        res.status(204).json({ status: 'success', data: null });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

export const validatePromo = async (req, res) => {
    try {
        const { code } = req.body;
        const promo = await PromoCode.findOne({
            code: code.toUpperCase(),
            isActive: true,
            expirationDate: { $gt: new Date() }
        });

        if (!promo) {
            return res.status(404).json({ status: 'fail', message: 'Invalid or expired promo code' });
        }

        res.status(200).json({
            status: 'success',
            data: {
                discountType: promo.discountType,
                discountValue: promo.discountValue
            }
        });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

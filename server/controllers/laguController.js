const { Lagu } = require('../models');

exports.getAllLagu = async (req, res) => {
    try {
        const lagu = await Lagu.findAll();
        res.status(200).json(lagu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getLaguById = async (req, res) => {
    try {
        const lagu = await Lagu.findByPk(req.params.id);
        
        if (!lagu) {
            return res.status(404).json({ message: 'Lagu tidak ditemukan' });
        }
        
        res.status(200).json(lagu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createLagu = async (req, res) => {
    try {
        const { name, singer } = req.body;
        
        if (!name || !singer) {
            return res.status(400).json({ message: 'Name dan singer harus diisi' });
        }
        
        const lagu = await Lagu.create({ name, singer });
        
        res.status(201).json({
            message: 'Lagu berhasil dibuat',
            data: lagu
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateLagu = async (req, res) => {
    try {
        const { name, singer } = req.body;
        const lagu = await Lagu.findByPk(req.params.id);
        
        if (!lagu) {
            return res.status(404).json({ message: 'Lagu tidak ditemukan' });
        }
        
        await lagu.update({ name, singer });
        
        res.status(200).json({
            message: 'Lagu berhasil diupdate',
            data: lagu
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteLagu = async (req, res) => {
    try {
        const lagu = await Lagu.findByPk(req.params.id);
        
        if (!lagu) {
            return res.status(404).json({ message: 'Lagu tidak ditemukan' });
        }
        
        await lagu.destroy();
        
        res.status(200).json({
            message: 'Lagu berhasil dihapus'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const { Item } = require('../models');

exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.findAll();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getItemById = async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id);
        
        if (!item) {
            return res.status(404).json({ message: 'Item tidak ditemukan' });
        }
        
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createItem = async (req, res) => {
    try {
        const { name, stock } = req.body;
        
        if (!name || stock === undefined) {
            return res.status(400).json({ message: 'Name dan stock harus diisi' });
        }
        
        const item = await Item.create({ name, stock });
        
        res.status(201).json({
            message: 'Item berhasil dibuat',
            data: item
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateItem = async (req, res) => {
    try {
        const { name, stock } = req.body;
        const item = await Item.findByPk(req.params.id);
        
        if (!item) {
            return res.status(404).json({ message: 'Item tidak ditemukan' });
        }
        
        await item.update({ name, stock });
        
        res.status(200).json({
            message: 'Item berhasil diupdate',
            data: item
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id);
        
        if (!item) {
            return res.status(404).json({ message: 'Item tidak ditemukan' });
        }
        
        await item.destroy();
        
        res.status(200).json({
            message: 'Item berhasil dihapus'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
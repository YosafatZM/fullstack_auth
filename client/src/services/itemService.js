import api from './api';

const getAllItems = async () => {
    const response = await api.get('/items');
    return response.data;
};

const getItemById = async (id) => {
    const response = await api.get(`/items/${id}`);
    return response.data;
};

const createItem = async (itemData) => {
    const response = await api.post('/items', itemData);
    return response.data;
};

const updateItem = async (id, itemData) => {
    const response = await api.put(`/items/${id}`, itemData);
    return response.data;
};

const deleteItem = async (id) => {
    const response = await api.delete(`/items/${id}`);
    return response.data;
};

const itemService = {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem
};

export default itemService;
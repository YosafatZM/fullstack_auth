import { useState, useEffect } from 'react';
import { getItems, deleteItem } from '../services/api';

const ItemsList = ({onEdit}) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await getItems();
            setItems(response.data);
            setLoading(false);
        } catch(error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Apakah Anda Ingin Menghapus Data?')) {
            try {
                await deleteItem(id);
                fetchItems();
            } catch (error) {
                alert('Gagal Menghapus Data!!!');
            }
        }
    };

    if (loading) return <div className='text-center'>Loading..</div>;

    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover">
                <thead className='table-dark'>
                    <tr>
                        <th>ID</th>
                        <th>Nama Item</th>
                        <th>Stok</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.stock}</td>
                            <td>
                                <button 
                                    className='btn btn-sm btn-warning me-2' 
                                    onClick={() => onEdit(item)}
                                >
                                    Edit
                                </button>
                                <button 
                                    className='btn btn-sm btn-danger' 
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ItemsList;
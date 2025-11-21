import { useState, useEffect } from 'react';
import { createItem, updateItem } from '../services/api';

const ItemsForm = ({item, onSuccess}) => {
    const [name, setName] = useState('');
    const [stock, setStock] = useState('');

    useEffect(() => {
        if(item) {
            setName(item.name);
            setStock(item.stock);
        }
    }, [item]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (item) {
                await updateItem(item.id, { name, stock: parseInt(stock) });
            } else {
                await createItem({ name, stock: parseInt(stock) });
            }
            setName('');
            setStock('');
            onSuccess();
        } catch (error) {
            alert('Gagal menyimpan data');
        }
    };

    return (
        <div className="card mb-4">
            <div className="card-body">
                <h5 className="card-title">
                    {item ? 'Edit' : 'Tambah'} Item
                </h5>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nama Item</label>
                        <input 
                            type="text" 
                            className='form-control' 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                            placeholder="Masukkan nama item"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Stok</label>
                        <input 
                            type="number" 
                            className='form-control' 
                            value={stock} 
                            onChange={(e) => setStock(e.target.value)} 
                            required 
                            min="0"
                            placeholder="Masukkan jumlah stok"
                        />
                    </div>
                    <button type='submit' className="btn btn-primary">Simpan</button>
                    {item && (
                        <button 
                            type='button' 
                            className="btn btn-secondary ms-2"
                            onClick={() => {
                                setName('');
                                setStock('');
                                onSuccess();
                            }}
                        >
                            Batal
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ItemsForm;
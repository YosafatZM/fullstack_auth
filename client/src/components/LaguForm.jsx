import { useState, useEffect } from 'react';
import { createLagu, updateLagu } from '../services/api';

const LaguForm = ({lagu, onSuccess}) => {
    const [name, setName] = useState('');
    const [singer, setSinger] = useState('');

    useEffect(() => {
        if(lagu) {
            setName(lagu.name);
            setSinger(lagu.singer);
        }
    }, [lagu]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (lagu) {
                await updateLagu(lagu.id, { name, singer });
            } else {
                await createLagu({ name, singer });
            }
            setName('');
            setSinger('');
            onSuccess();
        } catch (error) {
            alert('Gagal menyimpan data');
        }
    };

    return (
        <div className="card mb-4">
            <div className="card-body">
                <h5 className="card-title">
                    {lagu ? 'Edit' : 'Tambah'} Lagu
                </h5>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Judul Lagu</label>
                        <input 
                            type="text" 
                            className='form-control' 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                            placeholder="Masukkan judul lagu"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Penyanyi</label>
                        <input 
                            type="text" 
                            className='form-control' 
                            value={singer} 
                            onChange={(e) => setSinger(e.target.value)} 
                            required 
                            placeholder="Masukkan nama penyanyi"
                        />
                    </div>
                    <button type='submit' className="btn btn-primary">Simpan</button>
                    {lagu && (
                        <button 
                            type='button' 
                            className="btn btn-secondary ms-2"
                            onClick={() => {
                                setName('');
                                setSinger('');
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

export default LaguForm;
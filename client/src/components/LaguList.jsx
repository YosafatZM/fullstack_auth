import { useState, useEffect } from 'react';
import { getLagu, deleteLagu } from '../services/api';

const LaguList = ({onEdit}) => {
    const [lagu, setLagu] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLagu();
    }, []);

    const fetchLagu = async () => {
        try {
            const response = await getLagu();
            setLagu(response.data);
            setLoading(false);
        } catch(error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Apakah Anda Ingin Menghapus Data?')) {
            try {
                await deleteLagu(id);
                fetchLagu();
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
                        <th>Judul Lagu</th>
                        <th>Penyanyi</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {lagu.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center text-muted py-2">
                                Tidak Ada Data Yang Ditemukan
                            </td>
                        </tr>
                    ) : (
                        lagu.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.singer}</td>
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
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default LaguList;
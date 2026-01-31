import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchResources } from '../store/resourcesSlice.js';

export default function ResourcesDemo() {
  const dispatch = useDispatch();
  const { items, isLoading, error } = useSelector((state) => state.resources);

  useEffect(() => {
    dispatch(fetchResources());
  }, [dispatch]);

  return (
    <div style={{ marginTop: 32 }}>
      <h2 style={{ fontSize: 24, marginBottom: 12 }}>Resources Demo (Redux)</h2>
      
      <button
        onClick={() => dispatch(fetchResources())}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#3f51b5',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          marginBottom: 16,
        }}
      >
        Оновити дані
      </button>

      {isLoading && (
        <div style={{ padding: 16, backgroundColor: '#e3f2fd', borderRadius: 6 }}>
          <p style={{ margin: 0, color: '#1976d2' }}>⏳ Завантаження...</p>
        </div>
      )}

      {error && (
        <div style={{ padding: 16, backgroundColor: '#ffebee', borderRadius: 6 }}>
          <p style={{ margin: 0, color: '#c62828' }}>❌ Помилка: {error}</p>
        </div>
      )}

      {!isLoading && !error && items.length > 0 && (
        <div>
          <h3 style={{ fontSize: 18, marginBottom: 12 }}>
            Завантажено {items.length} виробників:
          </h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {items.map((item, index) => (
              <li
                key={index}
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#f5f5f5',
                  marginBottom: 8,
                  borderRadius: 4,
                }}
              >
                {item.make_display || item.make_id}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

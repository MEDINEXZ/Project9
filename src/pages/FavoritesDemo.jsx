import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites, addToComparison, removeFromComparison, clearComparison } from '../store/favoritesSlice.js';
import { setCurrency } from '../store/uiSlice.js';

export default function FavoritesDemo() {
  const dispatch = useDispatch();
  const { favorites, comparison } = useSelector((state) => state.favorites);
  const currency = useSelector((state) => state.ui.currency);
  const { items: apiCars } = useSelector((state) => state.resources);

  const sampleCars = apiCars.slice(0, 4).map((car, index) => ({
    id: index + 1,
    make: car.make_display || car.make_id,
    model: 'Model ' + (index + 1),
    price: 60000 + (index * 5000)
  }));

  const currencyRates = {
    USD: 1,
    EUR: 0.92,
    UAH: 41.5
  };

  const convertPrice = (price) => {
    return (price * currencyRates[currency]).toFixed(2);
  };

  const isFavorite = (id) => favorites.some(item => item.id === id);
  const isInComparison = (id) => comparison.some(item => item.id === id);

  return (
    <div style={{ marginTop: 32 }}>
      <h2 style={{ fontSize: 24, marginBottom: 12 }}>Обрані авто та порівняння</h2>

      <div style={{ marginBottom: 20 }}>
        <label style={{ marginRight: 10, fontWeight: 'bold' }}>Валюта:</label>
        {['USD', 'EUR', 'UAH'].map((curr) => (
          <button
            key={curr}
            onClick={() => dispatch(setCurrency(curr))}
            style={{
              padding: '8px 16px',
              marginRight: 8,
              backgroundColor: currency === curr ? '#3f51b5' : '#e0e0e0',
              color: currency === curr ? 'white' : 'black',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            {curr}
          </button>
        ))}
      </div>

      <h3 style={{ fontSize: 18, marginBottom: 12 }}>Доступні автомобілі:</h3>
      <div style={{ display: 'grid', gap: 12, marginBottom: 24 }}>
        {sampleCars.map((car) => (
          <div
            key={car.id}
            style={{
              padding: 16,
              backgroundColor: '#f5f5f5',
              borderRadius: 8,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <strong>{car.make} {car.model}</strong>
              <div style={{ color: '#666', marginTop: 4 }}>
                Ціна: {convertPrice(car.price)} {currency}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => isFavorite(car.id) 
                  ? dispatch(removeFromFavorites(car.id))
                  : dispatch(addToFavorites(car))
                }
                style={{
                  padding: '8px 12px',
                  backgroundColor: isFavorite(car.id) ? '#f44336' : '#4caf50',
                  color: 'white',
                  border: 'none',
                  borderRadius: 4,
                  cursor: 'pointer',
                }}
              >
                {isFavorite(car.id) ? '❤️ Видалити' : '🤍 Обране'}
              </button>
              <button
                onClick={() => isInComparison(car.id)
                  ? dispatch(removeFromComparison(car.id))
                  : dispatch(addToComparison(car))
                }
                disabled={!isInComparison(car.id) && comparison.length >= 3}
                style={{
                  padding: '8px 12px',
                  backgroundColor: isInComparison(car.id) ? '#ff9800' : '#2196f3',
                  color: 'white',
                  border: 'none',
                  borderRadius: 4,
                  cursor: comparison.length >= 3 && !isInComparison(car.id) ? 'not-allowed' : 'pointer',
                  opacity: comparison.length >= 3 && !isInComparison(car.id) ? 0.5 : 1,
                }}
              >
                {isInComparison(car.id) ? '✓ У порівнянні' : '⚖️ Порівняти'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {favorites.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 18, marginBottom: 12 }}>
            ❤️ Обрані ({favorites.length}):
          </h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {favorites.map((car) => (
              <div
                key={car.id}
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#ffebee',
                  borderRadius: 4,
                }}
              >
                {car.make} {car.model}
              </div>
            ))}
          </div>
        </div>
      )}

      {comparison.length > 0 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ fontSize: 18, margin: 0 }}>
              ⚖️ Порівняння ({comparison.length}/3):
            </h3>
            <button
              onClick={() => dispatch(clearComparison())}
              style={{
                padding: '6px 12px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
              }}
            >
              Очистити
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {comparison.map((car) => (
              <div
                key={car.id}
                style={{
                  padding: 16,
                  backgroundColor: '#e3f2fd',
                  borderRadius: 8,
                }}
              >
                <strong>{car.make} {car.model}</strong>
                <div style={{ marginTop: 8, color: '#666' }}>
                  Ціна: {convertPrice(car.price)} {currency}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

import { useDispatch } from 'react-redux';
import { openModal } from '../store/uiSlice.js';
import Modal from './Modal.jsx';

export default function ModalTestWindow() {
  const dispatch = useDispatch();

  return (
    <div>
      <button
        onClick={() => dispatch(openModal())}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#3f51b5',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        Відкрити модальне вікно
      </button>

      <Modal>
        <h2 style={{ marginTop: 0 }}>Модальне вікно</h2>
        <p>Привіт світ</p>
      </Modal>
    </div>
  );
}

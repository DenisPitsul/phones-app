import React, { useEffect } from 'react';
import styles from './PhoneDetailsPage.module.sass';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  changeDeleteStatus,
  clearError,
  clearPhone,
  deletePhoneByIdThunk,
  getPhoneByIdThunk,
} from '../../store/slices/phonesSlice';
import { connect } from 'react-redux';
import defaultImage from './defaultImage.png';
import { notify } from '../../utils/notification';
import CONSTANTS from '../../constants';

function PhoneDetailsPage ({
  phone,
  error,
  deleteStatus,
  clearPhoneInStore,
  getPhoneById,
  deletePhoneById,
  updateDeleteStatus,
  clearErrorFromStore,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPhoneById(id);

    return () => {
      clearPhone();
    };
  }, []);

  useEffect(() => {
    if (deleteStatus === CONSTANTS.STATUS.SUCCESS) {
      notify('Phone was deleted');
      navigate('/');
      clearPhoneInStore();
    } else if (deleteStatus === CONSTANTS.STATUS.ERROR) {
      for (const key in error.errors) {
        notify(error.errors[key].message, CONSTANTS.STATUS.ERROR);
      }
      clearErrorFromStore();
    }
    updateDeleteStatus(CONSTANTS.STATUS.IDLE);
  }, [deleteStatus]);

  const onPhoneDelete = () => {
    deletePhoneById(phone.id);
  };

  return (
    <div className='container'>
      <div className={styles.phoneContainer}>
        {error ? (
          <p className={styles.error}>Failed to load phone.</p>
        ) : (
          <>
            <h1 className={styles.title}>Phone details</h1>
            {phone && (
              <div className={styles.phoneWrapper}>
                <img
                  className={styles.phoneImg}
                  src={phone.image ? phone.image : defaultImage}
                  alt={phone.model}
                />
                <div className={styles.phoneInfo}>
                  <h2 className={styles.phoneTitle}>{phone.model}</h2>
                  <p className={styles.phoneText}>Brand: {phone.brand.name}</p>
                  <p className={styles.phoneText}>
                    Year: {phone.manufacturedYear}
                  </p>
                  <p className={styles.phoneText}>RAM: {phone.ram}</p>
                  <p className={styles.phoneText}>CPU: {phone.cpu}</p>
                  <p className={styles.phoneText}>
                    Screen size: {phone.screenSize}
                  </p>
                  <p className={styles.phoneText}>
                    Has{phone.hasNfc ? ' ' : ' not '}NFC
                  </p>

                  <div className={styles.buttonsWrapper}>
                    <Link
                      to={`/update-phone/${phone.id}`}
                      className={styles.updateBtn}
                    >
                      Update
                    </Link>
                    <button
                      type='button'
                      className={styles.deleteBtn}
                      onClick={onPhoneDelete}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = ({ phonesData }) => ({
  phone: phonesData.phone,
  error: phonesData.error,
  deleteStatus: phonesData.deleteStatus,
});

const mapDispatchToProps = dispatch => ({
  getPhoneById: id => dispatch(getPhoneByIdThunk(id)),
  clearPhoneInStore: () => dispatch(clearPhone()),
  deletePhoneById: id => dispatch(deletePhoneByIdThunk(id)),
  updateDeleteStatus: data => dispatch(changeDeleteStatus(data)),
  clearErrorFromStore: () => dispatch(clearError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneDetailsPage);

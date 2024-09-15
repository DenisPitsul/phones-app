import React from 'react';
import PhoneList from '../../components/PhoneList';
import styles from './HomePage.module.sass';
import { connect } from 'react-redux';

function HomePage ({ error }) {
  return (
    <div className='container'>
      <div className={styles.phonesContainer}>
        {error ? (
          <p className={styles.error}>Failed to load phones.</p>
        ) : (
          <>
            <h1 className={styles.title}>Available phones</h1>
            <PhoneList />
          </>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = ({ phonesData }) => ({
  error: phonesData.error,
});

export default connect(mapStateToProps)(HomePage);

import React from 'react';
import styles from './UpdatePhonePage.module.sass';
import UpdatePhoneForm from '../../components/UpdatePhoneForm';

function UpdatePhonePage () {
  return (
    <div className='container'>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Create phone</h1>
        <div className={styles.formWrapper}>
          <UpdatePhoneForm />
        </div>
      </div>
    </div>
  );
}

export default UpdatePhonePage;

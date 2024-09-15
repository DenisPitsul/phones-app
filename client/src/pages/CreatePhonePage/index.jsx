import React from 'react';
import CreatePhoneForm from '../../components/CreatePhoneForm';
import styles from './CreatePhonePage.module.sass';

function CreatePhonePage () {
  return (
    <div className='container'>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Create phone</h1>
        <div className={styles.formWrapper}>
          <CreatePhoneForm />
        </div>
      </div>
    </div>
  );
}

export default CreatePhonePage;

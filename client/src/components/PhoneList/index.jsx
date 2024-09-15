import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './PhoneList.module.sass';
import { getPhonesThunk } from '../../store/slices/phonesSlice';
import defaultImage from './defaultImage.png';

function PhoneList ({ phones, totalPages, page, isFetching, getPhones }) {
  useEffect(() => {
    getPhones(1);
  }, [getPhones]);

  const scrollHandler = e => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        100 &&
      !isFetching &&
      page < totalPages
    ) {
      getPhones(page + 1);
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [page, totalPages, isFetching]);

  return (
    <ul className={styles.phoneList}>
      {phones.map(p => (
        <li key={p.id} className={styles.phoneItem}>
          <img
            className={styles.phoneImg}
            src={p.image !== null ? p.image : defaultImage}
            alt={p.model}
          />
          <h2 className={styles.phoneModel}>{p.model}</h2>
          <p className={styles.phoneBrand}>Brand: {p.brand.name}</p>
          <Link className={styles.viewLink} to={`/phone/${p.id}`}>
            View
          </Link>
        </li>
      ))}
    </ul>
  );
}

const mapStateToProps = ({ phonesData }) => ({
  phones: phonesData.phones,
  totalPages: phonesData.totalPages,
  page: phonesData.page,
  isFetching: phonesData.isFetching,
});

const mapDispatchToProps = dispatch => ({
  getPhones: page => dispatch(getPhonesThunk(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneList);

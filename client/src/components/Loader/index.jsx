import styles from './Loader.module.sass';

const Loader = () => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;

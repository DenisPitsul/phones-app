import { Formik, Form, Field, ErrorMessage } from 'formik';
import { connect } from 'react-redux';
import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './CreatePhoneForm.module.sass';
import { CREATE_PHONE_VALIDATION_SCHEMA } from '../../utils/validate/validationSchemas';
import { getBrandsThunk } from '../../store/slices/brandsSlice';
import {
  changeCreateStatus,
  clearError,
  createPhoneThunk,
} from '../../store/slices/phonesSlice';
import CONSTANTS from '../../constants';
import { notify } from '../../utils/notification';

function CreatePhoneForm ({
  brands,
  createStatus,
  error,
  getBrands,
  createPhone,
  updateCreateStatus,
  clearErrorFromStore,
}) {
  const [imageName, setImageName] = useState(null);

  const initialValues = {
    brandId: '',
    model: '',
    manufacturedYear: '',
    ram: '',
    cpu: '',
    screenSize: '',
    hasNfc: false,
    image: null,
  };

  useEffect(() => {
    getBrands();
  }, []);

  useEffect(() => {
    if (createStatus === CONSTANTS.STATUS.SUCCESS) {
      notify('Phone was created');
    } else if (createStatus === CONSTANTS.STATUS.ERROR) {
      for (const key in error.errors) {
        notify(error.errors[key].message, CONSTANTS.STATUS.ERROR);
      }
      clearErrorFromStore();
    }
    updateCreateStatus(CONSTANTS.STATUS.IDLE);
  }, [createStatus]);

  const handleSubmit = (values, formikBag) => {
    const formData = new FormData();
    formData.append('brandId', values.brandId);
    formData.append('model', values.model);
    formData.append('manufacturedYear', values.manufacturedYear);
    formData.append('ram', values.ram);
    formData.append('cpu', values.cpu);
    formData.append('screenSize', values.screenSize);
    formData.append('hasNfc', values.hasNfc);

    if (values.image) {
      formData.append('phoneImage', values.image);
    }

    createPhone(formData);
    formikBag.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={CREATE_PHONE_VALIDATION_SCHEMA}
      enableReinitialize
    >
      {formikProps => {
        useEffect(() => {
          if (brands.length > 0 && !formikProps.touched.brandId) {
            formikProps.setFieldValue('brandId', brands[0].id);
          }
        }, [brands]);

        const getInputClassNames = field => {
          return classNames(styles.input, {
            [styles.valid]:
              !formikProps.errors[field] && formikProps.touched[field],
            [styles.invalid]:
              formikProps.errors[field] && formikProps.touched[field],
          });
        };
        const modelClassNames = getInputClassNames('model');
        const manufacturedYearClassNames =
          getInputClassNames('manufacturedYear');
        const ramClassNames = getInputClassNames('ram');
        const cpuClassNames = getInputClassNames('cpu');
        const screenSizeClassNames = getInputClassNames('screenSize');

        return (
          <Form className={styles.form}>
            <label className={styles.inputLabel}>
              <span className={styles.inputCaption}>Brand:</span>
              <Field className={styles.input} as='select' name='brandId'>
                {brands.map(b => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </Field>
            </label>
            <label className={styles.inputLabel}>
              <span className={styles.inputCaption}>Model:</span>
              <Field
                className={modelClassNames}
                type='text'
                name='model'
                placeholder='Phone model'
              />
              <ErrorMessage
                className={styles.error}
                name='model'
                component='span'
              />
            </label>
            <label className={styles.inputLabel}>
              <span className={styles.inputCaption}>Year:</span>
              <Field
                className={manufacturedYearClassNames}
                type='text'
                name='manufacturedYear'
                placeholder='Manfactured year'
              />
              <ErrorMessage
                className={styles.error}
                name='manufacturedYear'
                component='span'
              />
            </label>
            <label className={styles.inputLabel}>
              <span className={styles.inputCaption}>RAM:</span>
              <Field
                className={ramClassNames}
                type='text'
                name='ram'
                placeholder='RAM'
              />
              <ErrorMessage
                className={styles.error}
                name='ram'
                component='span'
              />
            </label>
            <label className={styles.inputLabel}>
              <span className={styles.inputCaption}>CPU:</span>
              <Field
                className={cpuClassNames}
                type='text'
                name='cpu'
                placeholder='CPU'
              />
              <ErrorMessage
                className={styles.error}
                name='cpu'
                component='span'
              />
            </label>
            <label className={styles.inputLabel}>
              <span className={styles.inputCaption}>Screen size:</span>
              <Field
                className={screenSizeClassNames}
                type='text'
                name='screenSize'
                placeholder='Screen size'
              />
              <ErrorMessage
                className={styles.error}
                name='screenSize'
                component='span'
              />
            </label>
            <label className={styles.inputLabel}>
              <span className={styles.inputCaption}>Has NFC:</span>
              <Field
                className={styles.checkBox}
                type='checkbox'
                name='hasNfc'
              />
              {formikProps.values.hasNfc ? (
                <ImCheckboxChecked className={styles.checkBoxIcon} />
              ) : (
                <ImCheckboxUnchecked className={styles.checkBoxIcon} />
              )}
              <span className={styles.checkBoxIcon}></span>
            </label>
            <label className={styles.inputLabel}>
              <span className={styles.inputCaption}>Photo:</span>
              <span className={styles.uploadImageBtn}>
                {imageName ? `Uploaded: ${imageName}` : 'Upload photo'}
              </span>
              <input
                className={styles.uploadImageInput}
                type='file'
                name='image'
                accept='image/*'
                onChange={e => {
                  const file = e.target.files[0];
                  formikProps.setFieldValue('image', file);
                  setImageName(file ? file.name : null);
                }}
              />
            </label>
            <button className={styles.submitBtn} type='submit'>
              Create
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

const mapStateToProps = ({ brandsData, phonesData }) => ({
  brands: brandsData.brands,
  createStatus: phonesData.createStatus,
  error: phonesData.error,
});

const mapDispatchToProps = dispatch => ({
  getBrands: () => dispatch(getBrandsThunk()),
  createPhone: data => dispatch(createPhoneThunk(data)),
  updateCreateStatus: data => dispatch(changeCreateStatus(data)),
  clearErrorFromStore: () => dispatch(clearError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePhoneForm);
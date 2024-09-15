import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BasePage from './pages/BasePage/BasePage';
import HomePage from './pages/HomePage';
import './App.css';
import Loader from './components/Loader';
import CreatePhonePage from './pages/CreatePhonePage';
import PhoneDetailsPage from './pages/PhoneDetailsPage';
import UpdatePhonePage from './pages/UpdatePhonePage';

function App ({ isBrandsFetching, isPhonesFetching }) {
  return (
    <>
      <ToastContainer className='notification' />
      {(isBrandsFetching || isPhonesFetching) && <Loader />}
      <Routes>
        <Route path='/' element={<BasePage />}>
          <Route index element={<HomePage />} />
          <Route path='/create-phone' element={<CreatePhonePage />} />
          <Route path='/phone/:id' element={<PhoneDetailsPage />} />
          <Route path='/update-phone/:id' element={<UpdatePhonePage />} />
        </Route>
      </Routes>
    </>
  );
}

const mapStateToProps = ({ brandsData, phonesData }) => ({
  isBrandsFetching: brandsData.isFetching,
  isPhonesFetching: phonesData.isFetching,
});

export default connect(mapStateToProps)(App);

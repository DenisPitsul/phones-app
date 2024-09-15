import { toast } from 'react-toastify';
import CONSTANTS from '../../constants';

function notify (message, notificationType) {
  const notify = () => {
    if (notificationType === CONSTANTS.STATUS.ERROR) {
      toast.error(message);
    } else {
      toast.success(message);
    }
  };
  notify();
}

export { notify };

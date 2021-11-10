import { Toaster } from '@class101/ui';
import { BiErrorAlt } from 'react-icons/bi';
import { BsCheckCircle } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';

let AppToaster;
const iconStyle = {
    color: '#ffffff',
  }

export async function showToast(props) {
  if (!AppToaster) {
    AppToaster = await Toaster.create();
  }

  AppToaster.show(props);
}

export const successToast = (message) => {
    showToast({
        backgroundColor: '#3fb950',
        message,
        button: <MdClose style={iconStyle} />,
        icon: <BsCheckCircle style={iconStyle} />,
      });
}

export const infoToast = (message) => {
    showToast({
        backgroundColor: '#00a8ff',
        message,
        button: <MdClose style={iconStyle} />,
        icon: <BsCheckCircle style={iconStyle} />,
      });
}

export const errorToast = (message) => {
    showToast({
      backgroundColor: '#FF5252',
      message,
      button: <MdClose style={iconStyle} />,
      icon: <BiErrorAlt style={iconStyle} />,
    });
} 
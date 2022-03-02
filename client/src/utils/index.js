import Swal from 'sweetalert2';

const sawal = ({ icon, title, text }) => {
  return Swal.fire({
    position: 'top-center',
    icon: icon,
    title: title,
    text: text,
    timer: 5000,
    showClass: {
      popup: 'animate__animated animate__fadeInDown',
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp',
    },
  });
};

export { sawal };

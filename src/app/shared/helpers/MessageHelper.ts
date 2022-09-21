import Swal from 'sweetalert2';

export class MessageHelper {
  static COLOR_CONFIRM = '#dfc356';

  static COLOR_CANCEL = '#475C6F';

  static errorMessage(message: string) {
    Swal.fire({
      title: 'Error',
      icon: 'error',
      text: message,
      confirmButtonColor: this.COLOR_CONFIRM,
    });
  }

  static infoMessage(message: string) {
    Swal.fire({
      title: 'Información',
      icon: 'info',
      text: message,
      confirmButtonColor: this.COLOR_CONFIRM,
    });
  }

  static successMessage(title: string, message: string) {
    Swal.fire({
      title,
      text: message,
      icon: 'success',
      confirmButtonColor: this.COLOR_CONFIRM,
    });
  }

  static deleteMessage(
    id: number,
    callback: any,
    text: string = 'Se eliminara de manera permanente',
  ) {
    Swal.fire({
      title: '¿Deseas eliminar el registro?',
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.COLOR_CONFIRM,
      cancelButtonColor: this.COLOR_CANCEL,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        callback(id);
      }
    });
  }

  static decisionMessage(
    title: string,
    body: string,
    callback: any,
    onCancelCallback?: any,
  ) {
    Swal.fire({
      title,
      text: body,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.COLOR_CONFIRM,
      cancelButtonColor: this.COLOR_CANCEL,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        callback();
      } else {
        if (!!onCancelCallback) {
          onCancelCallback();
        }
      }
    });
  }

  static getInstanceSwal() {
    return Swal;
  }

  // @ts-ignore
  static filePopUp({ title, text, callback, accept = '', confirmButtonText }) {
    Swal.fire({
      title,
      width: '40%',
      text,
      input: 'file',
      inputAttributes: {
        accept,
      },
      confirmButtonText,
      confirmButtonColor: MessageHelper.COLOR_CONFIRM,
      cancelButtonColor: MessageHelper.COLOR_CANCEL,
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      allowOutsideClick: false,
    }).then(({ value: file }) => {
      if (file instanceof File) {
        callback(file);
      } else if (file === null) {
        MessageHelper.infoMessage('Necesitas cargar un archivo');
      }
    });
  }

  static showLoading(text = 'Cargando...') {
    // @ts-ignore
    Swal.fire({
      text,
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen() {
        Swal.showLoading();
      },
    }).then();
  }

  static hide() {
    Swal.hideLoading();
  }
}

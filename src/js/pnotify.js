import { alert, notice, info, success, error } from '@pnotify/core';

function pnotifyInfo() {
  info({
    text: 'Scroll down',
    styling: 'brighttheme',
    delay: 2000,
  });
}

function pnotifyNotice() {
  error({
    text: 'Error: enter more correctly',
    styling: 'brighttheme',
    delay: 2000,
  });
}
function pnotifyError() {
  notice({
    text: 'All pictures uploaded',
    styling: 'brighttheme',
    delay: 2000,
  });
}

export { pnotifyInfo, pnotifyError, pnotifyNotice };

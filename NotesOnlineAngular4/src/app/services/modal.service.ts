import * as _ from 'underscore';

// underscore 是一個Javascript 函式庫
// 欲深入了解 => 參照網路資源 http://underscorejs.org/
// Angular 自製 Modeal
// 參考 http://jasonwatmore.com/post/2017/01/24/angular-2-custom-modal-window-dialog-box

export class ModalService {
  private modals: any[] = [];

  add(modal: any) {
    // add modal to array of active modals
    this.modals.push(modal);
  }

  remove(id: string) {
    // remove modal from array of active modals
    let modalToRemove = _.findWhere(this.modals, { id: id });
    this.modals = _.without(this.modals, modalToRemove);
  }

  open(id: string) {
    // open modal specified by id
    let modal = _.findWhere(this.modals, { id: id });
    modal.open();
  }

  close(id: string) {
    // close modal specified by id
    let modal = _.find(this.modals, { id: id });
    modal.close();
  }
}

import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
interface IPersistent {
  [key:string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private persistenData:IPersistent = {};
  private messageService = inject(MessageService);
  constructor() { }

  getPersistentData(key:string){
    return this.persistenData[key];
  }

  setPersistentData(key:string,data:any) {
    if(data){
      this.persistenData[key] = data;
    }
  }

  toastSuccess(message:string) {
    this.messageService.add({ severity: 'success', summary: 'Transacción éxitosa', detail:message });
  }

  toastError(error:string) {
    this.messageService.add({ severity: 'error', summary: 'Ha ocurrido un error', detail:error });

  }
  removeData(id:string) {
    delete this.persistenData[id];
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

// IMPORT [interface]
import { Moment } from 'src/app/Moments';

// IMPORT [service]
import { MomentsService } from 'src/app/services/moments.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.scss']
})
export class NewMomentComponent {
  btnText = 'Compartilhar'

  constructor(
    private momentService: MomentsService,
    private messageServices: MessageService,
    private router: Router
  ){}

  async createHandler(moment: Moment){
    // transformando para [form data]
    const formData = new FormData()

    formData.append('title', moment.title)
    formData.append('description', moment.description)

    if(moment.image){
      formData.append('image', moment.image)
    }

    // TODO

    // ENVIAR PARA O SERVICE
    await this.momentService.createMoment(formData).subscribe()

    // EXIBIR `MSG`
    this.messageServices.add("Novo momento criado com sucesso!!!")

    //REDIRECT
    this.router.navigate(['/'])
  }
}

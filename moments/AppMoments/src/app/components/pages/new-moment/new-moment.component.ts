import { Component } from '@angular/core';

// IMPORT [interface]
import { Moment } from 'src/app/Moments';
import { MomentsService } from 'src/app/services/moments.service';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.scss']
})
export class NewMomentComponent {
  btnText = 'Compartilhar'

  constructor(private momentService: MomentsService){}

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

    //REDIRECT
  }
}

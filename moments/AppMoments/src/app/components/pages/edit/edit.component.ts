import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// IMPORT [interface]
import { Moment } from 'src/app/Moments';
import { MomentsService } from 'src/app/services/moments.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  moment!: Moment

  btnText:string = 'Editar'

  constructor(
    private momentService: MomentsService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit():void {
    const id = Number(this.route.snapshot.paramMap.get('id'))

    this.momentService.getMomentID(id).subscribe((item) => {
      this.moment = item.data
    })
  }

  async editHandler(momentData: Moment){
    // momento carregado
    const id = this.moment.id

    // dados do formulário
    const formData = new FormData()
    formData.append('title', momentData.title)
    formData.append('description', momentData.description)

    if(momentData.image){
      formData.append('image', momentData.image)
    }

    await this.momentService.editMoment(id!, formData).subscribe()

    this.messageService.add(
      `O momento "${momentData.title} foi atualizado com sucesso!!!"`
    )

    this.router.navigate(['/'])
  }

}

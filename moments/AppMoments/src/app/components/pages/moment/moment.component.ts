import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

import { Moment } from 'src/app/Moments';
import { MomentsService } from 'src/app/services/moments.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.scss']
})
export class MomentComponent {
  moment?: Moment;
  baseApiUrl = environment.baseApiUrl

  constructor(
    private momentService: MomentsService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router
  ){}

  ngOnInit(): void{
    // PEGAR O ID ATIVO
    const idMomentCurrent = Number(this.route.snapshot.paramMap.get('id'))

    this.momentService.getMomentID(idMomentCurrent).subscribe((item) => (this.moment = item.data))
  }

  editHandler(id:number){
    this.router.navigate([`moments/edit/${id}`])
  }

  async removeHandler(id:number){
    await this.momentService.removeMoment(id).subscribe()

    this.messageService.add('Momento deletado com sucesso!')

    this.router.navigate(['/'])
  }
}
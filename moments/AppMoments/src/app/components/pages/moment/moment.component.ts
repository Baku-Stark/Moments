import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';

import { Moment } from 'src/app/Moments';
import { MomentsService } from 'src/app/services/moments.service';
import { MessageService } from 'src/app/services/message.service';

import { Comments } from 'src/app/Comments';
import { ComentService } from 'src/app/services/coment.service';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.scss']
})
export class MomentComponent {
  moment?: Moment;
  baseApiUrl = environment.baseApiUrl

  commentForm!: FormGroup

  constructor(
    private momentService: MomentsService,
    private messageService: MessageService,
    private commentService: ComentService,
    private route: ActivatedRoute,
    private router: Router,
  ){}

  ngOnInit(): void{
    // PEGAR O ID ATIVO
    const idMomentCurrent = Number(this.route.snapshot.paramMap.get('id'))

    this.momentService.getMomentID(idMomentCurrent).subscribe((item) => (this.moment = item.data))
    console.log(this.moment!)

    this.commentForm = new FormGroup(
      {
        username: new FormControl('', [Validators.required]),
        text: new FormControl('', [Validators.required])
      }
    )
  }

  get userName(){
    return this.commentForm.get('username')!
  }
  
  get text(){
    return this.commentForm.get('text')!
  }

  async onSubmit(formDirective: FormGroupDirective){
    if(this.commentForm.invalid){return}

    const data: Comments = this.commentForm.value

    data.momentId = Number(this.moment!.id)

    await this.commentService.createComment(data).subscribe((comment) => this.moment!.comments!.push(comment.data))

    this.messageService.add('Comentário adicionad.')

    // resetar form
    this.commentForm.reset()
    formDirective.resetForm()
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
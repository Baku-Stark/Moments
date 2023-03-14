import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// IMPORT [interface]
import { Moment } from 'src/app/Moments';
import { MomentsService } from 'src/app/services/moments.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  moment!: Moment

  btnText:string = 'Editar'

  constructor(
    private momenService: MomentsService,
    private route: ActivatedRoute
  ){}

  ngOnInit():void {
    const id = Number(this.route.snapshot.paramMap.get('id'))

    this.momenService.getMomentID(id).subscribe((item) => {
      this.moment = item.data
    })
  }

}

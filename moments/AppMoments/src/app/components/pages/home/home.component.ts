import { Component, OnInit } from '@angular/core';

import { Moment } from 'src/app/Moments';

// IMPORT [services]
import { MomentsService } from 'src/app/services/moments.service';
import { environment } from 'src/environments/environment.development';

// IMPORT [fortawesome[npm i @fortawesome/angular-fontawesome]]

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  allMoments: Moment[] = []
  moments: Moment[] = []
  baseApiUrl = environment.baseApiUrl

  searchTerm:string = ""

  constructor(private momentService: MomentsService){ }

  search(event: Event):void{
    const target = event.target as HTMLInputElement
    const value = target.value

    this.moments = this.allMoments.filter((moment) => {
      return moment.title.toLowerCase().includes(value)
    })
  }

  ngOnInit(): void{
    this.momentService.getMoment().subscribe((items) => {

      const data = items.data

      data.map((item) =>{
        item.created_at = new Date(item.created_at!).toLocaleDateString('pt-BR')
      })

      this.allMoments = data
      this.moments = data
    })
  }
}

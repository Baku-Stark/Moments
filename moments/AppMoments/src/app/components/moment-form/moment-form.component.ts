import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'


@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.scss']
})
export class MomentFormComponent {
  momentForm!: FormGroup

  ngOnInit(): void{
    this.momentForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl(''),
    })
  }

  get title(){
    return this.momentForm.get('title')!
  }

  get description(){
    return this.momentForm.get('description')!
  }

  submit(){
    if(this.momentForm.invalid){
      return
    }
  }
}

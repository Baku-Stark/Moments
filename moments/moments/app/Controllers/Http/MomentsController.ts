import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Moment from 'App/Models/Moment'

// IMPORT [ADONIS]
import Application from '@ioc:Adonis/Core/Application'

// IMPORT [UUID]
import { v4 as uuidv4 } from 'uuid'

export default class MomentsController {
    private validationOptions = {
        types: ["image"],
        size: "2mb"
    }

    /* [LER]
    GET|HEAD     /api/moments ──────────────── moments.index › MomentsController.index
    */ 
    public async index(){
        const moments = await Moment.query().preload('comments')

        return {
            data: moments
        }
    }

    /* [FILTRAR]
    GET|HEAD     /api/moments/:id ────────────── moments.show › MomentsController.show
    */ 
    public async show({params}:HttpContextContract){
        const moments = await Moment.findOrFail(params.id)

        await moments.load('comments')

        return {
            data: moments
        }
    }

    /* [UPDATE]
    PUT|PATCH    /api/moments/:id ────────── moments.update › MomentsController.update
    */ 
    public async update({params, request}:HttpContextContract){
        const body = request.body()

        const moments = await Moment.findOrFail(params.id)

        moments.title = body.title
        moments.description = body.description

        if(moments.image != body.image || !moments.image){
            const image = request.file('image', this.validationOptions)

            if(image){
                const imageName = `${uuidv4()}.${image.extname}`
    
                await image.move(
                    Application.tmpPath('uploads'),
                    {
                        name: imageName
                    }
                )
    
                moments.image = imageName
            }
        }

        await moments.save()
        // PATCH -> Atualiza apenas o orientado pelo usuário

        // PUT -> Atualiza todos os componentes

        return {
            message: "Momento atualizado com sucesso!",
            data: moments
        }
    }

    /* [DELETE]
    DELETE       /api/moments/:id ──────── moments.destroy › MomentsController.destroy
    */ 
    public async destroy({params}:HttpContextContract){
        const moments = await Moment.findOrFail(params.id)

        await moments.delete()

        return {
            message: "Momento excluído com sucesso!",
            data: moments
        }
    }

    public async store({request, response}: HttpContextContract){
        const body = request.body()

        const image = request.file('image', this.validationOptions)

        if(image){
            const imageName = `${uuidv4()}.${image.extname}`

            await image.move(
                Application.tmpPath('uploads'),
                {
                    name: imageName
                }
            )

            body.image = imageName
        }

        const moment = await Moment.create(body)

        response.status(201)

        return {
            message: "Momento criado com sucesso!",
            data: moment
        }
    }

}

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'
import Moment from 'App/Models/Moment'

export default class CommentsController {
    /* [DELETE]
    DELETE       /moments/1/comments/id ──────── moments.destroy › CommentsController.destroy
    */ 
    public async destroy({params}:HttpContextContract){
        const comments = await Comment.findOrFail(params.id)

        await comments.delete()

        return {
            message: "Comentário excluído com sucesso!",
            data: comments
        }
    }

    public async store({request, params, response}: HttpContextContract){
        const body = request.body()
        const momentId = params.momentId

        await Moment.findOrFail(momentId)

        body.momentId = momentId

        const comment = await Comment.create(body)

        response.status(201)

        return{
            message: "Comentário adicionado com sucesso!",
            data: comment
        }
    }

}

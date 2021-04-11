const db = require("../models");

const seedFunc = async ()=>{
   const users =  await db.User.findAll();
   console.log(users)
    if(users.length){
        console.log("users exist")
        return
    }
    const joe = await db.User.create({
        username:"Joe",
        password:"password"
    })
    const arra = await db.User.create({
        username:"Arra",
        password:"password"
    })
    const vito = await db.User.create({
        username:"Vito",
        password:"password"
    })
    const kanbanPlay = await db.Session.create({
        bgg_id:"284378",
        title:"kanban"
    })
    const joeKanbanLoss = await db.Score.create({
        SessionId:kanbanPlay.id,
        UserId:joe.id,
        score:85,
        isWinner:false
    })
    const vitoKanbanLoss = await db.Score.create({
        SessionId:kanbanPlay.id,
        UserId:vito.id,
        score:92,
        isWinner:false
    })
    const arraKanbanWin = await db.Score.create({
        SessionId:kanbanPlay.id,
        UserId:arra.id,
        score:85,
        isWinner:true
    })
    const allKanbanData = await db.Session.findOne({
        where:{
            id:kanbanPlay.id,
        },
        include:[{
            model:db.Score,
            include:[db.User]
        }]
    })
    console.log(allKanbanData.toJSON());

    const newYorkPlay = await db.Session.create({
        bgg_id:"300877",
        title:"New York Zoo"
    })
    const joeNewYorkWin = await db.Score.create({
        SessionId:newYorkPlay.id,
        UserId:joe.id,
        score:85,
        isWinner:true
    })
    const arraNewYorkLoss = await db.Score.create({
        SessionId:newYorkPlay.id,
        UserId:arra.id,
        score:80,
        isWinner:false
    })
    const allNewYorkData = await db.Session.findOne({
        where:{
            id:newYorkPlay.id,
        },
        include:[{
            model:db.Score,
            include:[db.User]
        }]
    })
    console.log(allNewYorkData.toJSON())
}


seedFunc()
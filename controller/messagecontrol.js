import { chatmodel } from "../model/chatmsg.js";
import { messagec } from "../model/msg.js";

export const sendmsg = async (req, res) => {
    try {
        const senderid = req.id
        const reciverid = req.params.id;
        const { message } = req.body;
        let msgchat = await chatmodel.findOne({
            chatpersons: { $all: [senderid, reciverid] }
        })
        console.log('Sender ID:', senderid);
        console.log('Receiver ID:', reciverid);
        if (!msgchat) {
            msgchat = await chatmodel.create({
                chatpersons: [senderid, reciverid],
                messages: [] 

            })


        }
        const newmsg = await messagec.create({
            senderid,
            reciverid,
             message
        })
        if (!msgchat.messages) {
            msgchat.messages = [];
        }
        console.log("hello")
            msgchat.messages.push(newmsg._id)

        
        await msgchat.save();

        return res.status(200).json({
            message:"sucessfull"
        })
    } catch (error) {
        console.log(error)
    }

}
export const getMessage = async (req,res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.id;
        const conversation = await chatmodel.findOne({
            chatpersons:{$all : [senderId, receiverId]}
        }).populate("messages"); 
        return res.status(200).json(conversation?.messages);
    } catch (error) {
        console.log(error);
    }
}
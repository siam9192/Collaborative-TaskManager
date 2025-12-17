export interface ChannelPreview {
    name:string
    avatar:string
    lastMessage:{
        content:string
        at:Date|string
    }
}
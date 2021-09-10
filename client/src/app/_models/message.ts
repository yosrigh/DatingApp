export interface Message {
    id: number;
    SenderId: number;
    SenderUserName: string;
    SenderPhotoUrl: string;
    RecipientId: number;
    RecipientUserName: string;
    RecipientPhotoUrl: string;
    Content: string;
    DateRead?: Date;
    MessageSent: boolean;
}

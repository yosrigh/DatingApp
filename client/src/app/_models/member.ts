import { Photo } from "./Photo";

export interface Member {
        id: number;
        username: string;
        photoUrl: string;
        age: number;
        knownAs: string;
        created: Date;
        lstActive: Date;
        gender: string;
        introduction: string;
        lookingfor: any;
        interests: string;
        city: string;
        country: string;
        photos: Photo[];
}



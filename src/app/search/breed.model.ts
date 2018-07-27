export class Breed{
    BreedId:number;
    BreedName:string;
    BreedOrigin:string;
    BreedGroup:string;

    constructor(breedId:number,breedName:string,breedOrgin:string,breedGroup:string){
        this.BreedId=breedId;
        this.BreedName=breedName;
        this.BreedOrigin=breedOrgin;
        this.BreedGroup=breedGroup;
    }
}
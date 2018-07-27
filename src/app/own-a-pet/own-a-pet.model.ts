export class OwnPet {
    BreedId: string;
    BreedName: string;
    BreedOrigin: string;
    BreedGroup: string;
    

    constructor(breedId: string, breedName: string,breedOrigin:string,breedGroup:string) {
        this.BreedId = breedId;
        this.BreedName = breedName;
        this.BreedOrigin=breedOrigin;
        this.BreedGroup=breedGroup
    }
}
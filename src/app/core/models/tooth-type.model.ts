export class ToothType{
    ToothTypeId: number
    Name: string;
    Price: string;
    Description: string;

    constructor(Name, Price, Description){
        this.Name = Name;
        this.Price = Price;
        this.Description = Description;
    }
}
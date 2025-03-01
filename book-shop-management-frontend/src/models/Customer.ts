export class Customer {
    id:string;
    name:string;
    address:string;
    phone:string;

    constructor(id:string,name:string,address:string,phone:string){
        this.id = id;
        this.name = name;
        this.address = address;
        this.phone = phone;
    }
}
import { User } from "../models/user.model";

export class UserService{
    users: User[] = [
        new User('1001','User1','https://s3-ap-southeast-1.amazonaws.com/he-public-data/Richard%20Mathew3350914.jpg'),
        new User('1001','User1','https://s3-ap-southeast-1.amazonaws.com/he-public-data/Richard%20Mathew3350914.jpg'),
        new User('1001','User1','https://s3-ap-southeast-1.amazonaws.com/he-public-data/Richard%20Mathew3350914.jpg'),
        new User('1001','User1','https://s3-ap-southeast-1.amazonaws.com/he-public-data/Richard%20Mathew3350914.jpg')
    ];

    constructor(){}

    getUsers(){
        return this.users.slice();
    }

    addUser(newUser: User){
        this.users.push(newUser);
    }
    
    updateUser(id: string, newUser:User){

    }

    deleteUser(id: string){

    }

    getUser(id: string){

    }

}
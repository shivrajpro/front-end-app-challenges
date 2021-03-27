import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/user.model";

@Injectable()
export class UserService{
    readonly usersUrl = 'https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json';

    users: User[] = [
        new User('1001','User1','https://s3-ap-southeast-1.amazonaws.com/he-public-data/Richard%20Mathew3350914.jpg'),
        new User('1001','User1','https://s3-ap-southeast-1.amazonaws.com/he-public-data/Richard%20Mathew3350914.jpg'),
        new User('1001','User1','https://s3-ap-southeast-1.amazonaws.com/he-public-data/Richard%20Mathew3350914.jpg'),
        new User('1001','User1','https://s3-ap-southeast-1.amazonaws.com/he-public-data/Richard%20Mathew3350914.jpg')
    ];

    constructor(private http: HttpClient){}

    setUsers(){

    }

    getUsers(){

        // this.http.get(this.usersUrl).subscribe((users)=>{
        //     console.log('>>from api', users);
            
        // })
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
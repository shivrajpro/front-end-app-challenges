import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { User } from "../models/user.model";

@Injectable()
export class UserService {
    readonly usersUrl = 'https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json';

    users: User[] = [];

    usersDataChanged = new Subject<User[]>();

    constructor(private http: HttpClient) {
        let allUsers = [
            {
                "Image": "https://s3-ap-southeast-1.amazonaws.com/he-public-data/user14b9a23c.png",
                "name": "User1",
                "id": "1001"
            },
            {
                "Image": "https://s3-ap-southeast-1.amazonaws.com/he-public-data/user20c5688c.jpg",
                "name": "User2",
                "id": "1002"
            },
            {
                "Image": "https://s3-ap-southeast-1.amazonaws.com/he-public-data/Richard%20Mathew3350914.jpg",
                "name": "Richard Matthew",
                "id": "1003"
            },
            {
                "Image": "https://s3-ap-southeast-1.amazonaws.com/he-public-data/Richard_Davies_Hansons_27b0aae3.jpeg",
                "name": "Richard Hansons",
                "id": "1004"
            },
            {
                "Image": "https://s3-ap-southeast-1.amazonaws.com/he-public-data/betty%20hansonb071ac8.jpg",
                "name": "Betty Hanson",
                "id": "1005"
            },
            {
                "Image": "https://s3-ap-southeast-1.amazonaws.com/he-public-data/doug%20hermann1a0ca42.jpg",
                "name": "Doug Hermann",
                "id": "1006"
            },
            {
                "Image": "https://s3-ap-southeast-1.amazonaws.com/he-public-data/martha%20hermann4ceeba1.jpg",
                "name": "Martha Hermann",
                "id": "1007"
            },
            {
                "Image": "https://s3-ap-southeast-1.amazonaws.com/he-public-data/dotty%20feliz841b64f.jpg",
                "name": "Dotty Feliz",
                "id": "1008"
            }
        ]

        allUsers.forEach((user) => {
            this.users.push(new User(user.id, user.name, user.Image));
        })
    }

    setUsers() {

    }

    getUsers() {

        // this.http.get(this.usersUrl).subscribe((users)=>{
        //     console.log('>>from api', users);

        // })
        return this.users.slice();
    }

    addUser(newUser: User) {
        this.users.push(newUser);
        this.usersDataChanged.next(this.users.slice());
    }

    updateUser(id: string, newUser: User) {
        let userFound = false;
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id == id) {
                this.users[i].name = newUser.name;
                this.users[i].image = newUser.image;
                userFound = true;
            }
        }

        if (userFound)
            this.usersDataChanged.next(this.users.slice());
    }

    deleteUser(id: string) {
        const index = this.users.findIndex((u) => {
                    return u.id == id;
                }
            )
        if(index){
            this.users.splice(index, 1);
            this.usersDataChanged.next(this.users.slice());
        }
    }

    getUser(id: string): User {

        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id == id)
                return this.users[i];
        }
        return null;
    }

}
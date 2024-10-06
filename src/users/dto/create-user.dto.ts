import { IsEmail, IsNotEmpty } from "class-validator";

//data transfer object
export class CreateUserDto {
    @IsEmail({},{
        message: "Email khong dung dinh dang"
    })
    @IsNotEmpty({
        message: "Email không được để trống"
    })
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    name: string;
    
    address: string;
}
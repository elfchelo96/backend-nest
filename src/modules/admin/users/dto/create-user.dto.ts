import { IsBoolean, IsEmail, IsString, Max, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;
    
    @IsString()
    @MinLength(6)
    @MaxLength(50)  
    @IsEmail()
    email: string;
    
    @IsString()
    @MinLength(6)
    @MaxLength(200)
    password: string;

    @IsBoolean()
    isActive?: boolean;
}

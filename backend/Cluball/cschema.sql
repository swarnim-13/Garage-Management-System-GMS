CREATE TABLE user (
    id varchar(50) PRIMARY KEY,
    username varchar(50) UNIQUE,
    email varchar(50) UNIQUE NOT NULL,
    password varchar(50) NOT NULL
 ); 
 /* dekh  bhia me yha vs code me bhi sql ke command likhunga or ye mere main workbench se con nect h kyuki mene
 index.js me connect kra h password deke dekh mene yha user table banaya h ab isse run ke liye me powershell me 
 MySQL - root -p likh ke passsword enter krunga or apne database ko select krke uske andr muje source schema.sql likhna
 he jisse mere us db ke andr ye table create ho jayega or fir  apne operation perform kr sakta hu
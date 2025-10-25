export interface Product  {
    id:number,
    nombre: string,
    precio: number,
    describe: string
    categoria: string
    estado: string
    imagen:File
    vendidos?:number
    
}

export interface User {
    users:any[]
    id: string,
    username: string,
    email: string,
    rol:string,
    created_at:string
    products_count: number;
    is_banned: boolean;
    ban_fecha: Date;

}


export interface Productos {
    productos: Productos[]
    id:string,
    nombre:string,
    descrip:string,
    precio:number,
    user_id:number,
    categoria:string,
    estado:string
    imagen:string
}



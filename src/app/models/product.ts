export class Product {
    id: number;
    name: string;
    description:string;
    price: number;
    imageUrl: string;

    constructor(id=1, name='', description = '',price=0,imageUrl = 'https://s3.cloud.ngn.com.tr/kitantik/images/2022-07-01/1br9qfyl52c5gir1tms.jpg'){
        this.id= id
        this.name = name
        this.description = description
        this.price = price
        this.imageUrl = imageUrl
    }
}

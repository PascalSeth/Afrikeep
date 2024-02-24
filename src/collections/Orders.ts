import { Access, CollectionConfig } from "payload/types";

const yourOwn : Access=({req:{user}})=>{
    if(user.role ==="admin") return true
    return{
        user:{
            equals:user?.id
        }
    }
}

export const Orders :CollectionConfig={
    slug:"orders",
    admin:{
        useAsTitle:"Your Orders",
        description:"A summary of all your orders"
    },
    access:{
        read: yourOwn,
        update:({req}) =>req.user.role ==='admin',
        delete:({req}) =>req.user.role ==='admin',
        create:({req}) =>req.user.role ==='admin',
    },
    fields:[
        {
            name:'_isPaid',
            type: 'checkbox',
            access:{
                create:() =>false,
                read:({req}) =>req.user.role ==='admin',
                update:() =>false
            },
            admin:{
                hidden:true
            },
            required:true
        },
        {
            name:"user",
            type:"relationship",
            admin:{
                hidden:true
            },
            required:true,
            relationTo:'users'
        },
        {
            name:"products",
            type:"relationship",
            required:true,
            relationTo:'products',
            hasMany:true
        }
    ]
}
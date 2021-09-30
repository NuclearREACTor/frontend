import React from 'react'
import items from '../items'
import Item from '../components/Item'
export default function HomePage() {
    return (
        <div className="pt-4">
            <h2>Menu </h2>
           <div className="row gridgap-4">
               {items.map(item=>{
                   return (<div className="col-md-4">
                               <Item item={item} no={4}/>
                               </div>)
                       
                   })}
               
           </div>
        </div>
    )

}
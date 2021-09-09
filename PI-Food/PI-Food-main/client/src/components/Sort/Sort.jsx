import React from 'react'
import {sortName, getOrderByScore, filter } from '../../actions/index'
import { useDispatch, useSelector } from "react-redux"
import { useState  } from "react";;




function Sort() {
    const diet = useSelector((state) => state.diets);
    const dispatch = useDispatch();
    const [filterDiets, setFilterDiets] = useState("");

    function handleOrder(e) {
        e.preventDefault();
          console.log(e.target.value)
         dispatch(sortName(e.target.value));
     }
    
      function handleOrderByScore(e) {
        e.preventDefault();
         dispatch(getOrderByScore(e.target.value));
    
     }



     function handleFilter(e) {
        setFilterDiets(e.target.value)
        dispatch(filter(e.target.value.toLowerCase()))
    }
    return (
        <div>
            <div className='select'>
                <select className='diets' onChange={(e) => handleFilter(e)}>
                    {diet.map((diet) => (
                        <option value={diet.name} key={diet.id}>{diet.name}</option>
                    ))}
                </select>
                <select className='byName' onChange={(e) => handleOrder(e)}>
                    <option value='default'>Default</option>
                    <option value='A-Z'>A-Z</option>
                    <option value='Z-A'>Z-A</option>
                </select>
                <select className='byPuntuation' onChange={(e) => handleOrderByScore(e)}>
                    <option value='todos'>Default</option>
                    <option value='mayor'>Highest to lowest score</option>
                    <option value='menor'>Lowest to highest score</option>
                </select>
            </div>



        </div>
    )
}

export default Sort

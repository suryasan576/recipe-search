import React from 'react';

function DisplayResults(props) {
    const {hits} = props.data

    return (
        <>
            {
                hits.map((item, index) => 
                <div className="item" key={item.recipe.label+'_'+index.toString()}>
                    <div><img src={item.recipe.image} alt={item.recipe.label} /></div>
                    <div className="itemTitle">{item.recipe.label}</div>
                    <div><label>Diet</label>: {item.recipe.dietLabels.length && item.recipe.dietLabels.join(", ")}</div> 
                    <div><label>Calories</label>: {parseFloat(item.recipe.calories).toFixed(2)}</div>
                    <div><label>Time:</label> {item.recipe.totalTime} mins</div> 
                    <div><label>Health:</label> {item.recipe.healthLabels.length && item.recipe.healthLabels.join(", ")}</div> 
                    <div className="clearFix"></div>
                </div>
                )
            }
        </>
    );
}

export default DisplayResults;
import React from "react";
import "./Programmation.css"

export default function Programmation () {


    const [testItem, setTestItem] = React.useState([1,1,1,1,1,1,1]);
    const [daySelected, setDaySelected] = React.useState("jour1");

    function handleRadioChange (event) {
        console.log(daySelected)
        setDaySelected(() => {
            return event.target.value
        })
    }

    const artiste = testItem.map(data => {
        return (
            <div className="artistContainer">
                <div>
                    <img className="miniature" src="/images/musician-g66fdd8f28_1280.jpg" alt="Artiste"></img>
                    <div className="infoMiniature">
                        <h2>Jacque Chirac</h2>
                        <p>Scène numéro 1</p>
                        <p>18H</p>
                    </div>
                </div>
                
                
            </div>
        );
    });


    

    

    return(
        <div className="programmation">
            <h1>Programmation</h1>
            <div className="selectFlex">
                <select className="selectProg">
                    <option>Scène 1</option>
                    <option>Scène 2</option>
                    <option>Scène 3</option>
                    <option>Scène 4</option>
                    <option>Scène 5</option>
                </select>
            </div>
            

            <div className="radioContainer">

                <input 
                    className="radioProgrammation" 
                    type="radio" 
                    id="jour1" 
                    name="jours"
                    value="jour1"
                    onChange={handleRadioChange}
                />
                <label className={daySelected == "jour1" ? "daySelected" : null}  htmlFor="jour1">Jour 1</label> 

                <input 
                    className="radioProgrammation"
                    type="radio" 
                    id="jour2" 
                    name="jours"
                    value="jour2"
                    onChange={handleRadioChange}
                />
                <label className={daySelected == "jour2" ? "daySelected" : null} htmlFor="jour2">Jour 2</label>     

                <input 
                    className="radioProgrammation"
                    type="radio" 
                    id="jour3" 
                    name="jours"
                    value="jour3"
                    onChange={handleRadioChange}
                />
                <label className={daySelected == "jour3" ? "daySelected" : null} htmlFor="jour3">Jour 3</label>

            </div>

            <div className="miniatureGrid">
                {artiste}
            </div>

        </div>
    );
}
import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {

  const [meal , setMeal] = useState({});
  const [yt, setyt] = useState("");
  const [loading, setLoading] = useState(false);

  const getMeal = async () => {

    setLoading(true);
    try{
      const res = await axios('https://www.themealdb.com/api/json/v1/1/random.php');
      console.log(res.data.meals[0]);

      setMeal(res.data.meals[0]);
      const yturl = res.data.meals[0].strYoutube?.replace('watch?v=', 'embed/');
      setyt(yturl);
    }
    catch(err){
      console.log(err);
    }
    setLoading(false);
  }

  console.log(meal.strSource);

  useEffect( () => {
    getMeal();
  },[]);

  const ings = [];

  Object.keys(meal).forEach( (item, index) => {
    if( meal[`strIngredient${index}`]){
      ings.push({
        "ing":meal[`strIngredient${index}`],
        "measure":meal[`strMeasure${index}`],
      })
    }
  } )

  const renderList = ( item, index) => {
    return <div className=" flex text-sm" key={index}>
      <li>{item.ing} - </li>
      <span className=" italic text-gray-500">{item.measure}</span>
    </div>
  }

  if( loading){
    return(
      <div className=" h-screen w-screen flex justify-center items-center flex-col gap-10 text-gray-800">

        <div className=" absolute top-2 right-2">
          Created By Jitendriya Meher
        </div>

        <div class="custom-loader"></div>
        <div className="text-4xl">
          Loading
        </div>    
      </div>
    )
  }

  return (
    <div className="">

        <div className=" absolute top-2 right-2">
          Created By Jitendriya Meher
        </div>


        <div className=" max-w-4xl mx-auto px-4 py-5 relative">

        <h1 className=" text-4xl text-center font-semibold text-gray-800 underline mb-4">
          Get Random Meals
        </h1>

        <button className=" bg-gray-800 text-white py-2 px-4 w-full rounded-md md:w-40 active:scale-95 duration-200 ease-in-out"
        onClick={getMeal}>
          Get New Meal
        </button>

        <h1 className=" text-4xl font-bold mt-4 underline">
          <a href={meal.strSource} target="_blank">
          {meal.strMeal}
          </a>
        </h1>

        <div className=" md:grid md:grid-cols-2 md:gap-4">
          <div className=" mt-4 border-orange-500 border-4 rounded-md h-80">

            <img src={meal.strMealThumb} alt="" className=" w-full h-full object-cover"/>
          </div>

          <div className="my-3">
            <h3 className=" font-bold text-4xl mb-2">
              Ingeridents
            </h3>

            {
              ings.map((item,index) => (
                renderList(item,index)
              ))
            }
          </div>

        </div>

        <div className=" mt-4">

            <h3 className=" text-4xl font-bold mb-2">
              Instructions
            </h3>
            <p>
              {meal.strInstructions}
            </p>

          </div>

          <div className="aspect-w-16 aspect-h-9 mt-6">
            <iframe src={yt} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
            className=" w-full aspect-video"></iframe>
          </div>

        </div>

    </div>
  );
}

export default App;

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../context/Context";

export default function RecipeDetails() {
  const { id } = useParams();
  const {
    recipeDetailsData,
    setRecipeDetailsData,
    favoritesList,
    handleAddToFavorite,
  } = useContext(GlobalContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getRecipeDetails() {
      try {
        // const response = await fetch(
        //   `https://forkify-api.herokuapp.com/api/get?rId=${id}`
        // );
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/get?rId=${id}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        if (data) {
          setRecipeDetailsData(data);
        }
      } catch (error) {
        console.error("Error fetching recipe details:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    getRecipeDetails();
  }, [id, setRecipeDetailsData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const isFavorite = favoritesList.some(
    (item) => item.recipe_id === recipeDetailsData?.recipe?.recipe_id
  );

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="row-start-2 lg:row-start-auto sticky top-[30px] h-screen">
        <div className="h-96 overflow-hidden rounded-xl group">
          <img
            src={recipeDetailsData?.recipe?.image_url}
            alt={recipeDetailsData?.recipe?.title || "Recipe Image"}
            className="w-full h-full object-cover block group-hover:scale-105 duration-300"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm text-cyan-700 font-medium">
          {recipeDetailsData?.recipe?.publisher || "Unknown Publisher"}
        </span>
        <h3 className="font-bold text-2xl truncate text-black">
          {recipeDetailsData?.recipe?.title || "No Title"}
        </h3>
        <div>
          <button
            onClick={() => handleAddToFavorite(recipeDetailsData?.recipe)}
            className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 inline-block shadow-md bg-black text-white"
          >
            {isFavorite ? "Remove from favorites" : "Add to favorites"}
          </button>
        </div>
        <div>
          <span className="text-2xl font-semibold text-black">
            Ingredients:
          </span>
          <ul className="flex flex-col gap-3 list-decimal mt-4">
            {recipeDetailsData?.recipe?.ingredients?.length > 0 ? (
              recipeDetailsData.recipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  <span className="text-lg font-semibold text-black">
                    {ingredient}
                  </span>
                </li>
              ))
            ) : (
              <li>No ingredients available</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

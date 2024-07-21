import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favoritesList, setFavoritesList] = useState([]);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true); // Start loading state

    try {
      // Fetch data from API
      // const res = await fetch(
      //   `https://forkify-api.herokuapp.com/api/search?q=${searchParam}`
      // );
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/search?q=${searchParam}`
      );

      const data = await res.json();
      console.log("data", data);

      if (data?.recipes) {
        setRecipeList(data.recipes);
        setSearchParam("");
        navigate("/"); // Navigate after setting the recipe list
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false); // End loading state
    }
  }

  function handleAddToFavorite(currentItem) {
    console.log("Item to add/remove from favorites:", currentItem);

    // Check if the item is already in the favorites list
    const itemExists = favoritesList.some(
      (item) => item.recipe_id === currentItem.recipe_id
    );

    if (itemExists) {
      // Remove item from favorites
      setFavoritesList(
        favoritesList.filter((item) => item.recipe_id !== currentItem.recipe_id)
      );
    } else {
      // Add item to favorites
      setFavoritesList([...favoritesList, currentItem]);
    }
  }

  console.log(favoritesList, "favoritesList");

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        loading,
        recipeList,
        setSearchParam,
        handleSubmit,
        recipeDetailsData,
        setRecipeDetailsData,
        handleAddToFavorite,
        favoritesList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

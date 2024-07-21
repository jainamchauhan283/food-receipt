import { Link } from "react-router-dom";

export default function RecipeItem({ item }) {
  return (
    <div className="flex flex-col w-80 overflow-hidden p-5 bg-white/75 shadow-xl gap-5 border-2 rounded-2xl border-white">
      <div className="h-40 flex justify-center overflow-hidden items-center rounded-xl">
        <img
          src={item?.image_url}
          alt={item?.title ? `Image of ${item.title}` : 'Recipe item image'}
          className="block w-full object-cover"
        />
      </div>
      <div>
        <span className="text-sm text-cyan-700 font-medium">
          {item?.publisher || 'Unknown Publisher'}
        </span>
        <h3 className="font-bold text-2xl truncate text-black">
          {item?.title || 'No Title'}
        </h3>
        <Link
          to={`/recipe-item/${item?.recipe_id}`}
          className="text-sm p-3 mt-5 px-8 rounded-lg uppercase font-medium tracking-wider inline-block shadow-md bg-black text-white"
          aria-label={`View details for ${item?.title || 'this recipe'}`}
        >
          Recipe Details
        </Link>
      </div>
    </div>
  );
}
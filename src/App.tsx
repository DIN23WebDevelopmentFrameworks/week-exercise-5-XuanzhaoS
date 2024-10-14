import React from 'react';
import { useEffect, useState } from 'react';
import RecipeTagList from './RecipeTagList';
import RecipeList from './RecipeList';
import { IRecipe } from './Types';

const App = () => {
 
  const [tagList, setTagList] = useState<string[]>([]);
  const [recipeList, setRecipeList] = useState<IRecipe[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(getMeTheTagList, []);
  useEffect(() => {
    if (selectedTag) {
      fetch(`https://dummyjson.com/recipes/tag/${selectedTag}`)
        .then((response) => response.json())
        .then((data) => setRecipeList(data.recipes)); 
    } }, [selectedTag]);
  
  function onSelectTag(tagName: string) {
    setSelectedTag(tagName); 
  
  }
  function getMeTheTagList() {
    fetch('https://dummyjson.com/recipes/tags')
    .then(response => response.json())
    .then(data => setTagList(data));
  }
  const handleGoBack = () => {
    setSelectedTag(null);  
  };

  return (
    <div>
 <h1>ACME Recipe O'Master</h1>
{selectedTag ? (
        <RecipeList recipes={recipeList} onGoBack={handleGoBack} />
      ) : (
        <RecipeTagList tagList={tagList} onSelectTag={onSelectTag} />
      )}
       
    </div>
  );


};


export default App;

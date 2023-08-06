"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);

  const filteredPrompts = (textToSearch) => {
    const regexObject = new RegExp(textToSearch, "i");
    return allPosts.filter(
      (item) =>
        regexObject.test(item.creator.username) ||
        regexObject.test(item.tag) ||
        regexObject.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    console.log("handle search change!");
    setSearchText(e.target.value);

    const searchedPrompts = filteredPrompts(e.target.value);
    setSearchedResults(searchedPrompts);
  };

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setAllPosts(data);
  };

  const handleTagClick = (tagText) => {
    console.log(tagText);
    setSearchText(tagText);

    const searchedPrompts = filteredPrompts(tagText);
    setSearchedResults(searchedPrompts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;

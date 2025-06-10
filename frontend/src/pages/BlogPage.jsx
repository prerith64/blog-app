import React, { useState } from 'react';
import { ListFilter, PlusIcon, Search } from 'lucide-react';
import Card from '../components/Card';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Filter = ({ search, setSearch, setSortOrder }) => {
  const navigate = useNavigate();

  const handleAddBlog = () => {
    navigate('/add-blog');
  };

  return (
    <div className="w-full shadow flex justify-between flex-wrap gap-4 p-4 rounded-md mb-6 text-xl relative">
      {/* Filter Dropdown */}
      <div className="relative group">
        <div className="px-4 flex gap-2 py-2 bg-purple-600 rounded-md text-white font-bold cursor-pointer">
          <ListFilter strokeWidth={4} />
          <span>Filter</span>
        </div>

        <div className="absolute top-full -translate-y-2 left-0 mt-2 hidden group-hover:block bg-white text-black rounded-md shadow-md w-56 z-10">
          <button
            onClick={() => setSortOrder('asc')}
            className="w-full text-left px-4 py-2 hover:bg-purple-100"
          >
            🕰️ Oldest First
          </button>
          <button
            onClick={() => setSortOrder('desc')}
            className="w-full text-left px-4 py-2 hover:bg-purple-100"
          >
            🆕 Newest First
          </button>
        </div>
      </div>

      {/* Search Field */}
      <div className="flex flex-row gap-4">
        <input
          type="text"
          placeholder="Search Here"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-6 w-96 rounded-md outline-purple-600 bg-gray-100"
        />
        <button className="bg-purple-600 px-4 py-2 rounded-md cursor-pointer text-white font-bold flex gap-2">
          <Search strokeWidth={4} /> Search
        </button>
      </div>

      {/* Add Blog */}
      <button
        onClick={handleAddBlog}
        className="bg-purple-600 text-white font-bold cursor-pointer flex gap-2 rounded-md px-6 py-2"
      >
        <PlusIcon strokeWidth={4} /> Add Blog
      </button>
    </div>
  );
};

const BlogPage = () => {
  const { blogPosts } = useAuth();
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('desc'); // default: newest first

  const filteredAndSortedPosts = blogPosts
    .filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.abstract.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  return (
    <div className="w-full min-h-screen py-6">
      <div className="container bg-white m-auto p-6">
        <Filter
          search={search}
          setSearch={setSearch}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        <section className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {filteredAndSortedPosts.map((item, index) => (
            <Card
              key={index}
              images={item.images}
              id={item._id}
              title={item.title}
              createdAt={item.createdAt}
              abstract={item.abstract}
              description={item.description}
              isMyBlog={false}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export default BlogPage;

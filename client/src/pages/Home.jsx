import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllPublishedPages } from '../services/operations/pageAPI';
import logo from '../assets/rapid-logo.svg';
import PageCard from '../components/common/PageCard';
import PageCardSkeleton from '../components/common/PageCardSkeleton';

const Home = () => {
  const { loading, publishedPages } = useSelector((state) => state.page);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPublishedPages({ status: 'Published' }));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex justify-between items-center border-b border-blue-100">
          <img src={logo} alt="Rapid page builder" className="w-20 h-auto" />
          <div className="space-x-4">
            <Link to="/signup" className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors">
              Sign up
            </Link>
            <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Log in
            </Link>
          </div>
        </header>

        <main className="mt-16 mb-24">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-12">
            Welcome to{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Rapid Page Builder
            </span>
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading
              ? Array(6).fill().map((_, index) => <PageCardSkeleton key={index} />)
              : publishedPages.map((page) => <PageCard key={page._id} page={page} />)
            }
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
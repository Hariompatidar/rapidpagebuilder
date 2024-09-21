import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllPublishedPages } from "../services/operations/pageAPI";
import landingImage from "../assets/landing.svg";
import PageCard from "../components/common/PageCard";
import PageCardSkeleton from "../components/common/PageCardSkeleton";

const Dashboard = () => {
  const { loading, publishedPages } = useSelector((state) => state.page);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPublishedPages({ status: "Published" }));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="w-full min-h-screen p-6 bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">All Published Pages</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <PageCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (!publishedPages || publishedPages.length === 0) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-4xl w-full">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-1/2 p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">No Pages Found</h1>
              <p className="text-gray-600 mb-6">
                Looks like you don't have any pages yet. Let's add a new page to get started.
              </p>
              <Link
                to="/createPage"
                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
              >
                + Add Page
              </Link>
            </div>
            <div className="w-full lg:w-1/2 p-8 bg-gray-100">
              <img src={landingImage} alt="Landing" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">All Published Pages</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {publishedPages.map((page) => (
          <PageCard page={page} key={page._id} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
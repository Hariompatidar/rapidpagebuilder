import React from 'react';
import { Link } from 'react-router-dom';

const PageCard = ({ page }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/pages/${page?.slug}`} className="block p-6">
        <h2 className="text-2xl font-bold mb-2 text-blue-800 line-clamp-2">
          {page?.title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{page?.description}</p>
      </Link>
      {page?.showAuthor && (
        <div className="bg-gray-50 p-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
              <img
                src={page?.createdBy?.profileImage}
                alt={`${page?.createdBy?.firstName} ${page?.createdBy?.lastName}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-800">
                {page.createdBy?.firstName} {page.createdBy?.lastName}
              </p>
              <p className="text-xs text-gray-500">{page.createdBy?.email}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageCard;
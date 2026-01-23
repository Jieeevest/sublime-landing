"use client";

import Link from "next/link";

interface Breadcrumb {
  title: string;
  href: string;
}

interface ContentItem {
  id: string;
  title: string;
  description: string;
  imgSrc: string;
  isCurrent: boolean; // published or not
  status: string;
}

interface ContentManagementProps {
  contents: ContentItem[];
  handlePostTemplate: (id: string) => void;
  handleDeleteTemplate: (id: string) => void;
  handleAddTemplate: () => void;
  handleEditTemplate: (id: string) => void;
  handleViewTemplate: (id: string) => void;
  breadcrumbs: Breadcrumb[];
}

export default function ContentManagement({
  contents,
  handlePostTemplate,
  handleDeleteTemplate,
  handleAddTemplate,
  handleEditTemplate,
  handleViewTemplate,
  breadcrumbs,
}: ContentManagementProps) {
  return (
    <div className="space-y-6 py-6">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500">
        <ol className="list-reset flex text-gray-600">
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={index} className="flex items-center">
              <Link
                href={breadcrumb.href}
                className="hover:text-primary transition-colors"
              >
                {breadcrumb.title}
              </Link>
              {index < breadcrumbs.length - 1 && (
                <span className="mx-2">/</span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thumbnail
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Judul & Deskripsi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contents.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  Tidak ada data.
                </td>
              </tr>
            ) : (
              contents.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-16 w-24 relative rounded-lg overflow-hidden bg-gray-100">
                      {item.imgSrc ? (
                        <img
                          src={item.imgSrc}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-gray-400">
                          No Img
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 line-clamp-1">
                      {item.title}
                    </div>
                    <div className="text-sm text-gray-500 line-clamp-2">
                      {item.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.isCurrent
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {item.isCurrent ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleViewTemplate(item.id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEditTemplate(item.id)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handlePostTemplate(item.id)}
                      className={`${item.isCurrent ? "text-orange-600 hover:text-orange-900" : "text-green-600 hover:text-green-900"}`}
                    >
                      {item.isCurrent ? "Unpost" : "Post"}
                    </button>
                    <button
                      onClick={() => handleDeleteTemplate(item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

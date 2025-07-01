import React, { useEffect, useMemo, useState } from 'react';
import useStudyMeterialApi from '../../hooks/useStudyMeterialApi';
import { LibraryBig, Search } from 'lucide-react';
import FullScreenLoader from '../../components/FullScreenLoader';

const StudyMeterial = () => {
  const { studentClassMeterial, loading } = useStudyMeterialApi();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = useMemo(() => {
    if (!searchTerm) return studentClassMeterial;

    return studentClassMeterial.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            event.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [studentClassMeterial, searchTerm]);

  return (
    <div className="min-h-screen">
      <div className='p-2'>
        <div className="mb-6 sm:mb-8 bg-white rounded-lg ">
          <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-4 py-3 md:py-3 shadow-md">
              <div className='mb-2'>
                <h1 className="text-xl md:text-3xl flex items-center gap-2 mb-1"><LibraryBig  />Study Material</h1>
                <p className="text-sm md:text-xs lg:text-sm text-gray-600">Discover and explore upcoming study materials</p>
              </div>
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search materials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-2 text-sm sm:text-base border border-gray-200 rounded-lg sm:rounded-xl bg-white shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-0 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
 {loading ? (
  <div className="text-center py-6 text-gray-500 text-sm">
    <FullScreenLoader />
  </div>
) : (
  filteredEvents.length === 0 ? (
    <div className="text-center py-12 sm:py-16 lg:py-20 px-4">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-1 sm:mb-2">
        {searchTerm ? 'No materials found' : 'No materials available'}
      </h3>
    </div>
  ) : (
    <div className="w-full overflow-x-auto rounded-lg shadow">
      <table className="min-w-max w-full table-auto text-sm border-collapse bg-white">
        <thead className="bg-blue-100 text-left text-blue-600 font-semibold">
          <tr className="text-center">
            <th className="py-3 px-2 text-center">Sr.No.</th>
            <th className="py-3 px-2 text-center">Title</th>
            <th className="py-3 px-2 text-center">Class</th>
            <th className="py-3 px-2 text-center">Teacher</th>
            <th className="py-3 px-2 text-center">Subject</th>
            <th className="py-3 px-2 text-center">Description</th>
            <th className="py-3 px-2 text-center">Download</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.map((study, index) => (
            <tr key={study.id} className="hover:bg-gray-50 even:bg-gray-100 odd:bg-white">
              <td className="py-3 px-2 text-center">{index + 1}</td>
              <td className="py-3 px-2 text-center">{study.title}</td>
              <td className="py-3 px-2 text-center">{study?.class?.classname || "N/A"}</td>
              <td className="py-3 px-2 text-center">{study?.teacher?.username || "N/A"}</td>
              <td className="py-3 px-2 text-center">{study?.subject?.subjectName || "N/A"}</td>
              <td className="py-3 px-2 text-center">
                {study.description && study.description.length > 100
                  ? study.description.slice(0, 100) + '...'
                  : study.description}
              </td>
              <td className="py-3 text-center">
                <a
                  href={`http://localhost:2000/${study.filePath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="text-white font-semibold px-2 py-1 rounded-sm bg-gradient-to-r from-amber-500 to-orange-600"
                >
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
)}


      </div>
    </div>
  );
};

export default StudyMeterial;

import React, { useState, useMemo } from 'react'
import { CalendarDays, Search, MapPin } from 'lucide-react'
import useEventApi from '../../hooks/useEventApi'

const EventView = () => {
  const { Events } = useEventApi()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredEvents = useMemo(() => {
    if (!searchTerm) return Events
    
    return Events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesSearch
    })
  }, [Events, searchTerm])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }




  return (
    <div className="min-h-screen">
      <div className='p-2'>
        <div className="mb-6 sm:mb-8 bg-white rounded-lg ">
          <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center  justify-between px-4 py-3 md:py-3 shadow-md">
              <div className='mb-2'>
              <h1 className="text-xl md:text-3xl flex items-center gap-2 mb-1"><CalendarDays />Events</h1>
              <p className="text-sm md:text-xs lg:text-sm sm:text-base text-gray-600">Discover and explore upcoming events</p>
              </div>
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 sm:py-2 text-sm sm:text-base border border-gray-200 rounded-lg sm:rounded-xl outline-0 bg-white shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
          </div>

         
        </div>


        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 sm:py-16 lg:py-20 px-4">
            <CalendarDays size={48} className="mx-auto text-gray-300 mb-3 sm:mb-4 sm:w-16 sm:h-16" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-1 sm:mb-2">
              {searchTerm ? 'No events found' : 'No events available'}
            </h3>
            
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {filteredEvents.map((event) => {
              
              return(
                <div key={event.id} className="group bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="p-4 sm:p-5 lg:p-6">
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      

                    </div>
                    
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {event.title}
                    </h3>
                    
                    <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                      <div className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                        <CalendarDays size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
                        <div className="flex flex-wrap items-center gap-1">
                          <span className="font-medium">{formatDate(event.startDate)}</span>
                          {event.endDate && (
                            <>
                              <span className="text-gray-400 hidden sm:inline">to</span>
                              <span className="text-gray-400 sm:hidden">-</span>
                              <span className="font-medium">{formatDate(event.endDate)}</span>
                            </>
                          )}
                        </div>
                      </div>
                      
                     
                      
                      {event.location && (
                        <div className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                          <MapPin size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      )}
                      
                      
                    </div>
                    
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                      {event.description && event.description.length > 100
                        ? event.description.slice(0, 100) + '...'
                        : event.description}
                    </p>
                    
                 
                  </div>
                </div>
              )
            })}
          </div>
        )}
        
        
      </div>
    </div>
  )
}

export default EventView
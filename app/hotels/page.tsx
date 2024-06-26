'use client'

import { readDataFromFirebaseCollection, readPaginationDataFromFireBase } from "@/lib/firebase/read/readData";
import Link from "next/link";
import { useEffect, useState } from "react";
import { orbit } from "ldrs";
import './page.css'
import InfiniteScroll from "react-infinite-scroll-component";

export default function page() {
  const [data, setData] : any= useState([])
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(true)
  const [lastDoc, setLastDoc] = useState(null);
  useEffect(() => {
    orbit.register()
    const hotels : any = []
    const getData = async() => {
      const querySnapshot : any = await readDataFromFirebaseCollection()
      querySnapshot.snapshot.forEach((element: { data: any; })=> {
        hotels.push(element.data())
      });
      setLastDoc(querySnapshot.lastVisible)
      setData(hotels)
      setLoading(false)
    }
    getData()
  }, [])

  async function fetchMoreData() {
    try {
      const temp : any= [];
      const newData : any= await readPaginationDataFromFireBase(lastDoc);
      
      if (newData.docs.length > 0) {
        newData.forEach((doc : any) => {
          temp.push(doc.data());
        });
        setData([...data, ...temp]);
        setLastDoc(newData.docs[newData.docs.length - 1]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching more data:', error);
    }
  }

  const loader = (
    <div className="d-flex justify-content-center mt-3">
       <l-orbit
       size="35"
       speed="1.5" 
       color="red" 
     ></l-orbit>
    </div>
  )
  
  

  return (
    <section className="w-full h-screen m-5">
      {loading ? (
       <div className="d-flex justify-content-center align-items-center" style={{height : '100vh'}}>
       <l-orbit
       size="35"
       speed="1.5" 
       color="red" 
     ></l-orbit>
     </div>
      ) : (
        <div className="container mx-auto h-full py-10">
        <div className="flex items-center justify-between py-4">
          <h1 className="text-2xl font-bold tracking-wide">All Hotels List</h1>
          <Link
            href={"/hotels/addNewHotel"}
            className="p-2 px-4 bg-green-100 text-green-800 font-medium tracking-wide rounded"
          >
            Add New Hotel
          </Link>
        </div>
        
          {/* fetch the actual hotelDocuments here and map them */}
          <InfiniteScroll
            dataLength={data.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={loader}
            scrollableTarget="scrollableDiv"
            style={{ overflow: 'auto' }}
          >
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4 mt-3">
              {data.map((hotel : any, index : number) => (
                <Link
                  href={`/hotels/${hotel.hotelSlug}`}
                  key={index}
                  className="w-full aspect-video rounded-lg p-4 hotel-div"
                  style={{
                    backgroundImage: `url(${hotel?.hotelImageUrl})`,
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                >
                  Hotel details of {hotel.hotelName}
                </Link>
              ))}
            </div>
          </InfiniteScroll>
      </div>
      )}
    </section>
  );
}

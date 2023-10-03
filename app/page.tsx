import getCurrentUser from "./actions/getCurrentUser";
import getListings from "./actions/getListings";

import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";


export default async function Home() {
  const listings = await getListings();
  const CurrentUser = await getCurrentUser();
  //const isEmpty = true;
  if (listings.length === 0) {
    return(
      <ClientOnly>
        <EmptyState showReset/>
      </ClientOnly>
    )
  }
  return (
    
    <ClientOnly>
      <Container>
        <div className="pt-24 
                        grid grid-cols-1 
                        sm:grid-cols-2
                        md:grid-cols-3 
                        lg:grid-cols-4 
                        xl:grid-cols-4 
                        grid-rows-1 
                        2xl:grid-cols-6 
                        gap-6">
                          
              {listings.map((listing: any) => {
                  return (
                    <ListingCard
                        currentUser={CurrentUser}
                        key={listing.id}
                        data={listing}
                      />
                  )
              })}
        </div>
      </Container>
    </ClientOnly>
    
  )
}

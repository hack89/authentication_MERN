import React, {useContext, useEffect} from 'react'
import Guest from './Guest'
import GuestContext from '../../context/guestContext/guestContext'
import AuthContext from '../../context/authContext/authContext'
const Guests = () => {
  const {guests, filterGuest, getGuests, search} = useContext(GuestContext)
  const { loading } = useContext(AuthContext)

  useEffect(()=>{
    getGuests()
    
  },[])

  if (guests === null || guests.length === 0) {
    return <h3 className="no-guest">{loading ? 'Loading guests...' : 'Please add a guest'}</h3>
  }
   

  return (
    <div className="guests">
    { search !== null ? search.map(guest => <Guest key={guest._id} guest={guest}/> ) :
      guests.filter(guest => !filterGuest || guest.isConfirmed).map(guest =>  <Guest key={guest._id} guest={guest}/> )}
      
    </div>
  )
}
export default Guests

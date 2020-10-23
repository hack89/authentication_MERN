import React, {useState, useContext, useEffect} from 'react'
import GuestContext from '../../context/guestContext/guestContext'



const GuestForm = () => {
  const context =  useContext(GuestContext)
  
  const {addGuest, editable, updateGuest, clearEdit} = context;
  
  useEffect(()=>{
    if(editable !== null){
      setGuest(editable)
    } else {
      setGuest({
        name: '',
        phone: '',
        diet: 'Non-Veg'
      })
    }
  },[editable, context])
  
  
  const [guest, setGuest] = useState({
    name: '',
    phone: '',
    diet: 'Non-Veg'
  })


  
  const {name, phone, diet} = guest
  
  const handleChange=(e)=>{
    setGuest({
      ...guest,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit =(e)=>{
    e.preventDefault();
    if(editable !== null){
      updateGuest(guest)
      clearEdit()
    } else {
      addGuest(guest)
    setGuest({
      name: '',
      phone: '',
      diet: 'Non-Veg'
    })
    }
    
  }


  return (
    <div className="invite-section">
      <h1>{editable !== null ? 'Edit Guest' : 'Invite Someone' }</h1>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Name" name="name" value={name} onChange={handleChange}/>
        <input type="text" placeholder="Phone" name="phone" value={phone} onChange={handleChange}/>
        <p className="options-label">Dietary</p>
        <div className="options">
          <label className="container">Non-veg
        <input type="radio" name="diet" value='Non-Veg' checked={diet === 'Non-Veg'} onChange={handleChange}/>
            <span className="checkmark"></span>
          </label>
          <label className="container">Vegan
        <input type="radio" name="diet" value='Vegan' checked={diet === 'Vegan'} onChange={handleChange}  />
            <span className="checkmark"></span>
          </label>
          <label className="container">Pascatarian
        <input type="radio" name="diet" value='Pescatarian' checked={diet === 'Pescatarian'} onChange={handleChange}/>
            <span className="checkmark"></span>
          </label>
        </div>
        <input type="submit" value={editable !== null ? 'Update Guest' : 'Add Guest' } className="btn" />
        {editable !== null ? <input onClick={clearEdit} value='Cancel' type="button" className="btn clear" /> : null}
      </form>
    </div>
  )
}

export default GuestForm

import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [profileId, setProfileId] = useState(
        {avatarIMG: "https://img.rawpixel.com/private/static/images/website/2022-05/ns8230-image.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=b3961e17298745c0868eeef46211c3d0",
        email:"hhhhhhhhh@hhh.com",
        googleAuth: false,
        in_relationship: false,
        partner_username: "Tom",
        username: "byebye"}
    );
  
    return (
      <UserContext.Provider value={{ profileId, setProfileId }}>
        {children}
      </UserContext.Provider>
    );
  };

  export { UserContext, UserContextProvider };
import React, { createContext, useState } from 'react'

const UserContext = createContext()

const UserContextProvider = ({ children }) => {
	const [profileId, setProfileId] = useState({
		avatarIMG: '',
		email: '',
		googleAuth: false,
		in_relationship: false,
		partner_username: '',
		username: '',
	})

	return (
		<UserContext.Provider value={{ profileId, setProfileId }}>
			{children}
		</UserContext.Provider>
	)
}

export { UserContext, UserContextProvider }
